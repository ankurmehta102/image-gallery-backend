

## Create a .env file in the root of the repository and add the following credentials
```bash
PORT=

# MsSql database credentials
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# jwt
JWT_ACCESS_EXP_TIME=
JWT_SECRET=

# cloudinary
CLOUD_NAME=
API_KEY=
API_SECRET=
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
