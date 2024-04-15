import { LayerConfig } from "../types/config";
import { LayersType } from "../types/key";

export function useLayerConfig<
  const Layers extends LayersType,
  const Config extends LayerConfig
>(layers: Layers, config?: Config) {
  return (key: Layers[number]) => {
    const zIndex =
      layers.indexOf(key) + (config?.start || 1) * (config?.step || 1);

    if (zIndex < 0) throw new Error("Invalid layer key");

    const style = { zIndex: zIndex + " !important" };
    return { style, zIndex };
  };
}
