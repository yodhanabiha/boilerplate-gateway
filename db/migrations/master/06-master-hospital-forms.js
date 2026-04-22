'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'hospital_forms',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        hospital_id: {
          type: Sequelize.BIGINT,
          references: {
            model: {
              tableName: 'puskesmas',
              schema: 'public',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        form_id: {
          type: Sequelize.BIGINT,
          references: {
            model: {
              tableName: 'forms',
              schema: 'master',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        province_id: {
          type: Sequelize.STRING,
          references: {
            model: {
              tableName: 'provinces',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        regency_id: {
          type: Sequelize.STRING,
          references: {
            model: {
              tableName: 'regencies',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        district_id: {
          type: Sequelize.STRING,
          references: {
            model: {
              tableName: 'districts',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        village_id: {
          type: Sequelize.STRING,
          references: {
            model: {
              tableName: 'villages',
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
      },
      {
        schema: 'master',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.hospital_forms`,
    );
  },
};
