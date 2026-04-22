'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('delivery', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      sales_order_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'sales_order',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      delivery_address_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'customer_contact',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      schedule_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      deadline: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      source_document: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      
      status: {
        type: Sequelize.ENUM,
        values: [ "DRAFT","WAITING","READY","DONE","CANCEL"],
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
    await queryInterface.addIndex('transaction.delivery', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.delivery', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.delivery`,
    );

  },
};
