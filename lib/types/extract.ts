export type ExtractKeys<L> = L extends string
  ? L
  : L extends {
      key: infer K extends string;
      parts: infer C extends any[];
    }
  ? `${K}.${C[number]}` | K
  : L extends { key: infer K extends string }
  ? K
  : never;
