var gif = require("gulp-if");
var argv = require("yargs").argv;

var currentEnv;
function current(env) {
  if(arguments.length > 0) {
    currentEnv = env;
  } else {
    return currentEnv;
  }
}

function reset() {
  current(make(process.env.NODE_ENV || argv.env || "development"));
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
