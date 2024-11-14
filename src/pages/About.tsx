import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import shipperImage from "../assets/images/shipper.jpg";
import mapImage from "../assets/images/map.jpg";
import dfs from "../assets/images/dfs.jpeg";
import MinSpanningTree from "../assets/images/MinSpanningTree.jpg";
import { usePath } from "../PathContext";

const secondaryColor: string = `#${import.meta.env.VITE_PRIMARY_COLOR}`;

const description = [
  {
    title: "Bài toán người giao hàng",
    algorithm: "Nhánh cận",
    img: shipperImage,
    pathIdx: 20,
    description:
      "Phương pháp nhánh cận là công cụ mạnh mẽ khi giải bài toán tối ưu, giúp giảm thiểu số lượng phép tính, nhưng đòi hỏi kỹ thuật tính toán cận dưới tốt để giảm thiểu số lượng nhánh cần duyệt, từ đó tối ưu hóa hiệu suất.",
  },
  {
    title: "Bài toán tìm đường đi ngắn nhất",
    algorithm: "Dijkstra",
    img: mapImage,
    pathIdx: 21,
    description:
      "Thuật toán Dijkstra giúp tìm đường đi ngắn nhất từ một đỉnh bắt đầu đến tất cả các đỉnh còn lại trong đồ thị có hướng hoặc vô hướng, có trọng số. Đây là một thuật toán quan trọng và được sử dụng rộng rãi.",
  },
  {
    title: "Bài toán duyệt đồ thị theo chiều sâu",
    algorithm: "DFS",
    img: dfs,
    pathIdx: 22,
    description:
      "Duyệt đồ thị theo chiều sâu (DFS) là một phương pháp duyệt đồ thị mà không cần sử dụng hàng đợi. DFS sử dụng ngăn xếp để lưu trữ các đỉnh đã duyệt và duyệt các đỉnh kề của đỉnh hiện tại.",
  },
  {
    title: "Bài toán xây dựng đường giao thông",
    algorithm: "Kruskal",
    img: MinSpanningTree,
    pathIdx: 23,
    description:
      "Thuật toán Kruskal giúp tìm cây khung nhỏ nhất của một đồ thị vô hướng có trọng số. Cây khung nhỏ nhất là một cây khung của đồ thị có trọng số sao cho tổng trọng số của các cạnh trong cây là nhỏ nhất.",
  },
];

export default function About() {
  const { setPath } = usePath();
  const handleClick = (value: number) => {
    setPath(value);
  };
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {description.map((item, index) => (
          <Grid2 key={index} size={6}>
            <Card>
              <CardActionArea onClick={() => handleClick(item.pathIdx)}>
                <CardMedia
                  component="img"
                  sx={{ height: "200px", width: "100%" }}
                  image={item.img}
                  alt="Bài toán người giao hàng"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography
                    textAlign="justify"
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {item.description}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Chip
                      sx={{
                        my: 2,
                        backgroundColor: secondaryColor,
                      }}
                      label={item.algorithm}
                      color="secondary"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
