'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_production', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      order_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
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
    await queryInterface.addIndex('inventory.order_production', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('inventory.order_production', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS inventory.order_production`,
    );

  },
};
