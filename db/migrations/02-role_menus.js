'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      
      menus_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'menu_items',
            schema: 'master'
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      role_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'roles',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      act_views: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      act_reads: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      act_create: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },


      act_update: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      act_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      act_denied: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
      schema: 'credentials',
    },
  );
    await queryInterface.addIndex('credentials.role_menus', ['flag','role_id','menus_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('credentials.role_menus', 'flag');
    await queryInterface.removeIndex('credentials.role_menus', 'role_id');
    await queryInterface.removeIndex('credentials.role_menus', 'menus_id');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS credentials.role_menus  `,
    );
  },

};
