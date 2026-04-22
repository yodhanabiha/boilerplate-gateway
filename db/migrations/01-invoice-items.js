'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      invoice_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'invoice',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      product_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'product',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      
      quantity: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0
      },

      uom_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'uom',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      unit_price: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0
      },

      tax_bobot: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0
      },

      subtotal_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0
      },

      total_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
        defaultValue:0
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
    await queryInterface.addIndex('transaction.invoice_items', ['title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.invoice_items', 'title');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.invoice_items`,
    );

  },
};
