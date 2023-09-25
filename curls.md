# Curls to test API

1. API to create a task.

```bash
curl --location 'localhost:8080/api/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Second task",
    "description": "This is a test description for the second task",
    "due_date": "August 2020"
}'
```

2. API to update a task

```bash
curl --location --request PUT 'localhost:8080/api/tasks/4' \
--header 'Content-Type: application/json' \
--data '{
    "status": "ongoing"
}'
```

3. API to get all tasks, make API paginated.

```bash
curl --location 'localhost:8080/api/tasks'
```

paginated request for page number 2

```bash
curl --location 'localhost:8080/api/tasks?pageNumber=2'
```

4. API to get task metrics like counts tasks on basis of status

```bash
curl --location 'localhost:8080/api/tasks/metrics/status'
```

5. API to get task metrics like counts tasks on basis of timeline

```bash
curl --location 'localhost:8080/api/tasks/metrics/timeline'
```