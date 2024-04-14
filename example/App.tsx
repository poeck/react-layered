import useLayer from "./hooks/useLayer";

export default function App() {
  const { zIndex } = useLayer("background");
  const { style } = useLayer("modal");

  return (
    <>
      <div
        style={{
          width: 300,
          height: 300,
          background: "red",
          zIndex,
          transform: "translate(30%)",
        }}
      ></div>
      <div
        style={{ ...style, width: 150, height: 150, background: "yellow" }}
      ></div>
    </>
  );
}
