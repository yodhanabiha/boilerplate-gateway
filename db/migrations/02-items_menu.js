'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_items', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      
      icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      label_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },


      url_path: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      parent_id: {
        type: Sequelize.BIGINT,
      },

      indexed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      schema: 'master',
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master.menu_items');
  },
};
