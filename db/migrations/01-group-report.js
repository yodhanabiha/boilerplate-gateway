'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('group_report', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      parent_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue:0
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
    await queryInterface.addIndex('master.group_report', ['label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.group_report', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.group_report`,
    );

  },
};
