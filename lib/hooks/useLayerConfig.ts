import { LayersConfig } from "../types/config";
import { LayersType, LayerObject } from "../types/layer";
import { useMemo } from "react";
import { ReturnType } from "../types/return";
import { ExtractKeys } from "../types/extract";

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
  return <Key extends ExtractKeys<Layers[number]>>(
    key: Key,
    slot?: number
  ): ReturnType<Layers, Key> => {
    return useMemo(() => {
      // Start the z-index at the start value
      let zIndex = (config?.start || 1) - 1;

      // Get the base key
      const base = key.includes(".")
        ? key.split(".").slice(0, -1).join(".")
        : key;

      // Get the part from key
      const part = key.includes(".") ? key.split(".").at(-1) : null;

      // Convert the string layers to objects
      let layerObjects: LayerObject<string>[] = layers.map((layer) => {
        if (typeof layer == "string") return { key: layer };

        // Reverse the parts if the config has the reverse property
        if (layer.parts && config?.reverse)
          return { ...layer, parts: [...layer.parts].reverse() };

        return layer;
      });

      // Reverse the layers if the config has the reverse property
      if (config?.reverse) layerObjects = layerObjects.reverse();

      // Loop through the layers
      for (const layer of layerObjects) {
        // Always increment the z-index by 1
        zIndex += 1;

        // Check if the layer is not the base or full key
        if (layer.key !== base && layer.key !== key) {
          // Increment the z-index by the number of parts and slots
          // The -1 is to account for the initial increment.
          if (layer.slots || layer.parts)
            zIndex += (layer.parts?.length || 1) * (layer.slots || 1) - 1;

          // Done for this layer
          continue;
        }

        // If the layer has parts, increment the z-index by the part index
        if (part && layer.parts) {
          const partIndex = layer.parts.indexOf(part);
          if (partIndex < 0) throw new Error(`Invalid part key: ${part}`);
          zIndex += partIndex;
        }

        if (slot) {
          // Warn if the layer does not have slots
          if (!layer.slots)
            throw new Error(
              "Cannot use 'slot' without 'slots' in the layer object"
            );

          // Increment the z-index by the slot index times the number of parts
          zIndex += slot * (layer.parts?.length || 1);
        }

        // If the layer has multiple parts, return all parts
        if (layer.parts?.length && !part) {
          const result: {
            style: { [key: string]: { zIndex: number } };
            zIndex: { [key: string]: number };
          } = {
            style: {},
            zIndex: {},
          };

          // Loop through the parts and calulate the z-index
          layer.parts.forEach((part, idx) => {
            result.style[part] = { zIndex: zIndex + idx };
            result.zIndex[part] = zIndex + idx;
          });

          return result as ReturnType<Layers, Key>;
        }

        const style = { zIndex };
        return { style, zIndex } as ReturnType<Layers, Key>;
      }

      // Nothing was returned, so the key is invalid
      throw new Error(`Invalid layer key "${base}"`);
    }, [layers, config, key, slot]);
  };
}
