'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('uom', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      uom_category_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'uom_category',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      uom_type: {
        type: Sequelize.ENUM,
        values: ["REFERENCE UOM","SMALL THAN THE REFERENCE UOM","BIGGER THAN THE REFERENCE UOM"],
        allowNull: false
      },
      
      ratio: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
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
    await queryInterface.addIndex('master.uom', ['label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.uom', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.uom`,
    );

  },
};
