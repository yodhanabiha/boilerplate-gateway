'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attachments', {
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
      },
      path: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      note: {
        type: Sequelize.TEXT,
      },
      log: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
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
    await queryInterface.dropTable('attachments');
  },
};
