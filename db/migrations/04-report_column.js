'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_custom_column', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      reportCustomMasterId: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'report_custom_master',
            schema: 'report'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      avaliable_entry: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      indexed: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    await queryInterface.addIndex('report.report_custom_column', ['title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_custom_column', 'title');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_custom_column`,
    );

  },
};
