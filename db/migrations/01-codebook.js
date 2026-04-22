'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('codebook', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique:true
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
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

      company_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_info: {
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
    await queryInterface.addIndex('master.codebook', ['code','label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.codebook', 'code');
    await queryInterface.removeIndex('master.codebook', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.codebook`,
    );

  },
};
