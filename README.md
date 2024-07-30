# Widya Analytic Store Frontend

## Project Setup
Create <em>.env.local</em>, then add following key-values*
```
# Only for development purpose
VUE_APP_RESTAPI_URL=

VUE_APP_MIDTRANS_CLIENT_KEY=
```
<small>Note: to find out the values, you can rename <em>.env.local.example</em> file and lookup related config at <a href="https://github.com/Widya-Analytic/widya_credentials#widya-analytic-store">widya_credentials</a></small>
### Install dependencies
```shell
npm install
```

### Compiles and hot-reloads for development
For deployment, Mock library can't be used, you can find in [main.js](./src/main.js) file
```js
// mock
// import './fake-db/index.js'
```
then compile using 'npm'
```shell
npm run serve
```

## Tracking

Platform sentry is used for performance monitoring which can help developers diagnose, improve and optimize the performance of the code that has been created.

Initial configuration can be seen at:

```shell
https://sentry.widyaanalytic.com/widyaanalytic/se/getting-started/javascript-vue/
```
<small>Note: access <a href='https://dev.sentry.widyaanalytic.com'>dev.sentry.widyaanalytic.com</a> for development projects</small>

The `dsn` value will be like http://<project_key>@localhost:9000/<project_index>, you should change `http://localhost:9000` with origin domain

Then put the value for `VUE_APP_SENTRY_DSN` variable in the `.env.local` file, and put origin domain of project for `VUE_APP_SENTRY_DSN` value.
