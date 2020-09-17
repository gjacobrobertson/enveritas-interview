import React, { FunctionComponent, HTMLProps } from "react"
import clsx from "clsx"
import styles from "./JsonSurveyForm.module.css"

interface Props extends HTMLProps<HTMLFormElement> {
  json: string;
  setJson: (val: string) => void;
  validate: (val: string) => void;
  error: string | null;
}

const JsonSurveyForm: FunctionComponent<Props> = ({ json, setJson, validate, error, className, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setJson(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    validate(json);
  }

  return <form {...props} className={clsx(className, styles.form)} onSubmit={handleSubmit}>
    <label htmlFor="json">JSON</label>
    <textarea id="json" name="json" className={styles.textarea} value={json} onChange={handleChange} />
    <button type="submit" className={styles.submit}>Update Survey</button>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </form>
}

export default JsonSurveyForm