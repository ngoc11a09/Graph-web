import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { TSP } from "../algorithms/TSP";
import { Box, Container, Stack, Typography } from "@mui/material";
import Description from "../components/Description";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const description = {
  title: "Bài toán người giao hàng (TSP)",
  description:
    "Có một người giao hàng cần đi giao hàng tại n thành phố được đánh số từ 0 đến n-1. Anh ta xuất phát từ một thành phố nào đó, đi qua các thành phố khác để giao hàng và trở về thành phố ban đầu. Mỗi thành phố chỉ đến một lần, và khoảng cách từ một thành phố đến các thành phố khác đã được biết trước.",
  request:
    "Hãy tìm một chu trình (một đường đi khép kín thỏa mãn điều kiện trên) sao cho tổng độ dài/chi phí các cạnh là nhỏ nhất.",
  input1: "Dòng đầu tiên chứa số nguyên dương n (1≤n≤10) và đỉnh bắt đầu st.",
  input2:
    "n dòng tiếp theo, mỗi dòng chứa n số nguyên dương không vượt quá 100 biểu thị ma trận chi phí vô hướng C[n*n].",
  output:
    "Tổng độ dài/chi phí của đường đi ngắn nhất thỏa mãn và đồ thị biểu diễn đường đi đó. ",
};

export default function TSPPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>([]);
  const [totalCost, setTotalCost] = useState(-1);
  const [error, setError] = useState("");
  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      try {
        const tsp = new TSP(inputValue.n, inputValue.start, inputValue.arr);
        const res = tsp.TSP();

        setOutputValue(res.path);
        setTotalCost(res.totalCost);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Lỗi! Vui lòng nhập lại");
        }
        setTotalCost(-1);
      }
    }
  }, [inputValue]);

  const handleInputChange = (value: OptionalInputType) => {
    setInputValue(value);
    setError("");
    temp.current++;
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} useFlexGap alignItems="stretch">
        <Description description={description} />
        <FormInput setInputValue={handleInputChange} isDigraph={false} />
      </Stack>
      {error && (
        <Typography
          color="error"
          marginY={4}
          variant="h6"
          textAlign="center"
          sx={{
            py: 16,
            border: 2,
            borderStyle: "dashed",
            borderColor: "error.main",
          }}
        >
          {error}
        </Typography>
      )}
      {totalCost >= 0 && (
        <Stack direction="row" justifyContent="space-evenly">
          <Typography color="secondary" marginY={4} variant="h6">
            Tổng chi phí: {totalCost}
          </Typography>
          <Typography color="secondary" marginY={4} variant="h6">
            Hành trình cần đi:{" "}
            {outputValue.map((city, index) => (
              <span key={index}>
                {city}
                {index < outputValue.length - 1 && <ArrowRightAltIcon />}
              </span>
            ))}
          </Typography>
        </Stack>
      )}
      {totalCost >= 0 && (
        <Stack
          direction="row"
          sx={{
            height: 400,
            border: 2,
            borderStyle: "dashed",
            borderColor: "secondary.main",
          }}
          key={temp.current}
          divider={
            <Box
              sx={{
                border: 1,
                borderStyle: "solid",
                borderColor: "secondary.main",
              }}
            ></Box>
          }
        >
          <Graph inputValue={inputValue} isDigraph={false} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            algo="TSP"
            isDigraph={false}
          />
        </Stack>
      )}
    </Container>
  );
}
