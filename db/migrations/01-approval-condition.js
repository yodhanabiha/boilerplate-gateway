'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('approval_condition', {
  
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      field: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      operator: {
        type: Sequelize.ENUM,
        values: ["!=","==",">=","<=","<",">","IN","NOT IN","LIKE"],
        allowNull: false,
        defaultValue : "=="
      },

      text_value: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 0
      },
      
      acc_indexed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      acc_group: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      workflow_approval_detail_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'workflow_approval_detail',
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
    await queryInterface.addIndex('workflow.approval_condition', ['acc_indexed' , 'acc_group']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workflow.approval_condition', 'acc_indexed');
    await queryInterface.removeIndex('workflow.approval_condition', 'acc_group');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS workflow.approval_condition`,
    );

  },
};
