# 1. Starting from an image of geth v1.10.1, which supports PoA.
FROM ethereum/client-go:v1.10.1

# 2. Defining an argument for the ACCOUNT_PASSWORD, and setting an environment variable with its value.
ARG ACCOUNT_PASSWORD
ENV ACCOUNT_PASSWORD_ENV=${ACCOUNT_PASSWORD}

# 3. Copying genesis.json from host into the container.
COPY genesis.json .

# 4. Copying keystore (with validator keys) into the container.
COPY validator/keystore /root/.ethereum/keystore

# COPY automine.js /root/scripts/automine.js

# 5. Initialize the geth node with the genesis file.
RUN geth init ./genesis.json \ 
        && rm -f ~/.ethereum/geth/nodekey \
        && echo ${ACCOUNT_PASSWORD_ENV} > password.txt

# 6. Default entrypoint command
ENTRYPOINT ["geth"]