/**
 * The customer rest endpoint
 *
 * @author Alex Jurgens
 */
import { Router } from "express";

const router = Router();

/**
 * not part of spec
 * returns all customers, this would definitely be one to apply user control to
 */
router.get("/", async (req, res) => {
  const customers = await req.context.models.Customer.findAll();
  return res.send(customers);
});

/**
 * get a customer by id
 */
router.get("/:customerId", async (req, res) => {
  let customer = await req.context.models.Customer.findByPk(
    req.params.customerId
  );
  if (!customer) {
    return res.status(404).send("Customer Not Found");
  }
  return res.send(customer);
});

/**
 * update a customer by id
 */
router.patch("/:customerId", async (req, res) => {
  //special validation - trying to update email but it already exists for another customer
  if (req.body.email) {
    let anotherCustomer = await req.context.models.Customer.findOne({
      where: { email: req.body.email, id: { [Op.ne]: req.params.customerId } },
    });
    if (anotherCustomer) {
      return res.status(409).send("Email Already Taken");
    }
  }
  try {
    await req.context.models.Customer.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        electricity_usage_kwh: req.body.electricity_usage_kwh,
      },
      {where: { id: req.params.customerId } }
    ).then(function (rowsUpdated) {
      if (!rowsUpdated[0]) {
        return res.status(404).send("Customer Not Found");
      }
      return res.send("Customer Updated");
    });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).send("Missing Required Information");
    }
    // could throw the error here and let it be caught by error middleware
    return res.status(500).send("Error updating customer");
  }
});

/**
 * create a new customer
 */
router.post("/", async (req, res) => {
  try {
    await req.context.models.Customer.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        // id created by UUIDV4 default
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        electricity_usage_kwh: req.body.electricity_usage_kwh,
      },
    }).then(function ([customer, created] ) {
        if (!created) {
            /* This could be done by just using Create and catching a SequelizeUniqueConstraintError,
             * but this way gives us access to the model if we need it and makes sure the unique constraint
             * is on the email field specifically
             */
            return res.status(409).send("Email Already Taken");
        }
        return res.send("Customer Created");
    });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).send("Missing Required Information");
    }
    // could throw the error here and let it be caught by error middleware
    return res.status(500).send("Error creating customer");
  }
});

export default router;
