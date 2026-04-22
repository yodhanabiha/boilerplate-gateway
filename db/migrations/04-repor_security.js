'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_security', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      nama_barang: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      nama_supir: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      nopol: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
      },

      nomor_surat_jalan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      notes: {
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
    await queryInterface.addIndex('report.report_security', ['nama_supir','nomor_surat_jalan']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_security', 'nama_supir');
    await queryInterface.removeIndex('report.report_security', 'nomor_surat_jalan');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_security`,
    );

  },
};
