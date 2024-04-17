import { expect, it, describe, ArgumentsType } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLayerConfig } from "../lib/hooks/useLayerConfig";

function useLayer(
  layers: ArgumentsType<typeof useLayerConfig>[0],
  config: ArgumentsType<typeof useLayerConfig>[1],
  tests: {
    key: string;
    slot?: number;
    style?: { zIndex: number } | { [key: string]: { zIndex: number } };
    zIndex: number | { [key: string]: number };
  }[]
) {
  tests.forEach((test) => {
    const { result } = renderHook(() =>
      useLayerConfig(layers, config)(test.key, test.slot)
    );

    expect(
      result.current.zIndex,
      `${test.key} with slot ${test.slot}`
    ).toStrictEqual(test.zIndex);

    if (test.style) expect(result.current.style).toStrictEqual(test.style);
  });
}

describe("useLayerConfig", () => {
  it("should work with string configuration", () => {
    useLayer(["modal", "alert", "toast", "tooltip"], {}, [
      { key: "modal", zIndex: 1, style: { zIndex: 1 } },
      { key: "alert", zIndex: 2, style: { zIndex: 2 } },
      { key: "toast", zIndex: 3, style: { zIndex: 3 } },
      { key: "tooltip", zIndex: 4, style: { zIndex: 4 } },
    ]);
  });

  it("should work with object configuration", () => {
    useLayer([{ key: "modal" }, { key: "alert" }], {}, [
      { key: "modal", zIndex: 1 },
      { key: "alert", zIndex: 2 },
    ]);
  });

  it("should work with slots", () => {
    useLayer(["modal", { key: "alert", slots: 3 }, "toast"], {}, [
      { key: "modal", zIndex: 1 },
      { key: "alert", slot: 0, zIndex: 2 },
      { key: "alert", slot: 1, zIndex: 3 },
      { key: "alert", slot: 2, zIndex: 4 },
      { key: "toast", zIndex: 5 },
    ]);
  });

  it("should work with parts", () => {
    useLayer(
      ["modal", { key: "alert", parts: ["background", "content"] }, "toast"],
      {},
      [
        { key: "modal", zIndex: 1 },
        { key: "alert.background", zIndex: 2 },
        { key: "alert.content", zIndex: 3 },
        {
          key: "alert",
          zIndex: { background: 2, content: 3 },
          style: { background: { zIndex: 2 }, content: { zIndex: 3 } },
        },
        { key: "toast", zIndex: 4 },
      ]
    );
  });

  it("should work with parts and slots", () => {
    useLayer(
      [
        "modal",
        { key: "alert", parts: ["background", "content"], slots: 3 },
        "toast",
      ],
      {},
      [
        { key: "modal", zIndex: 1 },
        { key: "alert.background", slot: 0, zIndex: 2 },
        { key: "alert.content", slot: 0, zIndex: 3 },
        { key: "alert", slot: 0, zIndex: { background: 2, content: 3 } },
        { key: "alert.background", slot: 1, zIndex: 4 },
        { key: "alert.content", slot: 1, zIndex: 5 },
        { key: "alert", slot: 1, zIndex: { background: 4, content: 5 } },
        { key: "alert.background", slot: 2, zIndex: 6 },
        { key: "alert.content", slot: 2, zIndex: 7 },
        { key: "alert", slot: 2, zIndex: { background: 6, content: 7 } },
        { key: "toast", zIndex: 8 },
      ]
    );
  });

  it("should work with custom start", () => {
    useLayer(["modal", "alert"], { start: 100 }, [
      { key: "modal", zIndex: 100 },
      { key: "alert", zIndex: 101 },
    ]);
  });

  it("should work with reverse configuration", () => {
    useLayer(["modal", "alert", "toast", "tooltip"], { reverse: true }, [
      { key: "modal", zIndex: 4 },
      { key: "alert", zIndex: 3 },
      { key: "toast", zIndex: 2 },
      { key: "tooltip", zIndex: 1 },
    ]);
  });

  it("should work with reverse and parts", () => {
    useLayer(
      ["toast", { key: "alert", parts: ["content", "background"] }, "modal"],
      { reverse: true },
      [
        { key: "modal", zIndex: 1 },
        { key: "alert.background", zIndex: 2 },
        { key: "alert.content", zIndex: 3 },
        { key: "toast", zIndex: 4 },
      ]
    );
  });

  it("should work with reverse and slots", () => {
    useLayer(
      ["toast", { key: "alert", slots: 3 }, "modal"],
      { reverse: true },
      [
        { key: "modal", zIndex: 1 },
        { key: "alert", slot: 0, zIndex: 2 },
        { key: "alert", slot: 1, zIndex: 3 },
        { key: "alert", slot: 2, zIndex: 4 },
        { key: "toast", zIndex: 5 },
      ]
    );
  });

  it("should work with reverse, parts and slots", () => {
    useLayer(
      [
        "toast",
        { key: "alert", parts: ["content", "background"], slots: 3 },
        "modal",
      ],
      { reverse: true },
      [
        { key: "modal", zIndex: 1 },
        { key: "alert.background", slot: 0, zIndex: 2 },
        { key: "alert.content", slot: 0, zIndex: 3 },
        { key: "alert.background", slot: 1, zIndex: 4 },
        { key: "alert.content", slot: 1, zIndex: 5 },
        { key: "alert.background", slot: 2, zIndex: 6 },
        { key: "alert.content", slot: 2, zIndex: 7 },
        { key: "toast", zIndex: 8 },
      ]
    );
  });

  it("should work with dots in keys", () => {
    useLayer(
      [
        "modal.test",
        { key: "alert.test", parts: ["background", "content"], slots: 3 },
        "toast.test",
      ],
      {},
      [
        { key: "modal.test", zIndex: 1 },
        { key: "alert.test.background", slot: 0, zIndex: 2 },
        { key: "alert.test.content", slot: 0, zIndex: 3 },
        { key: "alert.test.background", slot: 1, zIndex: 4 },
        { key: "alert.test.content", slot: 1, zIndex: 5 },
        { key: "alert.test.background", slot: 2, zIndex: 6 },
        { key: "alert.test.content", slot: 2, zIndex: 7 },
        { key: "toast.test", zIndex: 8 },
      ]
    );
  });

  it("should throw on invalid key", () => {
    expect(() =>
      renderHook(() =>
        useLayerConfig(["foo", "bar"])(
          // @ts-expect-error
          "invalid"
        )
      )
    ).toThrowError(/Invalid layer key/);
  });

  it("should throw on invalid part key", () => {
    expect(() =>
      renderHook(() =>
        // @ts-expect-error
        useLayerConfig([{ key: "foo", parts: ["bar"] }])("foo.invalid")
      )
    ).toThrowError(/Invalid part key/);
  });

  it("should throw on slot without slots", () => {
    expect(() =>
      renderHook(() => useLayerConfig(["foo", "bar"])("foo", 2))
    ).toThrowError(/Cannot use 'slot'/);
  });
});
