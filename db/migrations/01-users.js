'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password_default: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      verif_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_sign_in: {
        type: Sequelize.DATE,
      },

      is_online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      lang: {
        type: Sequelize.STRING,
      },

      user_type: {
        type: Sequelize.ENUM,
        values: [ "PERSONAL","COMPANY"],
        allowNull: false,
        defaultValue : "PERSONAL"
      },

      status: {
        type: Sequelize.ENUM,
        values: [ "NOT ACTIVED","ACTIVED","NEED VERIFICATION","BANNED"],
        allowNull: false,
        defaultValue : "NEED VERIFICATION"
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
    await queryInterface.addIndex('credentials.users', ['email']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('credentials.users', 'email');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS credentials.users`,
    );
  },
};
