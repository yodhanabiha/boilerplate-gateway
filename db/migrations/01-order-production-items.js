'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_production_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      order_production_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'order_production',
            schema: 'inventory'
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

      notes: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.ENUM,
        values: [ "WAITING", "ONPROGRESS", "DONE"],
        allowNull: true,
      },
      
      production_amdk_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'production_amdk',
            schema: 'inventory'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      production_blow_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'production_blow',
            schema: 'inventory'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM,
        values: [ "WAITING", "ONPROGRESS", "DONE"],
        allowNull: true,
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
      schema: 'inventory',
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS inventory.order_production_items`,
    );

  },
};
