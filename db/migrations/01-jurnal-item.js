'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jurnal_items', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      jurnal_header_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'jurnal_header',
            schema: 'transaction'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      coa_id: {
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
        allowNull: true,
      },

      label: {
        allowNull: true,
        type: Sequelize.TEXT
      },  
       
      additionalInfo: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      debit: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue : 0
      },

      credit: {
        type: Sequelize.DECIMAL(32,16),
        allowNull: true,
        defaultValue : 0
      },

      ppn_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'ppn',
            schema: 'master'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
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
    await queryInterface.addIndex('transaction.jurnal_items', ['label']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('transaction.jurnal_items', 'label');
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS transaction.jurnal_items`,
    );

  },
};
