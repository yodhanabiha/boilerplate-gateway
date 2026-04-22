'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('date_holiday', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            date_holiday: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM,
                values: ['ACTIVE', 'DEACTIVE'],
                allowNull: true,
                defaultValue: 'ACTIVE',
            },
            created_by: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: true,
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
            `DROP TABLE IF EXISTS master.date_holiday`,
        );
    },
};
