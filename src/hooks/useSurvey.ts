import { useState, useEffect, useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';

export interface Question {
  id: string,
  prompt: string,
}

const isQuestion = (obj: any) => obj && typeof obj.id === "string"


export default () => {
  const [json, setJson] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  // For realer situations consider tooling such as AJV
  const validateJson = useCallback((value: string) => {
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
  }, [])

  const updateQuestion = useCallback((question: Question, index: number) => {
    setQuestions(old => [...old.slice(0, index), question, ...old.slice(index + 1, old.length)])
  }, [])

  const addQuestion = useCallback(() => {
    setQuestions(old => [...old, { id: uuidv4(), prompt: "" }])
  }, [])

  const moveQuestion = useCallback((from: number, to: number) => {
    setQuestions(old => {
      const clone = [...old]
      const [question] = clone.splice(from, 1)
      clone.splice(to, 0, question)
      return clone
    })
  }, [])

  const removeQuestion = useCallback((index: number) => {
    setQuestions(old => {
      const clone = [...old]
      clone.splice(index, 1)
      return clone
    })
  }, [])

  useEffect(() => {
    setJson(JSON.stringify(questions, null, 2))
  }, [questions])

  return {
    json,
    setJson,
    validateJson,
    error,
    questions,
    addQuestion,
    updateQuestion,
    moveQuestion,
    removeQuestion,
  }
}