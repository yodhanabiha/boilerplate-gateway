'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendor', {

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
      no_npwp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legal_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      no_telp: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      no_hp: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING(30),
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
    await queryInterface.addIndex('master.vendor', ['code','no_npwp', "legal_name", "vendor_name"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.vendor', 'code');
    await queryInterface.removeIndex('master.vendor', 'no_npwp');
    await queryInterface.removeIndex('master.vendor', 'legal_name');
    await queryInterface.removeIndex('master.vendor', 'vendor_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.vendor`,
    );

  },
};
