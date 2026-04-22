'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_wtp', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      tanggal_sampling: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      nik: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      sales_target_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      completion_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      proportion_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
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
      schema: 'report',
    },
  );
    await queryInterface.addIndex('report.report_sales_performance', ['nik','name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_sales_performance', 'nik');
    await queryInterface.removeIndex('report.report_sales_performance', 'name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_sales_performance`,
    );

  },
};
