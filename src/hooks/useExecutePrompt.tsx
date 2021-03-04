import { navigate } from "gatsby";
import { ReactNode } from "react";

import { useHistory } from "./useHistory";

export const useExecutePrompt = (element?: ReactNode) => {
  const { pushToHistory, clearHistory, history } = useHistory();

  const executePrompt = (prompt: string = "") => {
    const command = prompt.trim();

    switch (command) {
      case "clear": {
        clearHistory();
        navigate("/");
        break;
      }
      case "": {
        navigate("/");
        pushToHistory({
          command: "",
        });
        break;
      }
      default: {
        const lastHistoryItem = [...history].pop();
        const lastCommand = lastHistoryItem?.command;
        if (lastCommand !== command) {
          navigate(`/${command}`);
        } else {
          pushToHistory({
            command,
            element,
          });
        }
        break;
      }
    }
  };

  return {
    executePrompt,
  };
};
