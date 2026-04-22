'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'users',
            schema: 'credentials'
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'roles',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()'),
      },

      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      schema: 'credentials',
    },
  );
    await queryInterface.addIndex('credentials.user_roles', ['user_id']);
    await queryInterface.addIndex('credentials.user_roles', ['role_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('credentials.user_roles');
    await queryInterface.removeIndex('credentials.user_roles', 'user_id');
    await queryInterface.removeIndex('credentials.user_roles', 'role_id');
  },
};
