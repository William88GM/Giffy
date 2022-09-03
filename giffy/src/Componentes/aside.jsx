import React from "react";

export default function Aside({ array }) {
  return (
    <aside>
      <ul>
        {Array.isArray(array) ? array.map((e) => <li key={e}>{e}</li>) : null}
      </ul>
    </aside>
  );
}
