import React from 'react';
import { render, screen, waitForDomChange } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from './App';

describe("App", () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders a JSON form and an empty survey form', () => {
    expect(screen.getByLabelText("JSON")).toHaveValue("[]")

    expect(screen.queryByLabelText("Question")).not.toBeInTheDocument()
  })

  test('can build and reorder a  survey', async () => {
    const jsonInput = screen.getByLabelText("JSON") as HTMLInputElement
    const update = screen.getByRole("button", { name: "Update Survey" })
    const add = screen.getByRole("button", { name: "Add Question" })
    const submit = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement
    const form = submit.form as HTMLFormElement

    // Add some questions
    userEvent.click(add)
    userEvent.click(add)

    const inputs = screen.getAllByRole("textbox", { name: "Question" })

    userEvent.type(inputs[0], "What is your name?")
    userEvent.type(inputs[1], "What is your favorite color?")

    expect(form).toHaveFormValues({
      "questions[prompt]": ["What is your name?", "What is your favorite color?"]
    })

    // reorder questions

    userEvent.click(screen.queryAllByRole("button", { name: "Move Down" })[0])
    expect(form).toHaveFormValues({
      "questions[prompt]": ["What is your favorite color?", "What is your name?"]
    })

    // delete a question

    userEvent.click(screen.queryAllByRole("button", { name: "Delete Question" })[0])

    expect(form).toHaveFormValues({
      "questions[prompt]": "What is your name?"
    })


    // check json input is synced
    const id = new FormData(form).get("questions[id]")
    await waitForDomChange()

    expect(JSON.parse(jsonInput.value)).toEqual([
      {
        id,
        prompt: "What is your name?"
      }
    ])

    // try inputting invalid JSON

    userEvent.type(jsonInput, "not JSON")

    userEvent.click(update)

    expect(screen.getByRole("alert")).toHaveTextContent("Input must be valid JSON")

    userEvent.type(jsonInput, '[{"foo": "bar"}]')
    userEvent.click(update)

    expect(screen.getByRole("alert")).toHaveTextContent("Input JSON must be an array of questions")


    // input valid JSON

    userEvent.type(jsonInput, JSON.stringify([{ id: "foo", prompt: "bar" }]))
    userEvent.click(update)

    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    expect(form).toHaveFormValues({
      "questions[id]": "foo",
      "questions[prompt]": "bar"
    })
  })
})

