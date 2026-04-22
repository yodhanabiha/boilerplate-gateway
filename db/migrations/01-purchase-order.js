'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_order', {
      
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

      po_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      pr_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'purchase_request',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      buyer_id: {
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
        allowNull: true,
      },
      
    
      estimate_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      actual_amount: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
      },

      total_amount: {
        type: Sequelize.DECIMAL(32,16),
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
        allowNull: true,
      },

      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue : "IDR"
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
        allowNull: true,
      },

      vendor_npwp: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      mpa_reference: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
      },

      top_date: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },

      estimate_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },

      notes: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('transaction.purchase_order', ['code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.purchase_order', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.purchase_order`,
    );

  },
};
