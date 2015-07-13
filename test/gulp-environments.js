var environments = require("../");
var expect = require("chai").expect;

describe("gulp-environments", function() {
  var development = environments.make("development");
  var production = environments.make("production");

  it("gives the environment a name", function() {
    var staging = environments.make("staging");

    expect(staging.$name).to.equal("staging");
  });

  it("takes the default environment from the process environment", function() {
    process.env.NODE_ENV = "development";

    environments.reset();

    expect(development()).to.be.true;
    expect(production()).to.be.false;
  });

  it("distinguishes between environments", function() {
    environments.current(development);

    expect(development()).to.be.true;
    expect(production()).to.be.false;
  });

  it("allows switching environments", function() {
    environments.current(development);
    environments.current(production);

    expect(development()).to.be.false;
    expect(production()).to.be.true;
  });
});
