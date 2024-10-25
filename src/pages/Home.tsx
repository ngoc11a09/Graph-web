import { Container, Stack, Typography } from "@mui/material";
import ContentCard from "../components/ContentCard";
import shipperImage from "../assets/images/shipper.jpg";
import mapImage from "../assets/images/map.jpg";
import dfs from "../assets/images/dfs.jpeg";
import MinSpanningTree from "../assets/images/MinSpanningTree.jpg";
import CustomizedSteppers from "../components/Steps";

const TSP = {
  title: "Bài toán người giao hàng",
  description:
    "Một người giao hàng xuất phát từ thành phố cho trước, người này muốn đi tới tất cả các thành phố khác, mỗi thành phố đúng một lần rồi quay trở lại thành phố ban đầu.",
  url: "tsp",
};
const Dijkstra = {
  title: "Bài toán tìm đường đi ngắn nhất",
  description:
    "Cho một đồ thị có hướng hoặc vô hướng, có trọng số và một đỉnh bắt đầu. Cần tính toán đường đi ngắn nhất từ đỉnh bắt đầu đến mỗi đỉnh của đồ thị.",
  url: "dijkstra",
};
const Dfs = {
  title: "Bài toán duyệt đồ thị theo chiều sâu",
  description:
    "Cho đơn đồ thị có hướng hoặc vô hướng, có trọng số  gồm n đỉnh và một đỉnh bắt đầu. Hãy xây dựng cây DFS.",
  url: "dfs",
};
const MST = {
  title: "Bài toán xây dựng đường giao thông",
  description:
    "Giả sử ta muốn xây dựng một hệ thống đường nối n thành phố sao cho giữa các thành phố bất kì luôn có đường đi. Bài toán đặt ra là tìm tổng chi phí xây dựng đường đi là nhỏ nhất.",
  url: "mst",
};

const Home = () => {
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
        <CustomizedSteppers />
        <ContentCard
          title={TSP.title}
          description={TSP.description}
          img={shipperImage}
          url={TSP.url}
          index={10}
        />
        <ContentCard
          title={Dijkstra.title}
          description={Dijkstra.description}
          img={mapImage}
          url={Dijkstra.url}
          index={11}
        />
        <ContentCard
          title={Dfs.title}
          description={Dfs.description}
          img={dfs}
          url={Dfs.url}
          index={12}
        />
        <ContentCard
          title={MST.title}
          description={MST.description}
          img={MinSpanningTree}
          url={MST.url}
          index={13}
        />
      </Stack>
    </Container>
  );
};
export default Home;
