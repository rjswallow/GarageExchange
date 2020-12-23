const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    var posts = sequelize.define("Posts", {
      item: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false
      },
      picture: {
          type: Sequelize.BLOB("long"),
          allowNull: true
      }
    });
    return posts;
  };

