'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('form_users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user: {
        allowNull: false,
        type: Sequelize.JSONB,
      },
      hospital_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'puskesmas',
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
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('scan', 'manual'),
        defaultValue: 'manual'
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      hospital: {
        type: Sequelize.STRING,
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
      },
      province: {
        type: Sequelize.STRING,
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
      },
      regency: {
        type: Sequelize.STRING,
      },
      flag: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      opened_at: {
        type: Sequelize.DATE,
      },
      approved_by: {
        type: Sequelize.STRING,
      },
      approved_at: {
        type: Sequelize.DATE,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('form_users');
  },
};
