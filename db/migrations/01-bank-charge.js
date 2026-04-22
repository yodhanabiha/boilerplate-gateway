'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_charge', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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

      cost_bank_charge: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue : 6500.00
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
    await queryInterface.addIndex('master.bank_charge', ['bank_internal_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.bank_charge', 'bank_internal_id');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.bank_charge`,
    );

  },
};
