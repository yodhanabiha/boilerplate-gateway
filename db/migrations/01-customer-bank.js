'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_bank', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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
        allowNull: false,
      },

      bank_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'bank',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      account_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      account_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_current: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
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
      schema: 'master',
    },
  );
    await queryInterface.addIndex('master.customer_bank', ['account_number','account_name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.customer_bank', 'account_number');
    await queryInterface.removeIndex('master.customer_bank', 'account_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.customer_bank`,
    );

  },
};
