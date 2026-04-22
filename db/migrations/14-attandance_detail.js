'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS transaction');
        await queryInterface.createTable('attendance_detail', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            attandance_type: {
                type: Sequelize.ENUM('IN', 'OUT', 'APPROVAL', 'NOTED', 'BREAK', 'DONE'),
                allowNull: true,
                defaultValue: 'NOTED',
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            latitude: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            longitude: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            desc_detail: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            at_entry: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            attande_employee_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'attendance_employee',
                        schema: 'transaction',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        }, {
            schema: 'transaction',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `DROP TABLE IF EXISTS transaction.attendance_detail`,
        );
    },
};
