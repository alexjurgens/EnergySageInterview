const getPropertyAddressModel = (sequelize, { DataTypes }) => {
  const PropertyAddress = sequelize.define("PropertyAddress", {
    street: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state_code: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    postal_code: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[0-9]+"],
        len: 5,
      },
    },
  });
  PropertyAddress.associate = (models) => {
    PropertyAddress.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      onDelete: "CASCADE",
    });
  };
  return PropertyAddress;
};
export default getPropertyAddressModel;