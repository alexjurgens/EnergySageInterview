# REST API by Alex Jurgens
This is the basic rest API built using Node, Express, and sequelize/postgres.  This shows a general file structure for the project as well as basic functionality with some comments of what might be done in the future.

## Notes
You will need to have postgress and sequelize installed to make this work.

There are config files not included in the repo on purpose.  For example, you may need to include a .env file that looks like 
```
REST_PORT=3000
DATABASE=EnergySageInterview
DATABASE_USER=<the username you created the DB with>
DATABASE_PASSWORD=<password>
ERASE_DB_ON_RESTART=true
```

# Building a REST API

For this technical interview, you will build a server application that has a data model and a REST API. You can use (and are encouraged to use) a common backend framework or frameworks to make this easier. You are not necessarily expected to finish this in the time given.

Some possibilities for backend frameworks include:

- Python: Django, Flask, FastAPI
- Node: Express
- Ruby on Rails
- Java: Spring

If your preferred tech stack isn’t one of these, please just ask us about it.

## API Specification

The API specification is being shared using the [Open API Specification](https://github.com/OAI/OpenAPI-Specification). There are a couple of ways to view this through the browsable [Swagger UI](https://swagger.io/tools/swagger-ui/) that will allow you to see samples and make actual requests.

## Viewing the API spec

Included are instructions on how to serve the `index.html` file using node or python, but any webserver could be used to serve the `index.html` file an access the browsable API documentation. Run one of the following commands in the same directory as `index.html` and `customers.yaml`.

### Node

To view the spec in a node environment, run:

```bash
npx browser-sync -w --port 8100
```

### Python

To view the spec using python, run:
```bash
python3 -m http.server 8100
```
