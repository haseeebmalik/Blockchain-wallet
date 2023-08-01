export const goerli = {
    chainId: '5',
    name: 'Goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/hawWvHynYiYMyVLQkdkLVfAo8jC1Zsfx',
};

export const mainnet = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/bWG6OzmDKWC80zfceVZ3zCmWzlp_jQWY',
};
export const sepolia = {
    chainId: '11155111',
    name: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/_300O3gT8BsD5NEKX50GNAMYbiefUduh',
};

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet,
    [sepolia.chainId]: sepolia,
};