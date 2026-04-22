'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_request', {
      
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

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      vendor_npwp: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      subtotal_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
      },

      tax_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
      },

      total_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: false,
      },

      request_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      requester_id: {
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
        allowNull: false,
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

      vendor_bank_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'vendor_bank',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    await queryInterface.addIndex('transaction.payment_request', ['code','title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.payment_request', 'code');
    await queryInterface.removeIndex('transaction.payment_request', 'title');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.payment_request`,
    );

  },
};
