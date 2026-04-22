'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('notification', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      resource_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      title : {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description : {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      additional_info : {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      category: {
        type: Sequelize.ENUM,
        values: [ "INFORMATION", "APPROVAL",  "",],
        allowNull: true,
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
      schema: 'public',
    },
  );
    await queryInterface.addIndex('public.notification', ['code','no_npwp', "legal_name", "vendor_name"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('public.notification', 'code');
    await queryInterface.removeIndex('public.notification', 'no_npwp');
    await queryInterface.removeIndex('public.notification', 'legal_name');
    await queryInterface.removeIndex('public.notification', 'vendor_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS public.notification`,
    );

  },
};
