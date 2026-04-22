'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'sections',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        code: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        sub_title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        flag: {
          defaultValue: 1, // 1: active, unactive
          type: Sequelize.INTEGER,
        },
        index: {
          defaultValue: 1,
          type: Sequelize.INTEGER,
        },
        form_id: {
          type: Sequelize.BIGINT,
          references: {
            model: {
              tableName: 'forms',
              schema: 'master'
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
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
      `DROP TABLE IF EXISTS master.sections`,
    );
  },
};
