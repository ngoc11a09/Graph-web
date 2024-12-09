import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { TabPanelProps as MUITabPanelProps } from "@mui/lab/TabPanel";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface TabPanelProps extends MUITabPanelProps {
  index: number;
}
import { useEffect, useRef, useState } from "react";
import MatrixInput from "../components/MatrixInput";
import { OptionalInputType } from "../types/InputType";
import Graph from "../components/Graph";
import { TSP } from "../algorithms/TSP";
import { Dijkstra } from "../algorithms/Dijkstra";
import { DFS } from "../algorithms/DFS";
import MST from "../algorithms/MST";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const More = () => {
  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<OptionalInputType>();
  const [outputValue, setOutputValue] = useState<Array<number>>([]);
  const [outputValueMST, setOutputValueMST] = useState<Array<number[]>>([]);
  const [totalCost, setTotalCost] = useState(-1);
  const [error, setError] = useState("");
  const temp = useRef<number>(0);
  const [isDigraph, setIsDigraph] = useState<boolean>(false);
  const sortedPathArray = useRef<{ key: number; value: number }[]>([]);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (inputValue) {
      try {
        if (value === 0) {
          const tsp = new TSP(inputValue.n, inputValue.start, inputValue.arr);
          const res = tsp.TSP();
          setOutputValue(res.path);
          setTotalCost(res.totalCost);
        }
        if (value === 1) {
          const dijkstra = new Dijkstra(
            inputValue.n,
            inputValue.start,
            inputValue.arr
          );
          const res = dijkstra.dijkstra();
          setOutputValue(res.path);
          setTotalCost(res.totalCost);
        }
        if (value === 2) {
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
        if (value === 3) {
          const mst = new MST(inputValue.n, inputValue.start, inputValue.arr);
          const res = mst.kruskal();
          setOutputValueMST(res.path);
          setTotalCost(res.totalCost);
        }
        setShowGraph(true);
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

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setOutputValue([]);
    setTotalCost(-1);
    setShowGraph(false);
  };

  const handleInputChange = (value: OptionalInputType) => {
    setInputValue(value);
    setShowGraph(false);
    setError("");
    temp.current++;
  };

  return (
    <Container>
      <Stack direction={{ column: "column" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Typography
          textAlign="center"
          variant="h3"
          color="secondary"
          component="h1"
          gutterBottom
        >
          Quản lý đồ thị với các giải thuật trên đồ thị
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly" }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              indicatorColor="secondary"
              textColor="secondary"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Bài toán người giao hàng (B&B)" {...a11yProps(0)} />
              <Tab
                label="Bài toán tìm đường đi ngắn nhất (Dijkstra)"
                {...a11yProps(1)}
              />
              <Tab
                label="Bài toán duyệt đồ thị theo chiều sâu (DFS)"
                {...a11yProps(2)}
              />
              <Tab
                label="Bài toán xây dựng đường giao thông (MST)"
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <Stack sx={{ width: 1 / 2, justifyContent: "center" }}>
            <MatrixInput
              undirectedMatrix={value === 0 || value === 3}
              setInputValue={handleInputChange}
              setIsDigraph={setIsDigraph}
              isDigraph={isDigraph}
            />
          </Stack>
        </Stack>
        {inputValue && (
          <>
            <TabPanel value={value} index={0}>
              {error && (
                <Typography
                  color="error"
                  marginY={4}
                  variant="subtitle2"
                  textAlign="center"
                  gutterBottom
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
              {showGraph && (
                <>
                  <Stack direction="row" justifyContent="space-evenly">
                    <Typography color="secondary" marginY={4} variant="h6">
                      Tổng chi phí: {totalCost}
                    </Typography>
                    <Typography color="secondary" marginY={4} variant="h6">
                      Hành trình cần đi:{" "}
                      {outputValue.map((city, index) => (
                        <span key={index}>
                          {city}
                          {index < outputValue.length - 1 && (
                            <ArrowRightAltIcon />
                          )}
                        </span>
                      ))}
                    </Typography>
                  </Stack>

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
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {showGraph && (
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
            </TabPanel>
            <TabPanel value={value} index={2}>
              {showGraph && (
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
            </TabPanel>
            <TabPanel value={value} index={3}>
              {showGraph && (
                <Typography color="secondary" marginY={4} variant="h6">
                  Tổng chi phí: {totalCost}
                </Typography>
              )}
              {showGraph && (
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
                    outputValue={outputValueMST}
                    algo="MST"
                    isDigraph={false}
                  />
                </Stack>
              )}
            </TabPanel>
          </>
        )}
      </Stack>
    </Container>
  );
};
export default More;
