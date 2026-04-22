'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      
      parent_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue : 0
      },

      code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      
      location_type: {
        type: Sequelize.ENUM,
        values: ["VENDOR LOCATION","VIEW", "INTERNAL LOCATION", "CUSTOMER LOCATION", "INVENTORY LOSS", "PRODUCTION" , "TRANSIT LOCATION"],
        allowNull: true,
        defaultValue : "INTERNAL LOCATION"
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
      schema: 'master',
    },
  );
    await queryInterface.addIndex('master.locations', ['label','code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.locations', 'label');
    await queryInterface.removeIndex('master.locations', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.locations`,
    );

  },
};
