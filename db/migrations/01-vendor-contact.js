'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendor_contact', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      vendor_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'vendor',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      
      contact_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      no_telp: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      no_hp: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      is_current: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
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
    await queryInterface.addIndex('master.vendor_contact', ['contact_name','email']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.vendor_contact', 'contact_name');
    await queryInterface.removeIndex('master.vendor_contact', 'email');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.vendor_contact`,
    );

  },
};
