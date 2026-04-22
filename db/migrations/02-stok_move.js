'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_move', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      references: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      references_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      location_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'locations',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        allowNull: false,
      },

      batch_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
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

      onhand_quantity: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.00
      },

      reserved_quantity  : {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.00
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
        allowNull: false,
      },

      notes: {
        type: Sequelize.TEXT,
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
      schema: 'inventory',
    },
  );
    await queryInterface.addIndex('inventory.stock_move', ['batch_number']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('inventory.stock_move', 'batch_number');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS inventory.stock_move`,
    );

  },
};
