import { useId, useState, ChangeEvent } from "react";
import { transformInput } from "../utils/convertInput";
import { OptionalInputType } from "../types/InputType";

interface FormInputProps {
  inputValue?: OptionalInputType;
  setInputValue: (value: OptionalInputType) => void;
}

export default function FormInput({ setInputValue }: FormInputProps) {
  const [error, setError] = useState("");
  const [textValue, setTextValue] = useState("");
  const inputAreaId = useId();

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    try {
      const input: OptionalInputType = transformInput(
        formJson.data as string,
        setTextValue
      );
      setInputValue(input);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
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
          value={textValue}
          onChange={onChangeInput}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <hr />
        <div>
          <button className="m-8" type="reset">
            Reset
          </button>
          <button className="m-8" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
