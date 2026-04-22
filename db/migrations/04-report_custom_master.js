'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_custom_master', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      label: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.addIndex('report.report_custom_master', ['code','label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_custom_master', 'code');
    await queryInterface.removeIndex('report.report_custom_master', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_custom_master`,
    );

  },
};
