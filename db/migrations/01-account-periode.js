'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_periode', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      status: {
        type: Sequelize.ENUM,
        values: [ "OPEN","CLOSE"],
        allowNull: true,
        defaultValue : "OPEN"
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

      notes: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('master.account_periode', ['periode']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.account_periode', 'periode');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.account_periode`,
    );

  },
};
