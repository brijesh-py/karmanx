module.exports = (sequelize, DataTypes) => {
  Image.init(
    {
      url: DataTypes.STRING,
      secure_url: DataTypes.STRING,
      tags: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
      uploadedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );

  return Image;
};
