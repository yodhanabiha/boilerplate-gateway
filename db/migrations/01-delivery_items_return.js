'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('delivery_items_return', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      delivery_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'delivery',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      delivery_items_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'delivery_items',
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
        defaultValue: 1,
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

      demand: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0
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

      notes: {
        type: Sequelize.STRING,
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
    await queryInterface.addIndex('transaction.delivery_items_return', ['title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.delivery_items_return', 'title');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.delivery_items_return`,
    );

  },
};
