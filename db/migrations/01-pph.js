'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pph', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      wht_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      wht_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      wht_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      wht_bobot: {
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
    await queryInterface.addIndex('master.pph', ['wht_code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.pph', 'wht_code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.pph`,
    );

  },
};
