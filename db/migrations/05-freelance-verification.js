'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('freelance_verification', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      fl_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      no_pks: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ammount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      no_bast: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      no_invoice: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      periode_service: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      entity: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      business_user: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      business_user: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bu_function: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      division: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      product: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      level: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      partner: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      document_store: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      data_store: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

    
      status: {
        type: Sequelize.ENUM,
        values: [ "PENDING","WAITING APPROVAL","REJECTED","APPROVED","CANCELED",],
        allowNull: false,
        defaultValue : "PENDING"
      },

      status_payment: {
        type: Sequelize.ENUM,
        values: [ "PENDING","IN PAYMENT","PAYMENT"],
        allowNull: false,
        defaultValue : "PENDING"
      },

      source_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status_integration: {
        type: Sequelize.ENUM,
        values: [ "PENDING","SENDER","SUCCESS","ERROR"],
        allowNull: false,
        defaultValue : "PENDING"
      },

      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    await queryInterface.addIndex('transaction.freelance_verification', ['code','fl_name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.freelance_verification', 'code');
    await queryInterface.removeIndex('transaction.freelance_verification', 'fl_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.freelance_verification`,
    );
  },
};
