'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shift_employee', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.literal('uuid_generate_v7()'),
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
            `DROP TABLE IF EXISTS master.shift_employee`,
        );
    },
};
