'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('mail_transaction', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      send_from: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      send_to: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      send_cc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      send_subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      send_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      send_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      send_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("DRAFT", "WAITING", "PROCESSED", "SUCCESS", "ERROR", "RESENDER"),
        allowNull: false,
        defaultValue: "DRAFT"
      },

      send_param: {
        allowNull: true,
        type: Sequelize.JSONB,
      },

      company_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_info: {
        type: Sequelize.JSONB,
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
    },
    {
      schema: 'transaction',
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.mail_transaction`,
    );

  },
};
