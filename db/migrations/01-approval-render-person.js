'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('approval_render_person', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_info: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      bobot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      render_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      render_group_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      render_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },

      reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      send_at: {
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
      
      is_current: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue : false
      },
      
      approval_render_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'approval_render',
            schema: 'workflow'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
   
      max_count_approval: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      
      log_history: {
        type: Sequelize.JSONB,
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
    await queryInterface.addIndex('workflow.approval_render_person', ['user_id' , 'render_index', 'render_group_index', 'render_group']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('workflow.approval_render_person', 'user_id');
    await queryInterface.removeIndex('workflow.approval_render_person', 'render_index');
    await queryInterface.removeIndex('workflow.approval_render_person', 'render_group_index');
    await queryInterface.removeIndex('workflow.approval_render_person', 'render_group');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS workflow.approval_render_person`,
    );

  },
};
