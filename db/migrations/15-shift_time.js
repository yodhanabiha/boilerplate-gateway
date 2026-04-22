'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shift_time', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            start_type: {
                type: Sequelize.ENUM('SAME DAY', 'NEXT DAY'),
                allowNull: false,
                defaultValue: 'SAME DAY',
            },
            start_time: {
                type: Sequelize.STRING(5),
                allowNull: false,
            },
            end_type: {
                type: Sequelize.ENUM('SAME DAY', 'NEXT DAY'),
                allowNull: false,
                defaultValue: 'SAME DAY',
            },
            end_time: {
                type: Sequelize.STRING(5),
                allowNull: false,
            },
            clock_in_up: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            clock_out_up: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            is_clock_in_rules: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_clock_out_rules: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            over_late_in: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            over_half_in: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            over_early_out: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            over_half_out: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            is_default: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            shift_id: {
                type: Sequelize.STRING,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'shift',
                        schema: 'master',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
            schema: 'master',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `DROP TABLE IF EXISTS master.shift_time`,
        );
    },
};
