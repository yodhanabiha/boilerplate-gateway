'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company_user', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
        primaryKey: true,
      },
      company_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'company',
            schema: 'master'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'users',
            schema: 'credentials'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        allowNull: true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.company_user`,
    );
  }
};
