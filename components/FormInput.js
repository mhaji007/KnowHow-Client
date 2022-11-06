import { useState } from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        // Password is the last field. Uesr likely won't click elsewhere
        // but the submit button so onBlur (touch and click away) won't
        // work here. Need a mechanism to dsiplay the error as soon as
        // the input field is focused (touched, clicked)
        onFocus={() =>
          inputProps.name === "password" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
