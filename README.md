# react-layered

Welcome to react-layered! If you've ever found yourself lost in the jungle of z-index layers, fighting the chaos of overlapping UI elements, then buckle up! This tiny, mighty package is your guide to taming that wild z-index safari in your React projects. 🌿👓

## Features

- 🔒 **Type Safe:** Built with TypeScript, offering that snug, error-proof comfort.
- 🪶 **Super Lightweight:** Less than 1KB. Using zero dependencies. It's almost like it's not even there!
- 🧘 **Easy Configuration:** Set up your layers once, use them with zen-like calm.

## Setup

### Installation

First, install the package using npm:

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
  "background",
  "navigation",
  "footer",
  "modal",
  "alert",
  "toast",
  "tooltip",
]);
```

## Usage

To use a layer in your components:

### Using only the zIndex

```javascript
import useLayer from "../hooks/useLayer";

const MyToast = () => {
  const { zIndex } = useLayer("toast");
  return <div style={{ zIndex }}>Toast message pops here!</div>;
};
```

### Using the style object

```javascript
import useLayer from "../hooks/useLayer";

const MyModal = () => {
  const { style } = useLayer("modal");
  return <div style={style}>Hello, I'm on top!</div>;
};
```

## API

### `useLayerConfig(layers, options)`

| Parameter | Required | Type       | Description                                                      |
| --------- | -------- | ---------- | ---------------------------------------------------------------- |
| `layers`  | ✅       | `string[]` | An array of strings defining the layers in the system.           |
| `config`  | ❌       | `Config`   | An optional configuration object specifying additional settings. |

#### Config Object Properties

| Property | Required | Type     | Default | Description                                 |
| -------- | -------- | -------- | ------- | ------------------------------------------- |
| `start`  | ❌       | `number` | `1`     | The initial value to start the zIndex with. |
| `step`   | ❌       | `number` | `1`     | The increment between each layer.           |
