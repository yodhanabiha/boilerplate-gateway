'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workflow_approval', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code_approval: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
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
      schema: 'workflow',
    },
  );
    await queryInterface.addIndex('workflow.workflow_approval', ['code_approval']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workflow.workflow_approval', 'code_approval');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS workflow.workflow_approval`,
    );

  },
};
