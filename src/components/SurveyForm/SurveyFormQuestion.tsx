import React, {
  useRef,
  useCallback,
  FunctionComponent,
  DragEvent,
  ChangeEvent
} from "react"
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineDelete, AiOutlineDrag
} from "react-icons/ai"
import Question from "../../types/Question"
import styles from "./SurveyForm.module.css"
interface Props {
  prompt: string;
  id: string;
  index: number;
  update: (question: Question, index: number) => void
  move: (from: number, to: number) => void
  remove: (index: number) => void
}
const SurveyFormQuestion: FunctionComponent<Props> = ({ prompt, id, index, update, move, remove }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    update({ id, prompt: event.currentTarget.value }, index)
  }

  const moveUp = useCallback(() => move(index, index - 1), [index, move])
  const moveDown = useCallback(() => move(index, index + 1), [index, move])
  const destroy = useCallback(() => remove(index), [index, remove])

  const handleDragStart = useCallback((event: DragEvent) => {
    if (event.target !== event.currentTarget) {
      return event.preventDefault()
    }
    const item = itemRef.current as HTMLLIElement
    const { x, y } = item.getBoundingClientRect()
    event.dataTransfer.setDragImage(item, event.clientX - x, event.clientY - y)
    event.dataTransfer.setData("text/plain", index.toString())
  }, [itemRef, index])

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move";
  }, [])

  const handleDrop = useCallback((event: DragEvent) => {
    event.preventDefault()
    const data = event.dataTransfer.getData("text/plain")
    const from = parseInt(data, 10)
    move(from, index)
  }, [index, move])
  return <li
    ref={itemRef}
    onDragOver={handleDragOver}
    onDrop={handleDrop}>
    <section className={styles.question} aria-label={`Question ${index + 1}`}>
      <header className={styles.questionHeader}>
        <div className={styles.questionHeaderLeft}>
          <span draggable onDragStart={handleDragStart} className={styles.handle}>
            <AiOutlineDrag aria-hidden="true" />
          </span>
        </div>
        <div className={styles.questionHeaderCenter}>
          <button
            type="button"
            disabled={!itemRef.current?.previousSibling}
            onClick={moveUp}
            title="Move Up"
          >
            <AiOutlineArrowUp aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={!itemRef.current?.nextSibling}
            onClick={moveDown}
            title="Move Down">
            <AiOutlineArrowDown aria-hidden="true" />
          </button>
        </div>
        <div className={styles.questionHeaderRight}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={destroy}
            title="Delete Question">
            <AiOutlineDelete aria-hidden="true" />
          </button>
        </div>
      </header>
      <input type="hidden" name="questions[id]" value={id} />
      <label htmlFor={`question[${id}][prompt]`}>Question</label>
      <input type="text" id={`question[${id}][prompt]`} name="questions[prompt]" value={prompt} onChange={handleChange} />
    </section>

  </li >
}

export default SurveyFormQuestion