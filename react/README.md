# NotarizETH React DApp

<p align="center">
<img src="https://github.com/samuelexferri/masterthesis/blob/master/images/notarizeth.png" width="200">
</p>

**NotarizETH** - A [React](https://reactjs.org/) Distributed App connected with the Ethereum Ropsten Network through Web3 Providers ([Infura](https://infura.io/), [MetaMask](https://metamask.io/))

Built using [useDApp Framework](https://github.com/EthWorks/useDApp) (ethers.js, web3-react...) and custom GUI modeled with [Dracula UI](https://draculatheme.com/ui).\
Application deployed to [AWS S3](https://aws.amazon.com/s3/) thanks to [GitHub Actions Workflow (CI/CD)](https://github.com/features/actions).\
Backend Smart Contract written in [Solidity](https://soliditylang.org/) and deployed on the Ethereum Ropsten Network at [this address](https://ropsten.etherscan.io/address/0x39B1704688cBBE66A9bdd88A06eaf3A496d132F6).

**Certify your files on the Ethereum Blockchain!**

_Tamper-Proof, Decentralization, Transparency_

Notarize your document by writing its Keccak256 hash in the smart contract mapping hosted on the Ethereum blockchain to later prove its existence and its integrity over time.\
Privacy! Your files are not uploaded, the Keccak256 hash is calculated locally, the entire document is not stored on the blockchain but only its Keccak256 hash.

[NotarizETH](https://notarizeth.xyz/)

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsamuelexferri%2Fmasterthesis%2Fbadge%3Fref%3Dmaster&style=for-the-badge)](https://actions-badge.atrox.dev/samuelexferri/masterthesis/goto?ref=master)
![alt text](https://img.shields.io/badge/Dracula%20UI-Made%20for%20Vampires%20%F0%9F%A7%9B%E2%80%8D%E2%99%82%EF%B8%8F-6272a4?style=for-the-badge)
![alt text](https://img.shields.io/badge/Language-Italian-infomrmational?style=for-the-badge)
![alt text](https://img.shields.io/badge/Language-English-infomrmational?style=for-the-badge)

## Commands

### yarn

Install the packages (or upgrade them):

    yarn
    yarn upgrade --latest

Start the app in the development mode on <http://127.0.0.1:8080/>:

    yarn start

Build the project to the `dist/` folder:

    yarn build

Run the tests:

    yarn test

Run the linter:

    yarn lint
    yarn lint:fix

### prettier

Run prettier:

    npx prettier --write "**/*.tsx"
    npx prettier --write "**/*.ts"

### eslint

Run eslint:

    yarn run eslint 'src/**/*.{js,ts,tsx}'
    yarn run eslint 'src/**/*.{js,ts,tsx}' --fix

## Authors

### Team

- **Samuele Ferri**: [Site](https://samuelexferri.com), [GitHub](https://github.com/samuelexferri)

### Credits

- [UNIBG Seclab](https://seclab.unibg.it/)

## Version

![alt text](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge)

## License

[![License](https://img.shields.io/badge/License-MIT_License-blue.svg?style=for-the-badge)](https://badges.mit-license.org)
