'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shift_group', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
            },
            group_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reloc_sync: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            timezone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            shift_type: {
                type: Sequelize.ENUM,
                values: ['FIXED SHIFT', 'SCHEDULE SHIFT', 'FREE SHIFT'],
                allowNull: true,
                defaultValue: 'FIXED SHIFT',
            },
            is_clock_in_gps: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_clock_out_gps: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_take_photo: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_allow_offsite: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            need_approval: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            need_note: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            need_photos: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
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
            `DROP TABLE IF EXISTS master.shift_group`,
        );
    },
};
