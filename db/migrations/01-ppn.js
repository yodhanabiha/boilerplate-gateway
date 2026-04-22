'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ppn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      tax_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      tax_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      tax_bobot: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      nature_code: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'coa',
            schema: 'master'
          },
          key: 'nature',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      
      log_history: {
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
    await queryInterface.addIndex('master.ppn', ['tax_code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.ppn', 'tax_code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.ppn`,
    );

  },
};
