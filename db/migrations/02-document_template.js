'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('document_template', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      document_type: {
        type: Sequelize.ENUM,
        values: [ "PURCHASE ORDER", "PURCHASE REQUEST", "INVOICE", "SALES ORDER"],
        allowNull: false
      },

      background_header: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      background_footer: {
        type: Sequelize.STRING,
        allowNull: false,
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
      schema: 'public',
    },
  );
    await queryInterface.addIndex('public.document_template', ['flag']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('public.document_template', 'flag');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS public.document_template`,
    );

  },
};
