'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_internal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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

      coa_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'coa',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      is_receipt: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      is_payment: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.bank_internal`,
    );

  },
};
