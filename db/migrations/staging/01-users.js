'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password_default: {
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
      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      lang: {
        type: Sequelize.STRING,
      },
      hospital_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'puskesmas',
          },
          key: 'id',
        },
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
      schema: 'account',
    },
  );
    await queryInterface.addIndex('account.users', ['flag']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('account.users', 'flag');

    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS account.users`,
    );

  },
};
