const getCustomerModel = (sequelize, { DataTypes }) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    electricity_usage_kwh: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: true,
      defaultValue: 0,
    },
    old_roof: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: true,
      defaultValue: false,
    },

  });
  Customer.associate = (models) => {
    Customer.hasOne(models.PropertyAddress, {
      foreignKey: "customer_id",
      onDelete: "CASCADE",
    });
  };
  Customer.findByLogin = async (login) => {
    let customer = await Customer.findOne({
      where: { email: login },
    });
    return customer;
  };

  return Customer;
};

export default getCustomerModel;
