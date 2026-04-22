'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_assigment', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
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
      schema: 'credentials',
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS credentials.users_assigment`,
    );
  },
};
