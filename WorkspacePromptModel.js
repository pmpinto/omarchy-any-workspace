.pragma library

// Validates the workspace number typed into the prompt. Returns the trimmed
// numeric string (literal, so 0 stays 0 and 10 stays 10) when it is a
// non-negative integer, otherwise an empty string. Empty means "not a valid
// workspace" and the prompt ignores the input, matching the reminder flow.
function validWorkspace(value) {
  var ws = String(value || "").trim();
  return /^[0-9]+$/.test(ws) ? ws : "";
}

if (typeof module !== "undefined") {
  module.exports = {
    validWorkspace: validWorkspace,
  };
}
