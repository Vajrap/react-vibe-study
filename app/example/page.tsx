import { useState } from "react";

export default function Parent() {
  const [text, setText] = useState("");

  return <ChildComponent text={text} setText={setText} />;
}

interface ChildProps {
  text: string;
  setText: (text: string) => void;
}

function ChildComponent(props: ChildProps) {
  return (
    <>
      <input
        className="min-w-64 rounded border border-zinc-300 bg-white px-3 py-2"
        value={props.text}
        onChange={(event) => props.setText(event.target.value)}
        placeholder="Type something"
      />
    </>
  );
}
