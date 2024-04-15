import { LayersConfig } from "../types/config";
import { LayersType, LayerObject } from "../types/layer";
import { useMemo } from "react";

type ExtractKeys<T> = T extends string
  ? T
  : T extends {
      key: infer K extends string;
      parts: infer C extends any[];
    }
  ? `${K}.${C[number]}`
  : T extends { key: infer K extends string }
  ? K
  : never;

/**
 * Create a hook to get the z-index of a layer key
 *
 * @param layers {(string | LayerObject)[]} The layers to configure.
 * @param config {LayersConfig} The configuration to use.
 **/
export function useLayerConfig<
  const Layers extends LayersType<string[]>,
  const Config extends LayersConfig
>(layers: Layers, config?: Config) {
  /**
   * Get the z-index of a layer key
   *
   * @param key {string} The key of the layer.
   * @param slot {number} The slot of the layer, starting at 0. Only works if the layer has the slots property set.
   **/
  return <Key extends ExtractKeys<Layers[number]>>(key: Key, slot?: number) => {
    const zIndex = useMemo(() => {
      const parent = key.includes(".")
        ? key.split(".").slice(0, -1).join(".")
        : key;
      const part = key.split(".").slice(-1)[0];

      let index = (config?.start || 1) - 1;

      let layerObjects: LayerObject<string>[] = layers.map((layer) => {
        if (typeof layer == "string") return { key: layer };
        if (layer.parts) {
        }
        if (layer.parts && config?.reverse)
          return { ...layer, parts: [...layer.parts].reverse() };
        return layer;
      });

      if (config?.reverse) layerObjects = layerObjects.reverse();

      for (const layer of layerObjects) {
        if (layer.key !== parent) {
          if (layer.slots || layer.parts)
            index += (layer.parts?.length || 1) * (layer.slots || 1);
          else index += 1;

          continue;
        }

        index += 1;

        if (part && layer.parts) {
          const partIndex = layer.parts.indexOf(part);
          if (partIndex < 0) throw new Error(`Invalid part key: ${part}`);
          index += partIndex;
        }

        if (slot) {
          if (!layer.slots)
            throw new Error(
              "Cannot use 'slot' without 'slots' in the layer object"
            );

          index += slot * (layer.parts?.length || 1);
        }

        return index;
      }

      throw new Error("Invalid layer key");
    }, [layers, config, key, slot]);

    const style = { zIndex };
    return { style, zIndex };
  };
}
