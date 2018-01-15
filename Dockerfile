FROM ubuntu:latest
MAINTAINER Umberto Rosini, rosini@agid.gov.it

# Create user to run is and the backoffice (not root for security reason!)
RUN useradd --user-group --create-home --shell /bin/false yoda

# Update and install utilities
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y vim && \
    apt-get install -y net-tools && \
    apt-get install -y wget unzip libxml2-utils

# Node 6
RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential

# Backoffice
RUN mkdir /spid-testenvironment && \
    curl -o /spid-testenvironment/spid-testenv-backoffice.tar.gz https://codeload.github.com/italia/spid-testenv-backoffice/tar.gz/master && \
    mkdir /spid-testenvironment/bo && \
    tar -zxvf /spid-testenvironment/spid-testenv-backoffice.tar.gz -C /spid-testenvironment/bo --strip-components=1 && \
    rm -f /spid-testenvironment/spid-testenv-backoffice.tar.gz

# Build backoffice
RUN cd /spid-testenvironment/bo/backoffice && \
    npm install --suppress-warnings && \
    cd server && \
    npm install --suppress-warnings && \
    cd .. && \
    cd idp_metadata && \
    wget --no-verbose --output-document=xmlsectool-2.0.0-bin.zip https://shibboleth.net/downloads/tools/xmlsectool/2.0.0/xmlsectool-2.0.0-bin.zip && \
    unzip xmlsectool-2.0.0-bin.zip && \
    rm xmlsectool-2.0.0-bin.zip && \
    cd .. && \
    npm run build-metadata && \
    npm run build

# Ports exposed
EXPOSE 8080

RUN chown -R yoda:yoda /spid-testenvironment/*

USER yoda

WORKDIR /spid-testenvironment/bo/backoffice

ENTRYPOINT ["npm", "run", "start-prod"]
