'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shift', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            labels: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            types: {
                type: Sequelize.ENUM,
                values: ['FIXED TIME', 'FLEXTIME'],
                allowNull: false,
                defaultValue: 'FIXED TIME',
            },
            date_type: {
                type: Sequelize.ENUM,
                values: ['WORK DAYS', 'OFF DAYS'],
                allowNull: false,
                defaultValue: 'WORK DAYS',
            },
            start_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start_time: {
                type: Sequelize.STRING(5),
                allowNull: false,
            },
            end_type: {
                type: Sequelize.STRING,
                allowNull: false,
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
            `DROP TABLE IF EXISTS master.shift`,
        );
    },
};
