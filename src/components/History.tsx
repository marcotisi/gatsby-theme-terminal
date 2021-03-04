import React from "react";

import { useHistory } from "../hooks";
import { Prompt } from "./Prompt";

export const History: React.FC = () => {
  const { history } = useHistory();

  return (
    <>
      {history.map(({ element, command }, index) => (
        <div key={`history-${index}`}>
          <Prompt value={command} disabled />
          {element}
        </div>
      ))}
    </>
  );
};
