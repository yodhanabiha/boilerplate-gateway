'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
        primaryKey: true,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      label: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      no_telp: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      status: {
        allowNull: true,
        type: Sequelize.ENUM('ACTIVED', 'PENDING', 'DUE SOON', 'SUSPENDED', 'TERMINATED', 'CANCELED'),
        defaultValue: 'PENDING',
      },
      max_user: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      cost: {
        allowNull: true,
        type: Sequelize.DECIMAL(32, 16),
      },
      cost_total: {
        allowNull: true,
        type: Sequelize.DECIMAL(32, 16),
      },
      start_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      remainder_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
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
        allowNull: true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.company`,
    );
  }
};
