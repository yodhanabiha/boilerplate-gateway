'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('uuid_generate_v7()'),
      },
      nik: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      noTelp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      noHp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      coach_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'employee',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },


      organization_code: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'organization',
            schema: 'master'
          },
          key: 'code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      user_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'users',
            schema: 'credentials'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
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
    await queryInterface.addIndex('master.employee', ['nik','fullname']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.employee', 'nik');
    await queryInterface.removeIndex('master.employee', 'fullname');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.employee`,
    );

  },
};
