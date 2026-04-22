'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_history', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      model_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_model_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value_before: {
        allowNull: true,
        type: Sequelize.JSONB,
      },
      value_after: {
        allowNull: true,
        type: Sequelize.JSONB,
      },
      company_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      company_info: {
        allowNull: true,
        type: Sequelize.JSONB,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()")
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    },
    {
      schema: 'public',
    });

    await queryInterface.addIndex('public.data_history', ['id_model_name'], { name: 'data_history_id_model_name', using: 'HASH' });
    await queryInterface.addIndex('public.data_history', ['model_name'], { name: 'data_history_model_name', using: 'HASH' });
    await queryInterface.addIndex('public.data_history', ['updated_at'], { name: 'data_history_updated_at', using: 'BTREE' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS public.data_history`,
    );
  }
};
