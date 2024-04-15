# react-layered

Welcome to react-layered! If you've ever found yourself lost in the jungle of z-index layers, fighting the chaos of overlapping UI elements, then buckle up! This tiny, mighty package is your guide to taming that wild z-index safari in your React projects. 🌿👓

## Features

- 🔒 **Type Safe:** Built with TypeScript, offering that snug, error-proof comfort.
- 🪶 **Super Lightweight:** Less than 2KB. Using zero dependencies. It's almost like it's not even there!
- 🧘 **Easy Configuration:** Set up your layers once, use them with zen-like calm.

## Setup

### Installation

First, install the package using your favourite package manager:

```bash
npm install react-layered
OR
yarn add react-layered
OR
pnpm add react-layered
```

### Configuring Layers

Create a hook to configure your layers. This example sets up common UI layers like background, navigation, and modals:

```javascript
// hooks/useLayer.ts
import { useLayerConfig } from "react-layered";

export default useLayerConfig([
  "navigation",
  "footer",
  { key: "modal", parts: ["backdrop", "content"] },
  { key: "toast", slots: 20 },
  "dropdown",
  "tooltip",
]);
```

## Usage

To use a layer in your components:

### Using the style object

```javascript
import useLayer from "../hooks/useLayer";

const MyModal = () => {
  const { style: backgroundStyle } = useLayer("modal.background");
  const { style: contentStyle } = useLayer("modal.content");

  return (
    <div style={backgroundStyle}>
      <p style={contentStyle}>Hello, I'm on top!</p>
    </div>
  );
};
```

### Using only the zIndex

```javascript
import useLayer from "../hooks/useLayer";

const MyTooltip = () => {
  const { zIndex } = useLayer("tooltip");
  return <div style={{ zIndex }}>This is a tooltip!</div>;
};
```

### Using the parts

```javascript
import useLayer from "../hooks/useLayer";

const MyToast = ({ index }: { index: number }) => {
  const { zIndex } = useLayer("tooltip", index);
  return <div style={{ zIndex }}>This works with multiple toasts!</div>;
};
```

## API

### `useLayerConfig(layers, options)`

Use this function to generate your own `useLayer` hook.

| Parameter | Required | Type                          | Description                                                            |
| --------- | -------- | ----------------------------- | ---------------------------------------------------------------------- |
| `layers`  | ✅       | (string &#124; LayerObject)[] | An array of LayerObjects or strings defining the layers in the system. |
| `config`  | ❌       | LayersConfig                  | An optional configuration object specifying additional settings.       |

#### LayerObject

| Property | Required | Type   | Default | Description                                      |
| -------- | -------- | ------ | ------- | ------------------------------------------------ |
| `key`    | ✅       | string | -       | The key of the layer.                            |
| `slots`  | ❌       | number | 1       | Extend the layer across multiple z-index levels. |

#### LayersConfig

| Property  | Required | Type    | Default | Description                                 |
| --------- | -------- | ------- | ------- | ------------------------------------------- |
| `start`   | ❌       | number  | 1       | The initial value to start the zIndex with. |
| `reverse` | ❌       | boolean | false   | Reverse the layer order.                    |

### `useLayer(key[, index])`

This function is a custom hook that you can create using useLayerConfig.

| Parameter | Required | Type   | Description                                                                                   |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------- |
| `key`     | ✅       | string | The key of the layer.                                                                         |
| `slot`    | ❌       | number | The slot to be used, starting at 0. Applicable only when 'slots' is configured for the layer. |
