# Problem Statement

You are tasked with building a system to keep track of your tasks. You will need to write CRUD APIs for managing tasks and API to get the metrics for your tasks. You should use Node.js for the backend, any SQL database for managing database interactions.
- API to create a task.
- API to update a task
- API to get all tasks, make API paginated.
- API to get task metrics like counts tasks on basis of status and timeline.

Example:
```
{
    "open_tasks": 10,
    "inprogress_tasks": 30,
    "completed_tasks": 50
}
```

```
[
    {
        "date": "July 2023",
        "metrics": {
            "open_tasks": 0,
            "inprogress_tasks": 0,
            "completed_tasks": 30
        }
    },
    {
        "date": "August 2023",
        "metrics": {
            "open_tasks": 10,
            "inprogress_tasks": 30,
            "completed_tasks": 50
        }
    }
]
```

## Install Instructions

1. Clone the repo with 

```bash
git clone https://github.com/WickedBrat/nodejs-rest-api infeedo
```

2. This project uses `Postgres` as database. To setup Postgresql on your local, follow this guide [here](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/)

3. Create a `.env` at the root of your project and update the creds for your local. Use `.env.sample` for your reference.

4. Now, install the dependencies for the project using `npm install` or `yarn install`

5. To run the project using `npm start` or `yarn start`

6. Use the curl statements to test the APIs
