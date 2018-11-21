import { assert } from "chai";

import Ganache from "ganache-cli";

import { prepareContracts } from "./helpers";
import Debugger from "lib/debugger";

const __SETSTHINGS = `
pragma solidity ~0.5;

contract SetsThings {
  int x;
  int y;
  int z;
  int w;
  function run() {
    x = 1;
    y = 2;
    z = 3;
    w = 4;
  }
}
`;

let sources = {
  "SetsThings.sol": __SETSTHINGS
};

describe("Reset Button", function() {
  var provider;

  var abstractions;
  var artifacts;

  before("Create Provider", async function() {
    provider = Ganache.provider({ seed: "debugger", gasLimit: 7000000 });
  });

  before("Prepare contracts and artifacts", async function() {
    this.timeout(30000);

    let prepared = await prepareContracts(provider, sources);
    abstractions = prepared.abstractions;
    artifacts = prepared.artifacts;
  });

  it("Correctly resets after finishing", async function() {
    let instance = await abstractions.SetsThings.deployed();
    let receipt = await instance.run();
    let txHash = receipt.tx;

    let bugger = await Debugger.forTx(txHash, {
      provider,
      contracts: artifacts
    });

    let session = bugger.connect();

    let variables = [];
    variables[0] = []; //collected during 1st run
    variables[1] = []; //collected during 2nd run

    variables[0].push(await session.variables());
    session.addBreakpoint({ sourceId: 0, line: 10 });
    session.continueUntilBreakpoint(); //advance to line 10
    variables[0].push(await session.variables());
    session.continueUntilBreakpoint(); //advance to the end
    variables[0].push(await session.variables());

    //now, reset and do it again
    session.reset();

    variables[1].push(await session.variables());
    session.addBreakpoint({ sourceId: 0, line: 10 });
    session.continueUntilBreakpoint(); //advance to line 10
    variables[1].push(await session.variables());
    session.continueUntilBreakpoint(); //advance to the end
    variables[1].push(await session.variables());

    assert.deepEqual(variables[1], variables[0]);
  });
});
