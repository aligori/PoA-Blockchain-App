# 1. Starting from an image of geth v1.10.1, which supports PoA.
FROM ethereum/client-go:v1.10.1

# 2. Adding curl because it is needed in the docker-compose
RUN apk update && apk add curl

# 3. Cipying genesis.json from host machine to the root dir of the container.
COPY genesis.json .

# 4. Initializing geth node.
RUN geth init ./genesis.json && rm -f ~/.ethereum/geth/nodekey

# 5. Default command when container starts
ENTRYPOINT ["geth"]