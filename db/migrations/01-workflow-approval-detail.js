'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workflow_approval_detail', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      approval_type: {
        type: Sequelize.ENUM,
        values: [ "DEFAULT","RATTING"],
        allowNull: true,
        defaultValue : "DEFAULT"
      },

      max_value: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue : 0
      },
      
      indexed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      rejected_type: {
        type: Sequelize.ENUM,
        values: ["PREVIOUS","ALL","GROUP"],
        allowNull: true,
        defaultValue : "ALL"
      },

      workflow_approval_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'workflow_approval',
            schema: 'workflow'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      schema: 'workflow',
    },
  );
    await queryInterface.addIndex('workflow.workflow_approval_detail', ['title' , 'indexed']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workflow.workflow_approval_detail', 'title');
    await queryInterface.removeIndex('workflow.workflow_approval_detail', 'indexed');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS workflow.workflow_approval_detail`,
    );

  },
};
