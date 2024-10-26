import FormInput from "../components/FormInput";
import Graph from "../components/Graph";
import { useEffect, useRef, useState } from "react";
import { OptionalInputType } from "../types/InputType";
import MST from "../algorithms/MST";
import { Box, Container, Stack, Typography } from "@mui/material";
import Description from "../components/Description";

const description = {
  title: "Bài toán xây dựng đường giao thông (MST)",
  description:
    "Giả sử ta muốn xây dựng một hệ thống đường nối n thành phố (được đánh số từ 0 đến n-1) sao cho giữa các thành phố bất kì luôn có đường đi.",
  request:
    "Hãy tìm cây khung nhỏ nhất trên đồ thị, mỗi thành phố ứng với một đỉnh sao cho tổng chi phí xây dựng đường đi là nhỏ nhất.",
  input1: "Dòng đầu tiên chứa số nguyên dương n (1≤n≤10).",
  input2:
    "n dòng tiếp theo, mỗi dòng chứa n số nguyên dương không vượt quá 100 biểu thị ma trận chi phí vô hướng C[n*n].",
  output:
    "Tổng chi phí xây dựng đường đi là nhỏ nhất và đồ thị biểu diễn đường đi đó. ",
};

export default function MSTPage() {
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number> | number[][]>(
    []
  );
  const [totalCost, setTotalCost] = useState(-1);
  const temp = useRef<number>(0);

  useEffect(() => {
    if (inputValue) {
      const mst = new MST(inputValue.n, inputValue.start, inputValue.arr);
      const res = mst.kruskal();

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
          isDigraph={false}
          noStartNode={true}
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
          <Graph inputValue={inputValue} isDigraph={false} />
          <Graph
            inputValue={inputValue}
            outputValue={outputValue}
            algo="MST"
            isDigraph={false}
          />
        </Stack>
      )}
    </Container>
  );
}
