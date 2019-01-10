> ⚠️ Questo repository è **deprecato**. È ora disponibile il nuovo IdP di test: https://github.com/italia/spid-testenv2

# SPID TEST ENVIRONMENT BACKOFFICE

[![](https://img.shields.io/github/issues/italia/spid-testenv.svg)](https://github.com/italia/spid-testenv/issues "Issue tracker")

SPID Test Environment è rivolto ai Service Provider che vogliono testare la propria integrazione con SPID senza avere a disposizione identità SPID reali.
Consiste in un Identity Provider da far girare in locale o su un proprio server, in cui si possono liberamente configurare delle identità di test.

L'ambiente si compone di due elementi:
* l'Identity Server vero e proprio, basato su [WSO2-is](https://github.com/wso2/product-is), [(repository github)](https://github.com/italia/spid-testenv-identityserver);
* un backoffice web basato su Node.js che offre un'interfaccia semplificata per la configurazione del Service Provider sull'IS e la creazione delle identità [(repository github)](https://github.com/italia/spid-testenv-backoffice).

## Docker

Per l'installazione con Docker fare riferimento al repository [spid-testenvironment](https://github.com/italia/spid-testenv-docker)

## Installazione senza Docker

### Prerequisiti

* Node.js e npm js

### Configurazione

```
$ cd backoffice
$ npm install
$ cd server
$ npm install
$ cd ..
$ cd idp_metadata
$ curl -o xmlsectool-2.0.0-bin.zip https://shibboleth.net/downloads/tools/xmlsectool/2.0.0/xmlsectool-2.0.0-bin.zip
$ unzip xmlsectool-2.0.0-bin.zip
$ rm xmlsectool-2.0.0-bin.zip
$ cd ..
$ npm run build-metadata
$ npm run build
```

### Avvio

Per lanciare l'interfaccia di backoffice procedere come segue:

```
$ cd backoffice
$ npm run start-prod
```

## Disponibilità del servizio

Il backoffice funziona anche senza Identity Server attivo ma non sarà possibile caricare i dati.
Le attività di configurazione saranno disponibili su https://localhost:8080 (backoffice ad accesso libero)

## Backoffice

### Configurazione di un Service Provider

Il primo passo è quello di configurare il proprio Service Provider nell'ambiente di test in modo che sia riconosciuto dall'Identity Provider (WSO2-is), proprio come si farebbe con la procedura di accreditamento presso SPID.
Dopo aver aperto il backoffice e riempito il form in tutte le sue parti è possibile vedere sulla destra l'anteprima dei metadati XML/SAML che descrivono il Service Provider. Si consiglia di scaricare il file XML prima di inviare il form poiché servirà anche nella configurazione del proprio Service Provider. Premendo il tasto "Salva" il Service Provider viene creato in WSO2-is.
È possibile eseguire successive modifiche ad un Service Provider esistente inviando nuovamente il modulo con l'entity ID e il nome invariati.

### Creazione delle identità (utenti)

Per ciascun Service Provider configurato si può accedere alla lista degli utenti ed è possibile crearne di nuovi.
