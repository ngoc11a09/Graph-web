"use client";
import { useId } from "react";
import { transformInput } from "../utils/convertInput";
import { InputType } from "../types/InputType";

interface FormInputProps {
  inputValue?: InputType;
  setInputValue: (value: InputType) => void;
}

export default function FormInput({ setInputValue }: FormInputProps) {
  const inputAreaId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const input: InputType = transformInput(formJson.data as string);
    setInputValue(input);
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor={inputAreaId}>Input:</label>
        </div>
        <textarea
          id={inputAreaId}
          name="data"
          rows={5}
          cols={40}
          autoFocus={true}
        />
        <hr />
        <div>
          <button type="reset">Reset</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
