'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jurnal_header', {
      
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

      invoice_quotation_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'invoice_quotation',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      sales_order_id: {
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

      goods_receipt_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'goods_receipt',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      invoice_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'invoice',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      payment_batch_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'payment_batch',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      payment_request_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'payment_request',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      purchase_order_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'purchase_order',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      purchase_request_id: {
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

      purchase_request_id: {
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
      
      jurnal_ref_type: {
        type: Sequelize.ENUM,
        values: [ "INVOICE QUOTATION", "SALES ORDER", "GOODS RECEIPT", "INVOICE", "PAYMENT BATCH", "PAYMENT REQUEST", "PURCHASE ORDER", "PURCHASE REQUEST",],
        allowNull: true,
      },
      
      accounting_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('now()'),
      },

      is_manual: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue : false
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
    await queryInterface.addIndex('transaction.jurnal_header', ['code','accounting_date']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.jurnal_header', 'code');
    await queryInterface.removeIndex('transaction.jurnal_header', 'accounting_date');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.jurnal_header`,
    );

  },
};
