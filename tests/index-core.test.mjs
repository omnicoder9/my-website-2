import assert from "node:assert/strict";
import test from "node:test";

import {
  extractAcademicItems,
  extractIndustryItems,
  extractOccupationItems,
  formatMissionClockValue,
  formatMissionDateLine,
  getItemsForType,
  mergeEntriesKeepOrder,
  uniqueKeepOrder
} from "../dist/js/test-core/index-core.js";

test("formatMissionClockValue produces a stable UTC clock string", () => {
  const formatted = formatMissionClockValue(new Date("2026-01-02T03:04:05Z"), "UTC");
  assert.match(formatted, /03:04:05/);
  assert.match(formatted, /(UTC|GMT)/);
});

test("formatMissionDateLine renders the mission date label format", () => {
  assert.equal(formatMissionDateLine(new Date("2026-01-02T12:00:00Z")), "January 2, 2026");
});

test("uniqueKeepOrder removes blanks and preserves first-seen order", () => {
  assert.deepEqual(uniqueKeepOrder(["ops", "", "ops", "lab", "ops", "field"]), ["ops", "lab", "field"]);
});

test("mergeEntriesKeepOrder deduplicates labels and keeps the shallowest level", () => {
  assert.deepEqual(
    mergeEntriesKeepOrder([
      { label: "Systems", level: 2 },
      { label: "Networks", level: 3 },
      { label: "Systems", level: 1 },
      null
    ]),
    [
      { label: "Systems", level: 1 },
      { label: "Networks", level: 3 }
    ]
  );
});

test("extractIndustryItems flattens the industry taxonomy in display order", () => {
  const items = extractIndustryItems({
    taxonomy: {
      sectors: [
        {
          sector: "Technology",
          industry_groups: [
            {
              industry_group: "Software",
              industries: [
                {
                  industry: "Developer Tools",
                  subindustries: ["Static Site Tooling"]
                }
              ]
            }
          ]
        }
      ]
    }
  });

  assert.deepEqual(items, [
    { label: "Technology", level: 0 },
    { label: "Software", level: 1 },
    { label: "Developer Tools", level: 2 },
    { label: "Static Site Tooling", level: 3 }
  ]);
});

test("extractOccupationItems flattens the occupation taxonomy", () => {
  const items = extractOccupationItems({
    occupation_taxonomy: [
      {
        major_group: "Engineering",
        minor_groups: [
          {
            minor_group: "Software",
            broad_occupations: [
              {
                broad_occupation: "Web Development",
                occupations: [{ title: "Frontend Developer" }]
              }
            ]
          }
        ]
      }
    ]
  });

  assert.deepEqual(items, [
    { label: "Engineering", level: 0 },
    { label: "Software", level: 1 },
    { label: "Web Development", level: 2 },
    { label: "Frontend Developer", level: 3 }
  ]);
});

test("extractAcademicItems computes nested depths and falls back to node ids", () => {
  const items = extractAcademicItems({
    nodes: [
      { id: "root", name: "Root" },
      { id: "child", name: "Child", parents: ["root"] },
      { id: "grandchild", parents: ["child"] }
    ]
  });

  assert.deepEqual(items, [
    { label: "Root", level: 0 },
    { label: "Child", level: 1 },
    { label: "grandchild", level: 2 }
  ]);
});

test("getItemsForType dispatches to the matching taxonomy extractor", () => {
  const items = getItemsForType("industry", {
    taxonomy: {
      sectors: [{ sector: "Technology" }]
    }
  });

  assert.deepEqual(items, [{ label: "Technology", level: 0 }]);
});
