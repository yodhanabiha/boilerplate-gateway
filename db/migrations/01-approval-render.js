'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('approval_render', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      data_value: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      target_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      target_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      assign_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      approval_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      rejected_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      rejected_type: {
        type: Sequelize.ENUM,
        values: ["PREVIOUS","ALL","GROUP"],
        allowNull: false,
        defaultValue : "PREVIOUS"
      },

      approval_type: {
        type: Sequelize.ENUM,
        values: [ "DEFAULT","RATTING"],
        allowNull: false,
        defaultValue : "DEFAULT"
      },

      max_values: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      approval_status: {
        type: Sequelize.ENUM,
        values: [  "WAITING APPROVAL","APPROVED","REJECTED","CANCELED"],
        allowNull: false,
        defaultValue : "WAITING APPROVAL"
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
    await queryInterface.addIndex('workflow.approval_render', ['target_id' , 'target_name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workflow.approval_render', 'target_id');
    await queryInterface.removeIndex('workflow.approval_render', 'target_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS workflow.approval_render`,
    );

  },
};
