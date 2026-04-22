'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS transaction');
        await queryInterface.createTable('attendance_employee', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            in_time: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            out_time: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            is_late: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_early_out: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_no_record: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            late_minutes: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            early_out_minutes: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            employee_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'employee',
                        schema: 'master',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            shift_group_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'shift_group',
                        schema: 'master',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            shift_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'shift',
                        schema: 'master',
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
            `DROP TABLE IF EXISTS transaction.attendance_employee`,
        );
    },
};
