# Nodejs Pro Sante Connect

## VAR ENV :

* DEV_PRO_SANTE_CONNECT_CLIENT_ID
* DEV_PRO_SANTE_CONNECT_CLIENT_SECRET
* DEV_PRO_SANTE_CONNECT_CALLBACK_URI
* PROD_PRO_SANTE_CONNECT_CLIENT_ID
* PROD_PRO_SANTE_CONNECT_CLIENT_SECRET
* PROD_PRO_SANTE_CONNECT_CALLBACK_URI

## Begin for dev environment class :

```bash
import { ProdProSanteConnect } from 'nodejs-pro-sante-connect';
```

## Begin for prod environment class :

```bash
import { DevProSanteConnect } from 'nodejs-pro-sante-connect';
```

## Class functions :

* `async` getApiTest
* getAuthenticationUrl
* setAuthenticationCode
* `async` getUserInfo
