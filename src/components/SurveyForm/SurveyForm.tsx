import React, { FormEvent, FunctionComponent, HTMLProps, useCallback } from "react"
import clsx from "clsx";
import { Question } from "../../hooks/useSurvey";
import styles from "./SurveyForm.module.css";
import SurveyFormQuestion from "./SurveyFormQuestion";

interface Props extends HTMLProps<HTMLFormElement> {
  questions: Question[],
  add: () => void,
  update: (question: Question, index: number) => void,
  move: (from: number, to: number) => void,
  remove: (index: number) => void
}

const SurveyForm: FunctionComponent<Props> = ({ className, questions, add, update, move, remove, ...props }) => {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, [])
  return <form {...props} className={clsx(className, styles.form)} onSubmit={handleSubmit}>
    <fieldset role="region" aria-live="polite">
      <legend>Questions</legend>
      <ul className={styles.list}>
        {questions.map((question, index) =>
          <SurveyFormQuestion key={question.id} {...question} index={index} update={update} move={move} remove={remove} />)}
      </ul>
    </fieldset>

    <button type="button" onClick={add}>Add Question</button>
    <button type="submit" className={styles.submit}>Save</button>
  </form>
}

export default SurveyForm