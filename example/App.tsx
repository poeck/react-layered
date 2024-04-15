import useLayer from "./hooks/useLayer";

export default function App() {
  const { zIndex } = useLayer("background");

  return (
    <h1
      style={{
        fontSize: "8rem",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {zIndex}
    </h1>
  );
}
