'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coa_saldo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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
        allowNull: false,
      },

      category: {
        type: Sequelize.ENUM,
        values: [ "CM","AP","AR", "GL"],
        allowNull: true,
        defaultValue : "AP"
      },

      periode: {
        type: Sequelize.STRING,
        allowNull: true
      },

      saldo_awal: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      saldo_akhir: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
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
    await queryInterface.addIndex('transaction.coa_saldo', ['periode']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.coa_saldo', 'periode');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.coa_saldo`,
    );

  },
};
