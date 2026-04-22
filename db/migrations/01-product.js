'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
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

      uom_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'uom',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      product_type: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      product_type: {
        type: Sequelize.ENUM,
        values: ["GOODS","SERVICE"],
        allowNull: true,
        defaultValue : "GOODS"
      },
      
      cost: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      sale_price: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      sale_price: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      tax_sales: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      tax_purchase: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      barcode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },

      product_sales: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      
      product_purchase: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },

      product_purchase: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },

      product_expenses: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },

      product_pos: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },

      limit_onhand: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue:0.0
      },

      is_production: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      
      is_amdk_production: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },

      is_blow_production: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
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

      product_category_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'product_category',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    await queryInterface.addIndex('master.product', ['label','barcode','code']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('master.product', 'label');
    await queryInterface.removeIndex('master.product', 'barcode');
    await queryInterface.removeIndex('master.product', 'code');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS master.product`,
    );

  },
};
