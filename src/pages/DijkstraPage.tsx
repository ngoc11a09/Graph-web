import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { Dijkstra } from "../algorithms/Dijkstra";
import { Box, Container, Stack, Typography } from "@mui/material";
import Description from "../components/Description";

const description = {
  title: "Bài toán tìm đường đi ngắn nhất (Dijkstra)",
  description:
    "Cho một đồ thị có hướng hoặc vô hướng, có trọng số và một đỉnh bắt đầu. Ta dùng các đỉnh của đồ thị để mô hình các thành phố và các cạnh để mô hình các đường nối giữa chúng. Khi đó trọng số các cạnh có thể xem như độ dài/chi phí của các con đường (do đó C[i][j] >= 0).",
  request:
    "Ta cần tính toán được đường đi ngắn nhất từ đỉnh nguồn st đến mỗi đỉnh của đồ thị.",
  input1: "Dòng đầu tiên chứa số nguyên dương n (1≤n≤10) và đỉnh bắt đầu st.",
  input2:
    "n dòng tiếp theo, mỗi dòng chứa n số nguyên dương không vượt quá 100 biểu thị ma trận chi phí vô hướng (hoặc có hướng) C[n*n].",
  output:
    "Tổng độ dài/chi phí của đường đi ngắn nhất thỏa mãn từ đỉnh nguồn st đến tất cả các đỉnh của đồ thị và đồ thị biểu diễn đường đi đó. ",
};

export default function DijkstraPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [totalCost, setTotalCost] = useState(-1);
  const [isDigraph, setIsDigraph] = useState(false);

  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const dijkstra = new Dijkstra(
        inputValue.n,
        inputValue.start,
        inputValue.arr
      );
      const res = dijkstra.dijkstra();
      setOutputValue(res.path);
      setTotalCost(res.totalCost);
    }
  }, [inputValue]);

  const handleInputChange = (value: OptionalInputType) => {
    setInputValue(value);
    temp.current++;
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} useFlexGap alignItems="stretch">
        <Description description={description} />
        <FormInput
          setInputValue={handleInputChange}
          setIsDigraph={setIsDigraph}
          isDigraph={isDigraph}
        />
      </Stack>
      {totalCost >= 0 && (
        <Typography color="secondary" marginY={4} variant="h6">
          Tổng chi phí: {totalCost}
        </Typography>
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
          <Graph inputValue={inputValue} isDigraph={isDigraph} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            isDigraph={isDigraph}
            algo="Dijkstra"
          />
        </Stack>
      )}
    </Container>
  );
}

/*
5 0
0 3 1 0 0
3 0 7 5 1
1 7 0 2 0
0 5 2 0 7
0 1 0 7 0 
*/
