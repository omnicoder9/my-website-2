import assert from "node:assert/strict";
import test from "node:test";

import {
  analyzePasswordStrength,
  buildUsernameHint,
  convertMassVolumeValue,
  createUsernameParts,
  findSequentialPasswordRun,
  formatPasswordSearchSpace,
  formatUsernameParts,
  getAvailableInitials,
  getCompatibleFormats,
  jsonToTable,
  normalizePasswordLeetspeak,
  parseDelimitedText,
  parseJsonContent,
  serializeDelimitedTable,
  tableToJsonRecords
} from "../dist/js/test-core/tools-core.js";

test("convertMassVolumeValue handles direct conversions and rejects missing density", () => {
  assert.equal(convertMassVolumeValue(240, "milliliters", "cups"), 1);
  assert.equal(convertMassVolumeValue(453.592, "grams", "pounds"), 1);
  assert.throws(
    () => convertMassVolumeValue(100, "grams", "cups"),
    /Please select a substance density/
  );
});

test("getCompatibleFormats normalizes source extensions and rejects unknown formats", () => {
  assert.deepEqual(getCompatibleFormats("jpeg"), ["png", "jpg", "webp"]);
  assert.deepEqual(getCompatibleFormats("svg"), ["svg", "png", "jpg", "webp"]);
  assert.deepEqual(getCompatibleFormats("exe"), []);
});

test("parseJsonContent reports invalid JSON cleanly", () => {
  assert.throws(() => parseJsonContent("{"), /not valid JSON/);
});

test("jsonToTable flattens object arrays while preserving key order", () => {
  assert.deepEqual(
    jsonToTable([
      { a: 1, b: 2 },
      { b: 3, c: 4 }
    ]),
    {
      headers: ["a", "b", "c"],
      rows: [
        ["1", "2", ""],
        ["", "3", "4"]
      ]
    }
  );
});

test("parseDelimitedText handles quoted cells and duplicate headers", () => {
  assert.deepEqual(
    parseDelimitedText('name,name\r\nAlice,"Bob, Jr."', ","),
    {
      headers: ["name", "name_2"],
      rows: [["Alice", "Bob, Jr."]]
    }
  );
});

test("serializeDelimitedTable quotes cells that need escaping", () => {
  const serialized = serializeDelimitedTable(
    {
      headers: ["name", "note"],
      rows: [["Alice", ' says "hi" ']]
    },
    ","
  );

  assert.equal(serialized, 'name,note\nAlice," says ""hi"" "');
});

test("tableToJsonRecords converts tabular data back into row records", () => {
  assert.deepEqual(
    tableToJsonRecords({
      headers: ["name", "role"],
      rows: [["Alice", "Engineer"], ["Bob", "Writer"]]
    }),
    [
      { name: "Alice", role: "Engineer" },
      { name: "Bob", role: "Writer" }
    ]
  );
});

test("formatUsernameParts supports compact, underscore, and dot styles", () => {
  assert.equal(formatUsernameParts(["Red", "Fox", "12"], "compact"), "redFox12");
  assert.equal(formatUsernameParts(["Red", "Fox", "12"], "underscore"), "red_fox_12");
  assert.equal(formatUsernameParts(["Red", "Fox", "12"], "dot"), "red.fox.12");
});

test("username helpers expose shared initials and numeric mixins", () => {
  assert.deepEqual(getAvailableInitials("animals", { includeAdjectives: true, includeColors: false }).sort(), [
    "b",
    "g",
    "h",
    "l"
  ]);

  const parts = createUsernameParts(
    "cyberpunk",
    {
      includeAdjectives: false,
      includeColors: false,
      includeNumbers: true
    },
    {
      alliteration: false,
      brandable: true,
      noRepeatedLetters: false,
      pronounceable: false,
      syllableBalance: false
    }
  );

  assert.equal(parts.length, 2);
  assert.match(parts[0], /^[a-z]+$/);
  assert.match(parts[1], /^\d+$/);
});

test("buildUsernameHint summarizes the selected generation rules", () => {
  const hint = buildUsernameHint(
    "cyberpunk",
    "underscore",
    {
      includeAdjectives: true,
      includeColors: false,
      includeNumbers: true
    },
    {
      alliteration: true,
      brandable: false,
      noRepeatedLetters: true,
      pronounceable: true,
      syllableBalance: false
    }
  );

  assert.match(hint, /Theme: cyberpunk/);
  assert.match(hint, /Format: underscore/);
  assert.match(hint, /Rules: alliteration, pronounceable, no repeated letters/);
});

test("analyzePasswordStrength handles empty, weak, and strong passwords", () => {
  assert.equal(analyzePasswordStrength("").score, "empty");

  const weak = analyzePasswordStrength("Password123!");
  assert.notEqual(weak.score, "strong");
  assert.equal(weak.findings.some((finding) => finding.includes("common password term")), true);

  const strong = analyzePasswordStrength("A9$zQ7!mLp2#Vr8@");
  assert.equal(strong.adjustedEntropyBits > 70, true);
  assert.equal(["strong", "excellent"].includes(strong.score), true);
});

test("password helpers detect common patterns and render search-space text", () => {
  assert.equal(normalizePasswordLeetspeak("P@55w0rd!"), "Passwordi");
  assert.equal(findSequentialPasswordRun("zz1234yy"), "1234");
  assert.match(formatPasswordSearchSpace(70), /^about 2\^70 guesses$/);
});
