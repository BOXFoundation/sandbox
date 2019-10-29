
-----------------------


Sandbox is a development environment, testing framework and asset pipeline for ContentBox, aiming to make life as an ContentBox developer easier. With Sandbox, you get:

* Built-in smart contract compilation, linking, deployment and binary management.
* Automated contract testing with Mocha and Chai.
* Configurable build pipeline with support for custom build processes.
* Scriptable deployment & migrations framework.
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication.
* Instant rebuilding of assets during development.
* External script runner that executes scripts within a Sandbox environment.


## Install

```
$ npm install -g contentbox
```

## Quick Usage

To create a sample sandbox project, run the following within an empty project directory:

```
$ sandbox init
```
This creates a project with the following structure.
```
├── README
├── contracts
│   ├── Migrations.sol
│   └── SimpleStorage.sol
├── migrations
│   └── 1_deploy_contracts.js
├── package.json
└── truffle-config.js
```
From there, you can run `sandbox compile`, `sandbox migrate` and `sandbox console` to compile your contracts, deploy those contracts to the network, and interact with them.

### Deploy
Place your contract under `contracts/` and update `migrations/1_deploy_contracts.js` accordingly. Also configure `truffle-config.js` properly. For example,
```
-      endpoint: "127.0.0.1:19110",
-      from: "b1iH6rDq4N5KYGyGzkqzA45UXAjfxQux7xE",
-      privateKey: "0fb5104cbf4814dbd5ae3855d6168ceb255f079b9a86bfcd56b965d9d478441b",
+      endpoint: "127.0.0.1:3000",
+      from: "b1ZWSdrg48g145VdcmBwMPVuDFdaxDLoktk",
+      privateKey: "1b8e5830ae669496a11f00c90b12ecb8ccf1b6e2660a86ab1dbd24085b43247f",
```
Deploy your contract.
```
$ sandbox migrate
Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      3
> Block gas limit: 0x7a121d


1_deploy_contracts.js
=====================

   Deploying 'SimpleStorage'
   -------------------------
contract deployed at b5YEZsnSoBwENVMUSviujqBd6zi3HFJV64D
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   0
> Final cost:          0 ETH
```


### Console
You can interact with the deployed contract in console mode. Contract address can be found in migration step.
```
$ sandbox console
truffle(development)> var contract = new Contract(SimpleStorage.abi, 'b5YEZsnSoBwENVMUSviujqBd6zi3HFJV64D')
undefined
truffle(development)> await contract.methods.getBalance().call()
'103'
truffle(development)> await contract.methods.incrementBalance(3).send({privateKey: '0fb5104cbf4814dbd5ae3855d6168ceb255f079b9a86bfcd56b965d9d478441b'})
{ hash:
   '29deea37e2c4d55f23ce09012a03f842792eede87b0116c2f1429bf440a8bb90',
  contractAddr: '' }
truffle(development)> await contract.methods.incrementBalance(3).send({privateKey: '0fb5104cbf4814dbd5ae3855d6168ceb255f079b9a86bfcd56b965d9d478441b'})
{ hash:
   '3ecee43c54879ed24cc1ca28767d00cf15c4c93ffeb8c2ebecb77a6979e6d0d4',
  contractAddr: '' }
truffle(development)> await contract.methods.getBalance().call()
'109'
```

### 
*Notes on project branches:*
+    `master`: Stable, released version
+    `develop`: Work targeting stable release

### License

MIT
