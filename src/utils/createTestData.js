import models, { sequelize } from "../models/index.js";

export default async () => {
  await models.Customer.create(
    {
      id: "088242aa-1805-450a-a4ea-f1f392b330f4",
      first_name: "Rebecca",
      last_name: "Baker",
      email: "rbaker@example.com",
      electricity_usage_kwh: 1000,
      property_address: {
        street: "123 Main St",
        city: "New York",
        state_code: "NY",
        postal_code: "10001",
      },
    },
    {
      include: [models.PropertyAddress],
    }
  );
  await models.Customer.create(
    {
      id: "088242aa-1805-450a-a4ea-f1f392b330f5",
      first_name: "David",
      last_name: "Smith",
      email: "dsmith@example.com",
      electricity_usage_kwh: 0,
      property_address: {
        street: "456 Main St",
        city: "New York",
        state_code: "NY",
        postal_code: "10001",
      },
    },
    {
      include: [models.PropertyAddress],
    }
  );
};
