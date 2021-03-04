import React from "react";

import { Layout } from "../components";
import { useAllCommand } from "../hooks";

export const Help: React.FC = () => {
  const commands = useAllCommand();
  return (
    <Layout title="Help" description="A list of commands you can type.">
      <p>Here&apos;s a list of commands you can type:</p>
      <ul>
        <li>help - show this message</li>
        <li>clear - clear the terminal</li>
        {commands.map(({ command, description }, index) => (
          <li key={`help-${index}`}>
            {[command, description].filter(Boolean).join(" - ")}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Help;
