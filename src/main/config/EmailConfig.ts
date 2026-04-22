import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import { Op } from 'sequelize';
import { mainDb } from './DBConfig';
import { EmailSenderTypeList } from '../const';
import EmailTransactionRepository from '../models/repository/transaction/EmailTransactionRepository';
import GeneralConfig from './GeneralConfig';

export type MailType = {
    createdBy: string,
    sendTo: string,
    sendType: typeof EmailSenderTypeList[number],
    sendParam: Object,
    sendSubject: string
    companyId: string,
    companyInfo: any,
}[];



let EMAIL_PROCESS: any; EMAIL_PROCESS = {};

class EmailConfig {

    public TRANSPORTER: any;
    public TEMPLATE_DIR: string;
    public MAIL_TRANSACTION: any;

    constructor() {

        this.TRANSPORTER = nodemailer.createTransport({
            host: process.env.MAIL_HOST!,
            port: Number(process.env.MAIL_PORT ?? '1'),
            secure: process.env.MAIL_SECURE! === 'true',
            auth: {
                user: process.env.MAIL_USER!,
                pass: process.env.MAIL_PASSWORD!,
            },
            requireTLS: process.env.MAIL_REQUIRE_TLS === 'true',
            tls: { minVersion: 'TLSv1.2' },
        });
        this.TEMPLATE_DIR = process.env.MAIL_TEMPLATE_DIR || path.resolve(__dirname, '../../../storage/email/template');
        this.MAIL_TRANSACTION = {};
    }

    public compilerTemplateHtml(fileName: string, params: Record<string, any>) {
        const templatePath = path.join(this.TEMPLATE_DIR, fileName);
        const source = fs.readFileSync(templatePath, 'utf8');
        const compile = handlebars.compile(source);
        return compile(params);
    }

    public async refreshEmailAction() {
        let emailLogs = EmailTransactionRepository;
        const foundEmail = await emailLogs.getAllData({
            where: {
                [Op.or]: [
                    { status: "WAITING" },
                ]
            }
        });

        for (let rawMail of foundEmail) {
            if (EMAIL_PROCESS[rawMail.id] == undefined) {
                EMAIL_PROCESS[rawMail.id] = rawMail;
                new Promise(async (resolve, reject) => {
                    let dataProcess = EMAIL_PROCESS[rawMail.id];
                    const updateMail = await emailLogs.updateData({ status: "PROCESSED" }, { where: { id: dataProcess.id } });
                    if (updateMail) {
                        const sendEmail = await this.sender(dataProcess.sendTo, dataProcess.sendSubject, dataProcess.sendType, dataProcess.sendParam);
                        if (sendEmail.success == true) {
                            await emailLogs.updateData({ status: "SUCCESS", sendMessage: sendEmail.message }, { where: { id: dataProcess.id } });
                        } else {
                            await emailLogs.updateData({ status: "ERROR", sendMessage: sendEmail.message }, { where: { id: dataProcess.id } });
                        }
                    }
                });
            }
        }
    }


    public async createEmailSender(emailData: MailType) {
        return await new Promise(async (resolve, reject) => {
            let emailLogs = EmailTransactionRepository;
            let data: any; data = [];
            for (let i in emailData) {
                let rawEmailData = emailData[i];
                data.push({
                    ...rawEmailData,
                    sendFrom: `${GeneralConfig.APP_NAME} <${GeneralConfig.MAIL_USER}>`,
                    sendCc: '',
                    status: 'WAITING'
                });
            }
            const t = await mainDb.transaction();
            try {
                const insertEmail = await emailLogs.insertBulkData(data, { transaction: t });
                if (insertEmail) {
                    await t.commit();
                    this.refreshEmailAction();
                    resolve(insertEmail);
                }
            } catch (error) {
                await t.rollback();
                console.log(error)
                reject("Error, " + JSON.stringify(error));
            }
        });
    }

    public async sender(to: string, subject: string, type: typeof EmailSenderTypeList[number], params: any) {
        let path: string; path = "-";
        switch (type) {
            case "VERIFICATION ACCOUNT":
                path = "TEMPLATE_VERIFY_ACCOUNT.html";
                break;
            case "FORGOT PASSWORD":
                path = "TEMPLATE_FORGOTPASS.html";
                break;
            case "APPROVAL":
                path = "APPROVAL.NOTIFICATION.html";
                break;
            case "INVOICE AP":
                path = "INVOICE.AP.html";
                break;
            case "INVOICE AR":
                path = "INVOICE.AR.html";
                break;
            case "PAYMENT INVOICE":
                path = "PAYMENT.INVOICE.html";
                break;
            default:
                path = "-";
                break;
        }

        if (path != "-") {
            const html = this.compilerTemplateHtml(path, params);
            const mailOptions = {
                from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`,
                to,
                subject,
                html,
            };
            try {
                const info = await this.TRANSPORTER.sendMail(mailOptions);
                return { "success": true, message: "Email success sender to " + to + " : " + info.messageId }
            } catch (e) {
                return { "success": false, message: "Error " + JSON.stringify(e) }
            }
        } else {
            return { "success": false, message: "Error not process anything !" }
        }
    }

}
export default EmailConfig;