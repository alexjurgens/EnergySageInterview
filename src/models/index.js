import Sequelize from 'sequelize';

import getCustomerModel from './customer.js';
import getPropertyAddressModel from './propertyAddress.js';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Customer: getCustomerModel(sequelize, Sequelize),
  PropertyAddress: getPropertyAddressModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;