'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      nature: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      group_report_id: {
        type: Sequelize.BIGINT,
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
    await queryInterface.addIndex('master.coa', ['nature']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.coa', 'nature');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.coa`,
    );

  },
};
