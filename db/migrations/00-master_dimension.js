'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'dimensions',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.BIGINT,
                },
                code: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                dimension_type: {
                    type: Sequelize.ENUM,
                    values: ['DIVISION', 'PRODUCT', 'LEVEL', 'PARTNER', 'LOCATION'],
                    allowNull: false,
                    defaultValue: 'DIVISION',
                },
                is_active: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: true,
                },
                log_history: {
                    type: Sequelize.JSONB,
                    allowNull: true,
                },
                created_by: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('now()'),
                },
                updated_by: {
                    type: Sequelize.STRING,
                },
                updated_at: {
                    type: Sequelize.DATE,
                },
                deleted_at: {
                    type: Sequelize.DATE,
                },
            },
            {
                schema: 'master',
            },
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `DROP TABLE IF EXISTS master.dimensions`,
        );
    },
};
