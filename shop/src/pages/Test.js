import { useDeferredValue, useState, useTransition } from "react";

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{name}</div>;
          })}
    </div>
  );
}
