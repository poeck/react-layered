# react-zindex

Welcome to `react-zindex`! If you've ever found yourself lost in the jungle of z-index layers, fighting the chaos of overlapping UI elements, then buckle up! This tiny, mighty package is your guide to taming that wild z-index safari in your React projects. 🌿👓

## Features

- 🔒 **Type Safe:** Built with TypeScript, offering that snug, error-proof comfort.
- 🪶 **Super Lightweight:** Less than 1KB. Using zero dependencies. It's almost like it's not even there!
- 🧘 **Easy Configuration:** Set up your layers once, use them with zen-like calm.

## Setup

### Installation

First, install the package using npm:

```bash
npm install react-zindex
OR
yarn add react-zindex
OR
pnpm add react-zindex
```

### Configuring Layers

Create a hook to configure your layers. This example sets up common UI layers like background, navigation, and modals:

```javascript
// hooks/useLayer.ts
import { useLayerConfig } from "react-zindex";

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
import useLayer from "./hooks/useLayer";

const MyToast = () => {
  const { zIndex } = useLayer("toast");
  return <div style={{ zIndex }}>Toast message pops here!</div>;
};
```

### Using the style object

```javascript
import useLayer from "./hooks/useLayer";

const MyModal = () => {
  const { style } = useLayer("modal");
  return <div style={style}>Hello, I'm on top!</div>;
};
```

## API

### `useLayerConfig(layers, options)`

- REQUIRED: **layers:** Array of strings representing the names of the layers.
- OPTIONAL: **options:** Configuration object with properties:
  - **start:** Starting zIndex value.
  - **step:** Step increment between each zIndex.
