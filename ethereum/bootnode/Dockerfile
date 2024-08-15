# 1. Starting from an image of geth v1.10.1, which supports PoA. => Since geth v1.14 clique has been deprecated: https://geth.ethereum.org/docs/fundamentals/private-network
FROM ethereum/client-go:v1.10.1

# 2. Copying genesis.json from host machine to the root dir of the container.
COPY genesis.json .

# 3. Initializing geth node.
RUN geth init ./genesis.json && rm -f ~/.ethereum/geth/nodekey

# 4. Default command when container starts
ENTRYPOINT ["geth"]