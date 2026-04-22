'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'leave_quota',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING,
                    defaultValue: Sequelize.literal('uuid_generate_v7()'),
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
                user_id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: 'users',
                            schema: 'credentials',
                        },
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                indexed: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                is_limited: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                is_active: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                count_assign: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                day_amount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                month_amount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                years_amount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                leave_type_id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: 'leave_type',
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
                    defaultValue: 'SYSTEM',
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
                schema: 'transaction',
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'leave_quota',
            schema: 'transaction'
        });
    },
};
