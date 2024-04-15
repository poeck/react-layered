import { useLayerConfig } from "../../lib/main";

export default useLayerConfig([
  "background",
  { key: "modal", parts: ["background", "content"] },
  { key: "toast", slots: 3 },
  "tooltip",
]);
