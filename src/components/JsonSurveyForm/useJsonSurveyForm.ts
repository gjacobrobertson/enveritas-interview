import {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from "react"

import Question from "../../types/Question"

const isQuestion = (obj: any) => obj && typeof obj.id === "string"

export default (questions: Question[], setQuestions: Dispatch<SetStateAction<Question[]>>) => {
  const [json, setJson] = useState("")
  const [error, setError] = useState<string | null>(null)

  // For realer situations consider tooling such as AJV
  const validate = useCallback((value: string) => {
    try {
      const data = JSON.parse(value);

      if (!(data instanceof Array)) {
        return setError("Input JSON must be an array")
      }

      if (!data.every(isQuestion)) {
        return setError("Input JSON must be an array of questions")
      }

      setError(null);
      setQuestions(data);
    }
    catch {
      return setError("Input must be valid JSON")
    }
  }, [setQuestions])


  useEffect(() => {
    setJson(JSON.stringify(questions, null, 2))
  }, [questions])

  return {
    json,
    setJson,
    validate,
    error
  }
}