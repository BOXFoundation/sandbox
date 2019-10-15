
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


### Install

```
$ npm install -g contentbox
```

### Quick Usage

For a sample set of contracts and tests, run the following within an empty project directory:

```
$ sandbox unbox metacoin
```

From there, you can run `sandbox compile`, `sandbox migrate` and `sandbox console` to compile your contracts, deploy those contracts to the network, and run their associated unit tests.

*Notes on project branches:*
+    `master`: Stable, released version
+    `develop`: Work targeting stable release

### License

MIT
