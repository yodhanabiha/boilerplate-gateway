'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('form_record_users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      form_user_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'form_users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      section_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'sections',
            schema: 'master',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      variable_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'variables',
            schema: 'master',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      element_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'elements',
            schema: 'master',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      section_label: {
        allownull: false,
        type: Sequelize.STRING,
      },
      section_code: {
        allownull: false,
        type: Sequelize.STRING,
      },
      variable_label: {
        allownull: false,
        type: Sequelize.STRING,
      },
      variable_type: {
        allownull: false,
        type: Sequelize.INTEGER,
      },
      variable_code: {
        allownull: false,
        type: Sequelize.STRING,
      },
      element_value: {
        type: Sequelize.STRING,
      },
      element_code: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('form_record_users');
  },
};
