'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organization', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      parentId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label_text: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organization_type: {
        type: Sequelize.ENUM,
        values: ["DEPARTMENT","DIVISI","UNIT","POSITION"],
        allowNull: false,
        defaultValue : "DEPARTMENT"
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      indexed: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue :0 
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
    await queryInterface.addIndex('master.organization', ['code','label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.organization', 'code');
    await queryInterface.removeIndex('master.organization', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.organization`,
    );

  },
};
