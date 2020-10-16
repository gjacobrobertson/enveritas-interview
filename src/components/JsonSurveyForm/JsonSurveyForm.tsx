import React, { FunctionComponent, HTMLProps, useCallback } from "react"
import clsx from "clsx"
import styles from "./JsonSurveyForm.module.css"
import { debounce } from "lodash-es";

interface Props extends HTMLProps<HTMLFormElement> {
  json: string;
  setJson: (val: string) => void;
  validate: (val: string) => void;
  error: string | null;
}

const validateWait = 500;

const JsonSurveyForm: FunctionComponent<Props> = ({ json, setJson, validate, error, className, ...props }) => {
  const debouncedValidate = useCallback(debounce(validate, 500), [validate])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    console.log("CHANGE HANDLER");
    const value = event.currentTarget.value;
    setJson(value);
    debouncedValidate(value);
  }

  return <form {...props} className={clsx(className, styles.form)}>
    <label htmlFor="json">JSON</label>
    <textarea id="json" name="json" className={styles.textarea} value={json} onChange={handleChange} />
    <button type="submit" className={styles.submit}>Update Survey</button>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </form>
}

export default JsonSurveyForm