import { useId, useState, ChangeEvent } from "react";
import { transformInput } from "../utils/convertInput";
import { OptionalInputType } from "../types/InputType";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  Stack,
  Switch,
} from "@mui/material";

interface FormInputProps {
  inputValue?: OptionalInputType;
  setInputValue: (value: OptionalInputType) => void;
  setIsDigraph?: (value: boolean) => void;
  isDigraph: boolean;
}

export default function FormInput({
  setInputValue,
  isDigraph,
  setIsDigraph,
}: FormInputProps) {
  const [error, setError] = useState(" ");
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
        setTextValue,
        isDigraph
      );
      setInputValue(input);
      setError(" ");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  function HelperText() {
    if (error)
      return (
        <FormHelperText margin="dense" error={true}>
          {error}
        </FormHelperText>
      );
  }

  return (
    <Stack sx={{ width: 1 / 2 }}>
      <form
        method="post"
        onSubmit={handleSubmit}
        onReset={() => {
          setTextValue("");
          setError(" ");
        }}
        className="flex flex-col"
      >
        {setIsDigraph && (
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label={isDigraph ? "Đồ thị có hướng" : "Đồ thị vô hướng"}
            onClick={() => {
              setIsDigraph(!isDigraph);
            }}
            sx={{ alignSelf: "flex-end", marginRight: 0 }}
          />
        )}
        <TextField
          id={inputAreaId}
          label="Đầu vào"
          name="data"
          multiline
          rows={8}
          color="secondary"
          focused
          value={textValue}
          onChange={onChangeInput}
          placeholder="VD:
4 0
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0"
        />
        <HelperText />
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button
            className="px-4 py-2"
            type="reset"
            variant="outlined"
            color="error"
            sx={{ width: 1 / 2, marginRight: 2 }}
          >
            Làm lại
          </Button>
          <Button
            className="px-4 py-2"
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: 1 / 2, marginLeft: 2 }}
          >
            Giải
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
