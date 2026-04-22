'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('sales_order', {
      
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

      customer_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'customer',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      invoice_address_id: {
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

      order_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },
      
      top_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },
      
    
      tax_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      subtotal_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      
      disc_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      total_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue : "IDR"
      },
      
      term_condition: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('transaction.sales_order', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.sales_order', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.sales_order`,
    );

  },
};
