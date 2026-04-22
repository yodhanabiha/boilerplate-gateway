import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import CodebookDetail from "../../../models/entity/master/CodebookDetail";
import CodebookDetailRepository from "../../../models/repository/master/CodebookDetailRepository";
import CodebookRepository from "../../../models/repository/master/CodebookRepository";
import { CodebookDetailAllType, CodebookDetailPaginationType, CreateCodebookDetailAttributeBody } from "./Request";
import Codebook from "../../../models/entity/master/Codebook";

class CodebookDetailHandler {

    private codebookRepo = CodebookRepository;
    private codebookDetailRepo = CodebookDetailRepository;


    async handleGetCodebookDetailAll(identity: TokenPayload, codeCodebook: string, pagination: CodebookDetailAllType): Promise<any> {

        const codebook = await this.codebookRepo.getSingleData({ where: { code: codeCodebook } });
        if (!codebook) throw new ErrorHandler(400, 'Codebook not found !');

        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { codebookId: codebook.id },
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        }

        JSON_FILTER["include"] = [
            { model: Codebook, require: true, attributes: ['id', 'code', 'description', 'label'] }
        ];
        JSON_FILTER["attributes"] = { exclude: ['logHistory'] };

        const codebookDetailInfo = await this.codebookDetailRepo.getAllData(JSON_FILTER);
        return codebookDetailInfo;

    }

    async handleGetCodebookDetail(identity: TokenPayload, codeCodebook: string, pagination: CodebookDetailPaginationType): Promise<any> {

        const codebook = await this.codebookRepo.getSingleData({ where: { code: codeCodebook, companyId: identity.companySelected?.id } });
        if (!codebook) throw new ErrorHandler(400, 'Codebook not found !');


        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { codebookId: codebook.id },
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
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
                            { codebookId: codebook.id },
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { textCode: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { textValue: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { description: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        }

        JSON_FILTER["include"] = [
            { model: Codebook, require: true, attributes: ['id', 'code', 'description', 'label'] }
        ];
        JSON_FILTER["attributes"] = { exclude: ['logHistory'] };

        const codebookDetailInfo = await this.codebookDetailRepo.getPaginationDataSearch(
            JSON_FILTER,
            {
                page: pagination.page,
                pageSize: pagination.pageSize,
                softDeleted: false,
            },
        );

        return {
            rows: codebookDetailInfo.rows,
            total: codebookDetailInfo.count
        };

    }

    async handleGetCodebookDetailById(identity: TokenPayload, id: number): Promise<any> {
        let infoCodebookDetail = await this.codebookDetailRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id },
            include: [
                { model: Codebook, attributes: ['id', 'code', 'description', 'label'] }
            ],
            attributes: { exclude: ['logHistory'] }
        });
        if (!infoCodebookDetail) throw new ErrorHandler(400, 'Codebook detail not found !');
        return infoCodebookDetail;
    }

    async handleCreateCodebookDetail(
        identity: TokenPayload,
        id: number,
        body: CreateCodebookDetailAttributeBody
    ): Promise<any> {

        let codebookInfo = await this.codebookRepo.getSingleData({
            where: {
                [Op.and]: [
                    { id: id },
                    { companyId: identity.companySelected?.id },
                ]
            }
        });
        if (!codebookInfo) throw new ErrorHandler(400, 'Codebook not found !');


        let codebookCodeInfo = await this.codebookDetailRepo.getSingleData({
            where: {
                [Op.and]: [
                    { codebookId: codebookInfo.id },
                    { companyId: identity.companySelected?.id },
                    {
                        [Op.or]: [
                            { textCode: body.text_code },
                            { textValue: body.text_value },
                        ]
                    }
                ]
            }
        });

        if (codebookCodeInfo) throw new ErrorHandler(400, 'Text code or text value already exities !');
        const codebookDet = await this.codebookDetailRepo.getCountData({ where: { codebookId: codebookInfo.id } })

        const t = await mainDb.transaction();
        try {
            const createBank = await this.codebookDetailRepo.insertNewData({
                createdBy: identity.id,
                textCode: body.text_code,
                textValue: body.text_value,
                textOther: JSON.parse(body.text_other == undefined || body.text_other == null || body.text_other == "" ? "{}" : body.text_other),
                description: body.description,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected,
                flag: 1,
                logHistory: [{
                    message: "Codebook Detail Created",
                    created_at: new Date(),
                    created_by: identity.email,
                    data: body
                }],
                codebookId: codebookInfo.id,
                indexed: (codebookDet + 1),
                parentId: body.parent_id
            }, { transaction: t });

            if (createBank) {
                await t.commit();
            }
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  codebook detail !');
        }
    }

    async handleUpdateCodebookDetail(
        identity: TokenPayload,
        id: number,
        body: CreateCodebookDetailAttributeBody
    ): Promise<any> {

        const infoCodebookDetail = await this.codebookDetailRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoCodebookDetail) throw new ErrorHandler(400, 'Codebook detail not found !');


        const codebookDetailCodeInfo = await this.codebookDetailRepo.getSingleData({
            where: {
                [Op.and]: [
                    { companyId: identity.companySelected?.id },
                    {
                        [Op.or]: [
                            { textCode: body.text_code },
                            { textValue: body.text_value },
                        ]
                    },
                    { id: { [Op.ne]: id } }
                ]
            }
        })
        if (codebookDetailCodeInfo) throw new ErrorHandler(400, 'Text code or text value already exities !');

        const t = await mainDb.transaction();
        try {
            let history: any; history = infoCodebookDetail.logHistory == null ? [] : infoCodebookDetail.logHistory;
            history.unshift({
                message: "Codebook detail Updated",
                created_at: new Date(),
                created_by: identity.email,
                data: body
            })

            const updateBank = await this.codebookDetailRepo.updateData({
                textCode: body.text_code,
                textValue: body.text_value,
                textOther: JSON.parse(body.text_other == undefined || body.text_other == null || body.text_other == "" ? "{}" : body.text_other),
                description: body.description,
                flag: 1,
                logHistory: history,
                updatedBy: identity.id,
                parentId: body.parent_id,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected
            }, { where: { id: infoCodebookDetail.id }, transaction: t });

            if (updateBank) {
                await t.commit();
            }

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  codebook detail !');
        }
    }

    async handleDeleteCodebookDetail(
        identity: TokenPayload,
        id: number
    ): Promise<any> {
        let infoCodebookDetail = await this.codebookDetailRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoCodebookDetail) throw new ErrorHandler(400, 'Codebook  detail not found !');

        const t = await mainDb.transaction();
        try {
            await this.codebookDetailRepo.deleteData({ where: { id: id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  codebook detail !');
        }
    }


}

export default CodebookDetailHandler;