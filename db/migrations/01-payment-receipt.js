'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_receipt', {
      
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

      date_receipt: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      total_credit: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      total_debit: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      bank_internal_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'bank_internal',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    await queryInterface.addIndex('transaction.payment_receipt', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.payment_receipt', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.payment_receipt`,
    );

  },
};
