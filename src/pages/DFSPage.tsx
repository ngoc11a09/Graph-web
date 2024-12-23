import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import { DFS } from "../algorithms/DFS";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Description from "../components/Description";

const description = {
  title: "Bài toán duyệt đồ thị theo chiều sâu (DFS)",
  description:
    "Cho đơn đồ thị có hướng hoặc vô hướng, có trọng số  gồm n đỉnh và một đỉnh bắt đầu.",
  request: "Hãy xác định thứ tự duyệt và xây dựng cây DFS.",
  input1: "Dòng đầu tiên chứa số nguyên dương n (1≤n≤10) và đỉnh bắt đầu st.",
  input2:
    "n dòng tiếp theo, mỗi dòng chứa n số nguyên dương không vượt quá 100 biểu thị ma trận chi phí vô hướng (hoặc có hướng) C[n*n].",
  output:
    "Thứ tự duyệt của đồ thị từ đỉnh bắt đầu đã cho và cây DFS đã xây dựng.",
};

export default function DFSPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>();
  const [isDigraph, setIsDigraph] = useState(false);

  const temp = useRef<number>(0);
  const sortedPathArray = useRef<{ key: number; value: number }[]>([]);

  useEffect(() => {
    if (inputValue) {
      const dfs = new DFS(inputValue.n, inputValue.start, inputValue.arr);
      const res = dfs.solve();
      setOutputValue(res.path);
      if (!res.num) return;
      let pathArray = res.num.map((item, index) => ({
        key: index,
        value: item,
      }));

      pathArray = pathArray.filter((pair) => pair.value !== 0);

      sortedPathArray.current = pathArray.sort((a, b) => a.value - b.value);
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
      {outputValue && (
        <Stack>
          <Typography color="secondary" marginY={4} variant="h6">
            Thứ tự duyệt DFS là:{" "}
            {sortedPathArray.current.map((path, index) => (
              <span key={index}>
                {path.key}
                {index < sortedPathArray.current.length - 1 && (
                  <ArrowRightAltIcon />
                )}
              </span>
            ))}
          </Typography>
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
              algo="DFS"
            />
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

/*
7 0
0 1 1 0 0 0 0
0 0 1 0 0 1 0
0 0 0 1 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 0
0 0 0 1 1 0 0
0 1 0 0 0 1 0
*/
