import { useId, useState, ChangeEvent, useRef } from "react";
import { transformMatrix } from "../utils/convertInput";
import { MatrixType, OptionalInputType } from "../types/InputType";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

interface MatrixInputProps {
  undirectedMatrix?: boolean;
  inputValue?: MatrixType;
  setInputValue: (value: OptionalInputType) => void;
  setIsDigraph?: (value: boolean) => void;
  isDigraph: boolean;
  noStartNode?: boolean;
}

export default function MatrixInput({
  undirectedMatrix,
  setInputValue,
  isDigraph,
  setIsDigraph,
  noStartNode,
}: MatrixInputProps) {
  const [error, setError] = useState(" ");
  const [textValue, setTextValue] = useState("");
  const inputAreaId = useId();
  const nRef = useRef<HTMLInputElement | null>(null);
  const stRef = useRef<HTMLInputElement | null>(null);

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    try {
      const input: OptionalInputType = transformMatrix(
        Number(nRef.current?.value),
        Number(stRef.current?.value),
        formJson.data as string,
        setTextValue,
        isDigraph,
        !noStartNode
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const text = await file.text(); // Read the file content
        setTextValue(text); // Set the content to the TextField
      } catch (error) {
        setError("Không thể đọc tệp này");
      }
    }
  };

  return (
    <Stack>
      <form
        method="post"
        onSubmit={handleSubmit}
        onReset={() => {
          setTextValue("");
          setError(" ");
        }}
        className="flex flex-col"
      >
        {setIsDigraph && !undirectedMatrix && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end", alignItems: "center" }}
          >
            <Typography color="secondary" variant="subtitle2">
              Đồ thị có hướng
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked color="secondary" />}
              // label={isDigraph ? "Đồ thị có hướng" : "Đồ thị vô hướng"}
              label=""
              onClick={() => {
                if (undirectedMatrix) setIsDigraph(false);
                else setIsDigraph(!isDigraph);
              }}
              disabled={undirectedMatrix}
              sx={{ alignSelf: "flex-end", marginRight: 0 }}
            />
            <Typography color="secondary" variant="subtitle2">
              Đồ thị vô hướng
            </Typography>
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{ my: 2, justifyContent: "space-between" }}
        >
          <FormLabel>Số đỉnh</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            inputRef={nRef}
            inputProps={{
              min: 0,
              max: 10,
              step: 1,
            }}
          />
          <FormLabel>Đỉnh bắt đầu</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            inputRef={stRef}
            inputProps={{
              min: 0,
              max: 10,
              step: 1,
            }}
          />
        </Stack>
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
          placeholder="0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0"
        />
        <HelperText />
        <Button
          variant="contained"
          color="secondary"
          component="label"
          sx={{ mt: 2 }}
        >
          Tải tệp lên
          <input type="file" hidden accept=".txt" onChange={handleFileUpload} />
        </Button>
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
