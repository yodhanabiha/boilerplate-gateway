'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_data_header', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      report_custom_master_id: {
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

      code: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      sampel_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM,
        values: ["DRAFT","SUBMITED"],
        allowNull: true,
        defaultValue : "DRAFT"
      },

      hasil: {
        type: Sequelize.ENUM,
        values: ["DRAFT","ON HOLD","REJECTED", "APPROVED"],
        allowNull: true,
        defaultValue : "DRAFT"
      },

      diperiksa_oleh: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      diputuskan_oleh: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('report.report_data_header', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_data_header`,
    );

  },
};
