import React, { FunctionComponent, HTMLProps } from "react"
import clsx from "clsx";
import { Question } from "../../hooks/useSurvey";
import styles from "./SurveyForm.module.css";
import SurveyFormQuestion from "./SurveyFormQuestion";

interface Props extends HTMLProps<HTMLFormElement> {
  questions: Question[],
  add: () => void,
  update: (question: Question, index: number) => void
  move: (from: number, to: number) => void
}

const SurveyForm: FunctionComponent<Props> = ({ className, questions, add, update, move, ...props }) => {
  return <form {...props} className={clsx(className, styles.form)}>
    <fieldset role="region" aria-live="polite">
      <legend>Questions</legend>
      <ul className={styles.list}>
        {questions.map((question, index) => <SurveyFormQuestion key={question.id} {...question} index={index} update={update} move={move} />)}
      </ul>
    </fieldset>

    <button type="button" onClick={add}>Add Question</button>
    <button type="submit">Save</button>
  </form>
}

export default SurveyForm