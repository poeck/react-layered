import { ExtractKeys } from "./extract";
import { LayersToObject, LayersType } from "./layer";

export type ReturnType<
  Layers extends LayersType<string[]>,
  Key extends ExtractKeys<Layers[number]>
> = Key extends keyof LayersToObject<Layers>
  ? LayersToObject<Layers>[Key] extends { parts: infer P extends string[] }
    ? {
        zIndex: {
          [K in P[number] as K extends string ? K : never]: number;
        };
        style: {
          [K in P[number] as K extends string ? K : never]: { zIndex: number };
        };
      }
    : { zIndex: number; style: { zIndex: number } }
  : { zIndex: number; style: { zIndex: number } };
