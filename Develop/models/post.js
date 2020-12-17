
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
      date: DataTypes.DATE,
    });
    return posts;
  };