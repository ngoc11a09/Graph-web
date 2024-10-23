import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { DFS } from "../algorithms/DFS";
import { Box, Container, Stack, Typography } from "@mui/material";

const description = {
  title: "Bài toán duyệt đồ thị (DFS)",
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

export default function DFSPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [isDigraph, setIsDigraph] = useState(false);

  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const dfs = new DFS(inputValue.n, inputValue.start, inputValue.arr);
      const res = dfs.solve();
      setOutputValue(res.path);
    }
  }, [inputValue]);

  const handleInputChange = (value: OptionalInputType) => {
    setInputValue(value);
    temp.current++;
  };

  return (
    <Container>
      <FormInput
        setInputValue={handleInputChange}
        setIsDigraph={setIsDigraph}
        isDigraph={isDigraph}
      />
      {inputValue && (
        <div className="input-graph" key={temp.current}>
          <Graph inputValue={inputValue} isDigraph={isDigraph} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            isDigraph={isDigraph}
            algo="DFS"
          />
        </div>
      )}
    </Container>
  );
}
