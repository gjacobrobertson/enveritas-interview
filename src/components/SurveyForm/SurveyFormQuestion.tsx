import React, {
  useRef,
  useCallback,
  FunctionComponent,
  DragEvent,
  ChangeEvent
} from "react"
import { Question } from "../../hooks/useSurvey"
import styles from "./SurveyForm.module.css"
interface Props {
  prompt: string;
  id: string;
  index: number;
  update: (question: Question, index: number) => void
  move: (from: number, to: number) => void
}
const SurveyFormQuestion: FunctionComponent<Props> = ({ prompt, id, index, update, move }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    update({ id, prompt: event.currentTarget.value }, index)
  }

  const moveUp = useCallback(() => move(index, index - 1), [index, move])
  const moveDown = useCallback(() => move(index, index + 1), [index, move])

  const handleDragStart = useCallback((event: DragEvent) => {
    const item = itemRef.current as HTMLLIElement
    const { x, y } = item.getBoundingClientRect();
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

  return <li ref={itemRef} className={styles.question} onDragOver={handleDragOver} onDrop={handleDrop}>
    <button type="button" disabled={!itemRef.current?.previousSibling} onClick={moveUp}>Move Up</button>
    <button type="button" disabled={!itemRef.current?.nextSibling} onClick={moveDown}>Move Down</button>
    <p draggable onDragStart={handleDragStart}>Drag</p>
    <label htmlFor={`question[${id}][prompt]`}>Question</label>
    <input id={`question[${id}][prompt]`} name="questions[prompt]" value={prompt} onChange={handleChange} />
  </li>
}

export default SurveyFormQuestion