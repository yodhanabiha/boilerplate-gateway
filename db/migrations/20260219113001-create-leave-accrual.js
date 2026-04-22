'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'leave_accrual',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING,
                    defaultValue: Sequelize.literal('uuid_generate_v7()'),
                },
                cycle: {
                    type: Sequelize.ENUM('ANNUALLY', 'SEMI-ANNUALLY', 'MONTHLY'),
                    allowNull: false,
                    defaultValue: 'ANNUALLY',
                },
                start_from: {
                    type: Sequelize.ENUM('EMPLOYEE JOIN', 'SPECIFIED DATE'),
                    allowNull: false,
                    defaultValue: 'EMPLOYEE JOIN',
                },
                leave_rules: {
                    type: Sequelize.JSONB,
                    allowNull: true,
                },
                is_expired: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                expired_month: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                expired_day: {
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
                schema: 'master',
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'leave_accrual',
            schema: 'master',
        });
        await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "master"."enum_leave_accrual_cycle";`);
        await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "master"."enum_leave_accrual_start_from";`);
    },
};
