"use client";

import { useState } from "react";

export function ClientComponent() {
  const [resp, setResp] = useState({});

  const onClick = () => {
    fetch("http://localhost:3069/api/ping", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setResp(data);
      });
  };

  return (
    <div>
      <button type="button" onClick={onClick}>
        Update cookie
      </button>
      <pre> {JSON.stringify(resp, null, 2)} </pre>
    </div>
  );
}
