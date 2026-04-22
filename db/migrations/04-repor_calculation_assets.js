'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_calculation_assets', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      nama_asset: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      masa_manfaat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
      },

      tanggal_pembelian: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      tanggal_akhir_manfaat: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      harga_beli: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
      },

      perkiraan_harga_akhir: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      depresiasi: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },
      
      nilai_sisa: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },
      
      status: {
        type: Sequelize.ENUM,
        values: [ "ON GOING","DONE",],
        allowNull: false,
        defaultValue : "ON GOING"
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
    await queryInterface.addIndex('report.report_calculation_assets', ['nama_asset','category']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_calculation_assets', 'nama_asset');
    await queryInterface.removeIndex('report.report_calculation_assets', 'category');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_calculation_assets`,
    );

  },
};
