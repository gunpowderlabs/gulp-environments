var gif = require("gulp-if");
var argv = require("yargs").argv;

if (argv['gulp-environments-internal-test']) {
  // the tests require loading argv more explicitly
  argv = require("yargs").parse(process.argv);
}

var currentEnv;
function current(env) {
  if(arguments.length > 0) {
    currentEnv = env;
  } else {
    return currentEnv;
  }
}

function reset() {
  current(make(argv.env || process.env.NODE_ENV || "development"));
}

function make(name) {
  if(arguments.length < 1) {
    throw "You must provide an name to environments.make()";
  }

  function envFn(gulpStream) {
    var isCurrentEnv = current().$name === name;

    if(arguments.length === 0) { return isCurrentEnv; }

    return gif(isCurrentEnv, gulpStream);
  }

  envFn.$name = name;

  envFn.task = function() {
    current(envFn);
  };

  return envFn;
}

reset();

module.exports = {
  make: make,
  current: current,
  reset: reset,
  development: make("development"),
  production: make("production"),
};
