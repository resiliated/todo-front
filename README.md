# Todo app front end with React and Antd

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/cescoffier/quarkus-todo-app/Build)

## Development

Install:

```bash
yarn install
```

Run:

```bash
yarn start
```

Open: http://localhost:3000/

## Production

Build docker image:

```bash
docker build -t todo-front:prod .
```

Run docker image:
```bash
docker run -d -p 3000:80 todo-front:prod
```
