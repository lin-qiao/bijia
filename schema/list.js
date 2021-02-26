const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    goods_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goods_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goods_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stock: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vip_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    deiwu_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deiwu_price: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deiwu_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deiwu_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deiwu_sales: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    difference_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vip_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deiwu_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
