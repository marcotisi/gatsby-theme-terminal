import React, { ReactNode, useRef } from "react";

import styles from "../assets/Prompt.module.css";
import { useExecutePrompt, useFocusOnKeyDown, useSiteMetadata } from "../hooks";

type PromptProps = {
  value?: string;
  element?: ReactNode;
  disabled?: boolean;
};

export const Prompt: React.FC<PromptProps> = ({
  value,
  element,
  disabled = false,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const { executePrompt } = useExecutePrompt(element);
  const { user, host } = useSiteMetadata();
  useFocusOnKeyDown(disabled ? undefined : inputElement);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!inputElement.current) {
          return;
        }
        executePrompt(inputElement.current.value);
        inputElement.current.value = "";
      }}
    >
      <label className={styles.label}>
        <span className={styles.promptPrefix}>➜</span>
        <span className={styles.promptText}>
          {user}@{host}
        </span>
        <span className={styles.promptSuffix}>~</span>
        <input
          className={styles.prompt}
          type="text"
          ref={inputElement}
          defaultValue={value}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          readOnly={disabled}
          disabled={disabled}
          autoFocus={!disabled}
        />
      </label>
    </form>
  );
};
