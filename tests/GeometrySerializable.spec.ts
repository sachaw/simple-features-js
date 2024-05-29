import type { Assert } from "@japa/assert";
import type { Expect } from "@japa/expect/types";
import { test } from "@japa/runner";
import type { Geometry } from "../lib/mod.ts";
import { GeometrySerializer } from "../lib/mod.ts";
import {
  compareGeometries,
  createCompoundCurve,
  createCurvePolygon,
  createGeometryCollection,
  createLineString,
  createMultiLineString,
  createMultiPoint,
  createMultiPolygon,
  createPoint,
  createPolygon,
} from "./SFTestUtils.ts";

function testSerializable(geometry: Geometry, expect: Expect, assert: Assert) {
  const json = GeometrySerializer.serialize(geometry);
  const deserializedGeometry = GeometrySerializer.deserialize(json);
  compareGeometries(geometry, deserializedGeometry, expect, assert);
}

test.group("GeometrySerializableTest", () => {
  test("test polygon", ({ expect, assert }) => {
    testSerializable(
      createPolygon(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test line string", ({ expect, assert }) => {
    testSerializable(
      createLineString(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test point", ({ expect, assert }) => {
    testSerializable(
      createPoint(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test geometry collection", ({ expect, assert }) => {
    testSerializable(
      createGeometryCollection(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test multi polygon", ({ expect, assert }) => {
    testSerializable(
      createMultiPolygon(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test multi line string", ({ expect, assert }) => {
    testSerializable(
      createMultiLineString(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test multi point", ({ expect, assert }) => {
    testSerializable(
      createMultiPoint(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test curve polygon", ({ expect, assert }) => {
    testSerializable(
      createCurvePolygon(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });

  test("test compound curve", ({ expect, assert }) => {
    testSerializable(
      createCompoundCurve(Math.random() < 0.5, Math.random() < 0.5),
      expect,
      assert,
    );
  });
});
