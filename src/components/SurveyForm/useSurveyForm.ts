import {
  useCallback,
  Dispatch,
  SetStateAction
} from "react"
import { v4 as uuidv4 } from 'uuid';

import Question from "../../types/Question"

export default (questions: Question[], setQuestions: Dispatch<SetStateAction<Question[]>>) => {


  const add = useCallback(() => {
    setQuestions(old => [...old, { id: uuidv4(), prompt: "" }])
  }, [])

  const remove = useCallback((index: number) => {
    setQuestions(old => {
      const clone = [...old]
      clone.splice(index, 1)
      return clone
    })
  }, [])

  const move = useCallback((from: number, to: number) => {
    setQuestions(old => {
      const clone = [...old]
      const [question] = clone.splice(from, 1)
      clone.splice(to, 0, question)
      return clone
    })
  }, [])

  const update = useCallback((question: Question, index: number) => {
    setQuestions(old => [...old.slice(0, index), question, ...old.slice(index + 1, old.length)])
  }, [])

  return {
    questions,
    add,
    remove,
    update,
    move
  }
}