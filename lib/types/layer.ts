export type Layer<Keys extends string[]> =
  | Keys[number]
  | LayerObject<Keys[number]>;

export type LayerObject<Keys> = {
  key: Keys;
  slots?: number;
  parts?: string[];
};

export type LayersType<Keys extends string[]> = Layer<Keys>[];
