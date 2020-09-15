import React from 'react';
import Question from "../../types/Question";
import JsonSurveyForm, { useJsonSurveyForm } from "../JsonSurveyForm"
import SurveyForm, { useSurveyForm } from "../SurveyForm"
import styles from './App.module.css';

const App: React.FunctionComponent = () => {
  const [questions, setQuestions] = React.useState<Question[]>([])
  const surveyFormProps = useSurveyForm(questions, setQuestions)
  const jsonSurveyFormProps = useJsonSurveyForm(questions, setQuestions)

  return <main className={styles.main}>
    <h1 className={styles.header}>Enveritas Interview</h1>
    <JsonSurveyForm className={styles.column} {...jsonSurveyFormProps} />
    <SurveyForm className={styles.column} {...surveyFormProps} />
  </main>
}


export default App;
