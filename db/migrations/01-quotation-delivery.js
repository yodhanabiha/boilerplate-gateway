'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('delivery_quotation', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
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
        allowNull: true,
      },

      delivery_address_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'customer_contact',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      location_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'locations',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      schedule_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      
      dateline_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      
      so_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'sales_order',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM,
        values: [ "DRAFT","SUBMITED","WAITING APPROVAL","REJECTED","APPROVED","CANCELED",],
        allowNull: false,
        defaultValue : "DRAFT"
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
      schema: 'transaction',
    },
  );
    await queryInterface.addIndex('transaction.delivery_quotation', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.delivery_quotation', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.delivery_quotation`,
    );

  },
};
