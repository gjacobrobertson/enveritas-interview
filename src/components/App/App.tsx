import React from 'react';
import JsonSurveyForm from "../JsonSurveyForm"
import SurveyForm from "../SurveyForm"
import useSurvey from "../../hooks/useSurvey";
import styles from './App.module.css';

const App: React.FunctionComponent = () => {
  const { json, setJson, validateJson, error, questions, updateQuestion, addQuestion, moveQuestion, removeQuestion } = useSurvey()
  return <main className={styles.main}>
    <h1 className={styles.header}>Enveritas Interview</h1>
    <JsonSurveyForm className={styles.column} json={json} setJson={setJson} error={error} validate={validateJson} />
    <SurveyForm className={styles.column} questions={questions} add={addQuestion} update={updateQuestion} move={moveQuestion} remove={removeQuestion} />
  </main>
}


export default App;
