'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_request', {
      
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
    
      estimate_amount: {
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

      pr_category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
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

      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue : "IDR"
      },
      
      // vendor_id: {
      //   type: Sequelize.BIGINT,
      //   references: {
      //     model: {
      //       tableName: 'vendor',
      //       schema: 'master'
      //     },
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   allowNull: false,
      // },

      // vendor_bank_id: {
      //   type: Sequelize.BIGINT,
      //   references: {
      //     model: {
      //       tableName: 'vendor_bank',
      //       schema: 'master'
      //     },
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   allowNull: false,
      // },

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
    await queryInterface.addIndex('transaction.purchase_request', ['code','title']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.purchase_request', 'code');
    await queryInterface.removeIndex('transaction.purchase_request', 'title');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.purchase_request`,
    );

  },
};
