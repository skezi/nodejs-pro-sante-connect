# Nodejs Pro Sante Connect

## VAR ENV :

* DEV_PRO_SANTE_CONNECT_CLIENT_ID
* DEV_PRO_SANTE_CONNECT_CLIENT_SECRET
* DEV_PRO_SANTE_CONNECT_CALLBACK_URI
* PROD_PRO_SANTE_CONNECT_CLIENT_ID
* PROD_PRO_SANTE_CONNECT_CLIENT_SECRET
* PROD_PRO_SANTE_CONNECT_CALLBACK_URI

## Begin for dev environment class :

* `import { ProdProSanteConnectService } from './services/pro-sante-connect.service';`

## Begin for prod environment class :

* `import { DevProSanteConnectService } from './services/pro-sante-connect.service';`

## Class functions :

* `async` getApiTest
* getAuthenticationUrl
* setAuthenticationCode
* `async` getUserInfo
