'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      
      income_nature: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'coa',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      expense_nature: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'coa',
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
        unique:true
      },

      parent_id: {
        type: Sequelize.BIGINT,
        defaultValue: 1,
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
    await queryInterface.addIndex('master.product_category', ['label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.product_category', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.product_category`,
    );

  },
};
