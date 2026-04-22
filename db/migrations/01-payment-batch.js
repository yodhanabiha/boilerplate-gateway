'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_batch', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
      },

      date_batch: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },
    
      total_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      actual_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      total_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      status: {
        type: Sequelize.ENUM,
        values: [ "DRAFT","SUBMITED","WAITING APPROVAL","REJECTED","APPROVED","CANCELED",],
        allowNull: false,
        defaultValue : "DRAFT"
      },
      
      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      
      log_history: {
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
    await queryInterface.addIndex('transaction.payment_batch', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.payment_batch', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.payment_batch`,
    );

  },
};
