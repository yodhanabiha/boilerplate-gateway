'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank', {

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

      bank_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },


      prinsip: {
        type: Sequelize.ENUM,
        values: ["KONVENSIONAL","SYARIAH"],
        allowNull: false,
        defaultValue : "KONVENSIONAL"
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
    await queryInterface.addIndex('master.bank', ['code', 'bank_name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.bank', 'code');
    await queryInterface.removeIndex('master.bank', 'bank_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.bank`,
    );

  },
};
