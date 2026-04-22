'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_data_items', {

      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },

      header_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'report_data_header',
            schema: 'report'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      report_custom_master_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'report_custom_master',
            schema: 'report'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      report_custom_rows_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'report_custom_rows',
            schema: 'report'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      
      report_custom_column_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'report_custom_column',
            schema: 'report'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      text_value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM,
        values: ["DRAFT","SUBMITED"],
        allowNull: true,
        defaultValue : "DRAFT"
      },

      hasil: {
        type: Sequelize.ENUM,
        values: ["DRAFT","ON HOLD","REJECTED", "APPROVED"],
        allowNull: true,
        defaultValue : "DRAFT"
      },

      diperiksa_oleh: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      diputuskan_oleh: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
      schema: 'report',
    },
  );
    await queryInterface.addIndex('report.report_data_items', ['text_value']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('report.report_data_items', 'text_value');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS report.report_data_items`,
    );

  },
};
