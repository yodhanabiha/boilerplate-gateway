'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'leave_rules',
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING,
                    defaultValue: Sequelize.literal('uuid_generate_v7()'),
                },
                is_min_duration_unlimited: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                min_duration: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                is_max_duration_unlimited: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                max_duration: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                is_max_duration_condition: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                max_duration_condition: {
                    type: Sequelize.JSONB,
                    allowNull: true,
                },
                time_limit_to_submit: {
                    type: Sequelize.ENUM('UNLIMITED', 'BEFORE', 'AFTER'),
                    allowNull: false,
                    defaultValue: 'UNLIMITED',
                },
                time_limit_amount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                is_allow_duplicate_req: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
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
            tableName: 'leave_rules',
            schema: 'master',
        });
        await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "master"."enum_leave_rules_time_limit_to_submit";`);
    },
};
