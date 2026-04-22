'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_contact', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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
      
      contact_type: {
        type: Sequelize.ENUM,
        values: [ "CONTACT","INVOICE ADDRESS","DELIVERY ADDRESS", "FOLLOW UP ADDRESS","OTHERS ADDRESS"],
        allowNull: true,
        defaultValue : "CONTACT"
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
    await queryInterface.addIndex('master.customer_contact', ['contact_name','email']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.customer_contact', 'contact_name');
    await queryInterface.removeIndex('master.customer_contact', 'email');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.customer_contact`,
    );

  },
};
