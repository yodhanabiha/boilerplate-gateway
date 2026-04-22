import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import CodebookRepository from "../../../models/repository/master/CodebookRepository";
import { CodebookAllType, CodebookPaginationType, CreateCodebookAttributeBody } from "./Request";
import CodebookDetail from "../../../models/entity/master/CodebookDetail";

class CodebookHandler {

    private codebookRepo = CodebookRepository

    async handleGetCodebookAll(identity: TokenPayload, pagination: CodebookAllType): Promise<any> {

        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }

        try {
            let JSON_FILTER_D = JSON.parse(pagination.filter);
            if (JSON_FILTER_D.where != undefined) {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            },
                            JSON_FILTER_D.where
                        ]
                    }
                };
            } else {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        } catch (e) {
            if (pagination.search != null && pagination.search != "") {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        }
        JSON_FILTER["attributes"] = { exclude: ['logHistory'] };

        const codebookInfo = await this.codebookRepo.getAllData(JSON_FILTER);
        return codebookInfo;

    }

    async handleGetCodebook(identity: TokenPayload, pagination: CodebookPaginationType): Promise<any> {

        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }

        try {
            let JSON_FILTER_D = JSON.parse(pagination.filter);
            if (JSON_FILTER_D.where != undefined) {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            },
                            JSON_FILTER_D.where
                        ]
                    }
                };
            } else {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        } catch (e) {
            if (pagination.search != null && pagination.search != "") {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { code: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        }
        JSON_FILTER["attributes"] = { exclude: ['logHistory'] };

        const codebookInfo = await this.codebookRepo.getPaginationDataSearch(
            JSON_FILTER,
            {
                page: pagination.page,
                pageSize: pagination.pageSize,
                softDeleted: false,
            },
        );

        return {
            rows: codebookInfo.rows,
            total: codebookInfo.count
        };

    }

    async handleGetCodebookById(identity: TokenPayload, code: string): Promise<any> {
        let infoCodebook = await this.codebookRepo.getSingleData({
            where: { code: code, companyId: identity.companySelected?.id },
            include: [
                { model: CodebookDetail, attributes: ['id', 'textCode', 'textValue', 'textOther', 'description', 'indexed'] }
            ],
            attributes: { exclude: ['logHistory'] }
        });
        if (!infoCodebook) throw new ErrorHandler(400, 'Codebook not found !');
        return infoCodebook;
    }

    async handleCreateCodebook(
        identity: TokenPayload,
        body: CreateCodebookAttributeBody
    ): Promise<any> {

        let codebookCodeInfo = await this.codebookRepo.getSingleData({
            where: {
                [Op.and]: [
                    { code: body.code },
                    { companyId: identity.companySelected?.id },
                ]
            }
        });

        if (codebookCodeInfo) throw new ErrorHandler(400, 'Codebook  code  already exities !');


        const t = await mainDb.transaction();
        try {
            const createBank = await this.codebookRepo.insertNewData({
                createdBy: identity.id,
                code: body.code,
                label: body.label,
                description: body.description,
                flag: 1,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected,
                logHistory: [{
                    message: "Codebook Created",
                    created_at: new Date(),
                    created_by: identity.email,
                    data: body
                }]
            }, { transaction: t });

            if (createBank) {
                await t.commit();
            }
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  codebook !');
        }
    }

    async handleUpdateCodebook(
        identity: TokenPayload,
        id: number,
        body: CreateCodebookAttributeBody
    ): Promise<any> {

        const infoCodebook = await this.codebookRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoCodebook) throw new ErrorHandler(400, 'Codebook not found !');


        const codebookCodeInfo = await this.codebookRepo.getSingleData({
            where: {
                [Op.and]: [
                    { code: body.code },
                    { companyId: identity.companySelected?.id },
                    { id: { [Op.ne]: id } }
                ]
            }
        })
        if (codebookCodeInfo) throw new ErrorHandler(400, 'Codebook  code already exities !');

        const t = await mainDb.transaction();
        try {
            let history: any; history = infoCodebook.logHistory == null ? [] : infoCodebook.logHistory;
            history.unshift({
                message: "Codebook Updated",
                created_at: new Date(),
                created_by: identity.email,
                data: body
            })

            const updateBank = await this.codebookRepo.updateData({
                code: body.code,
                label: body.label,
                description: body.description,
                flag: 1,
                logHistory: history,
                updatedBy: identity.id,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected
            }, { where: { id: infoCodebook.id }, transaction: t });

            if (updateBank) {
                await t.commit();
            }

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  codebook !');
        }
    }

    async handleDeleteCodebook(
        identity: TokenPayload,
        id: number
    ): Promise<any> {
        let infoCodebook = await this.codebookRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoCodebook) throw new ErrorHandler(400, 'Codebook not found !');

        const t = await mainDb.transaction();
        try {
            await this.codebookRepo.deleteData({ where: { id: id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  codebook !');
        }
    }


}

export default CodebookHandler;