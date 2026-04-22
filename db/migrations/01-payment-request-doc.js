'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_request_doc', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      payment_request_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'payment_request',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      doc_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      doc_path: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.addIndex('transaction.payment_request_doc', ['doc_name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.payment_request_doc', 'doc_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.payment_request_doc`,
    );

  },
};
