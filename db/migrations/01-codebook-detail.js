'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('codebook_detail', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      codebook_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'codebook',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      text_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      text_value: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      text_other: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      indexed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },

      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },

      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      
      log_history: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      company_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_info: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    await queryInterface.addIndex('master.codebook_detail', ['text_code','text_value']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.codebook_detail', 'text_code');
    await queryInterface.removeIndex('master.codebook_detail', 'text_value');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.codebook_detail`,
    );

  },
};
