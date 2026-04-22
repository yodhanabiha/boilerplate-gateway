'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'forms',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        code: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        sub_title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        note: {
          type: Sequelize.TEXT,
        },
        flag: {
          type: Sequelize.INTEGER,
          defaultValue: 1, // 1: active, 0: unactive
        },
        index: {
          type: Sequelize.INTEGER,
          defaultValue: 1
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
        schema: 'master',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.forms`,
    );
  },
};
