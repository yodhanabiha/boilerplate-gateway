'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      customer_type: {
        type: Sequelize.ENUM,
        values: [ "INDIVIDUAL","COMPANY",],
        allowNull: true,
        defaultValue : "COMPANY"
      },
      no_npwp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      legal_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      legal_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
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

      customer_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'customer',
            schema: 'master'
          },
          key: 'id',
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
    await queryInterface.addIndex('master.customer', ['code','no_npwp', "legal_name", "customer_name"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.customer', 'code');
    await queryInterface.removeIndex('master.customer', 'no_npwp');
    await queryInterface.removeIndex('master.customer', 'legal_name');
    await queryInterface.removeIndex('master.customer', 'vendor_name');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.customer`,
    );

  },
};
