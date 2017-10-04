FROM ubuntu:latest
MAINTAINER Umberto Rosini, rosini@agid.gov.it

# Create user to run is and the backoffice (not root for security reason!)
RUN useradd --user-group --create-home --shell /bin/false yoda

# Update and install utilities
RUN apt-get update && \
    apt-get install curl && \
    apt-get install vi && \
    apt-get install netstat

# Node 6
RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential

# Untar last SPID Test Environment Backoffice release
RUN apt-get install curl && \
    mkdir /spid-test-environment && \
    curl -o /spid-test-environment/spid-testenv-backoffice.tar.gz https://codeload.github.com/umbros/spid-test-environment/tar.gz/v0.9-beta.1 && \
    mkdir /spid-test-environment/backoffice && \
    tar -zxvf /spid-test-environment/spid-testenv-backoffice.tar.gz -C /spid-test-environment/backoffice --strip-components=1 && \
    rm -f spid-test-environment/spid-testenv-backoffice.tar.gz

# Build SPID Test Environment Backoffice
RUN cd /spid-test-environment/backoffice && \
    npm install --suppress-warnings && \
    cd server && \
    npm install --suppress-warnings && \
    cd .. && \
    npm run build

# Ports exposed
EXPOSE 8080

RUN chown -R yoda:yoda /spid-testenv/*

USER yoda

WORKDIR /spid-testenv/bo/backoffice

ENTRYPOINT ["npm", "run", "start-prod"]
