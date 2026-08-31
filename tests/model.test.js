const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const source = readFileSync(join(__dirname, "..", "WorkspacePromptModel.js"), "utf8")
    .replace(/^\.pragma library\s*/, "");
const moduleShim = { exports: {} };
new Function("module", "exports", source)(moduleShim, moduleShim.exports);
const Model = moduleShim.exports;

test("accepts a single zero", () => {
  assert.equal(Model.validWorkspace("0"), "0");
});

test("accepts workspaces beyond 10 verbatim", () => {
  assert.equal(Model.validWorkspace("10"), "10");
  assert.equal(Model.validWorkspace("15"), "15");
  assert.equal(Model.validWorkspace("123"), "123");
});

test("trims surrounding whitespace", () => {
  assert.equal(Model.validWorkspace("  7  "), "7");
  assert.equal(Model.validWorkspace("\t12\n"), "12");
});

test("rejects empty and blank input", () => {
  assert.equal(Model.validWorkspace(""), "");
  assert.equal(Model.validWorkspace("   "), "");
  assert.equal(Model.validWorkspace(undefined), "");
  assert.equal(Model.validWorkspace(null), "");
});

test("rejects non-numeric input", () => {
  assert.equal(Model.validWorkspace("abc"), "");
  assert.equal(Model.validWorkspace("10a"), "");
  assert.equal(Model.validWorkspace("a10"), "");
});

test("rejects negative numbers", () => {
  assert.equal(Model.validWorkspace("-1"), "");
});

test("rejects decimals and signs", () => {
  assert.equal(Model.validWorkspace("1.5"), "");
  assert.equal(Model.validWorkspace("+10"), "");
});
