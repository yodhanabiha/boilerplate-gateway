import admin from "firebase-admin";
import FirebaseConfig from "../config/Firebase";
import NotificationRepository from "../models/repository/transaction/NotificationRepository";
import { create } from "lodash";


class FirebaseUtility {
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(FirebaseConfig as admin.ServiceAccount)
            });
        }
    }

    public async sendNotificationToUser(token: string, title: string, body: string, data?: any, valueInsert?: any) {

        const message = {
            notification: {
                title,
                body
            },
            data: { payload: JSON.stringify(data) },
            token
        };

        try {
            let notificationRepo = NotificationRepository;
            const createNotification = await notificationRepo.insertNewData({
                createdBy: "SYSTEM",
                category: "PERSON",
                type: "APPROVAL",
                to: token,
                subject: title,
                body: body ? "-" : body,
                data: data,
                isRead: false,
                isDelivered: false,
                ...valueInsert
            });
            if (createNotification) {
                await admin.messaging().send(message);
            }
        } catch (error) { console.log(error) }
    }

    public async sendNotificationToTopic(topic: string, title: string, body: string, data?: any) {
        const message = {
            notification: {
                title,
                body
            },
            data,
            topic
        };




        await admin.messaging().send(message);
    }

}
export default FirebaseUtility;