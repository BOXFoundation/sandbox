var command = {
  command: "init",
  description: "Initialize new and empty Ethereum project",
  builder: {},
  help: {
    usage: "sandbox init [--force]",
    options: [
      {
        option: "--force",
        description:
          "Initialize project in the current directory regardless of its " +
          "state. Be careful, this\n                    will potentially overwrite files " +
          "that exist in the directory."
      }
    ]
  },
  run: function(options, done) {
    var Config = require("truffle-config");
    var OS = require("os");
    var UnboxCommand = require("./unbox");

    var config = Config.default().with({
      logger: console
    });

    if (options._ && options._.length > 0) {
      config.logger.log(
        "Error: `sandbox init` no longer accepts a project template name as an argument."
      );
      config.logger.log();
      config.logger.log(
        " - For an empty project, use `sandbox init` with no arguments" + OS.EOL
      );
      process.exit(1);
    }

    // defer to `sandbox unbox` command with "bare" box as arg
    var url = "https://github.com/BOXFoundation/sandbox-framework";
    options._ = [url];

    UnboxCommand.run(options, done);
  }
};

module.exports = command;
