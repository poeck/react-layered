export type Layer<Keys extends string[]> =
  | Keys[number]
  | LayerObject<Keys[number]>;

export type LayerObject<Keys> = {
  key: Keys;
  slots?: number;
  parts?: string[];
};

export type LayersType<Keys extends string[]> = Layer<Keys>[];

export type LayersToObject<Layers extends LayersType<string[]>> = {
  [K in Layers[number] as K extends { key: infer Key } ? Key : K]: K extends {
    key: string;
  }
    ? Omit<K, "key">
    : {};
};
