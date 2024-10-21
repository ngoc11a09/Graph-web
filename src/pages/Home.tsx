import { Container, Stack } from "@mui/material";
import ContentCard from "../components/ContentCard";
import shipperImage from "../assets/images/shipper.jpg";
import mapImage from "../assets/images/map.jpg";
import lienthongImage from "../assets/images/lienthong.png";

const TSP = {
  title: "Bài toán người giao hàng",
  description:
    "Một người giao hàng xuất phát từ thành phố cho trước, người này muốn đi tới tất cả các thành phố khác, mỗi thành phố đúng một lần rồi quay trở lại thành phố ban đầu.",
  path: "tsp",
};
const Dijkstra = {
  title: "Bài toán tìm đường đi ngắn nhất",
  description:
    "Cho một đồ thị có hướng hoặc vô hướng, có trọng số và một đỉnh bắt đầu. Cần tính toán đường đi ngắn nhất từ đỉnh bắt đầu đến mỗi đỉnh của đồ thị.",
  path: "dijkstra",
};
const Dfs = {
  title: "Bài toán duyệt đồ thị",
  description:
    "Cho đơn đồ thị có hướng hoặc vô hướng, có trọng số  gồm n đỉnh và một đỉnh bắt đầu. Hãy xác định xem đồ thị có bao nhiêu thành phần liên thông?",
  path: "dfs",
};

const Home = () => {
  return (
    <div>
      <Container className="">
        <Stack
          direction={{ column: "column" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <ContentCard
            title={TSP.title}
            description={TSP.description}
            img={shipperImage}
            path={TSP.path}
            index={0}
          />
          <ContentCard
            title={Dijkstra.title}
            description={Dijkstra.description}
            img={mapImage}
            path={Dijkstra.path}
            index={1}
          />
          <ContentCard
            title={Dfs.title}
            description={Dfs.description}
            img={lienthongImage}
            path={Dfs.path}
            index={2}
          />
        </Stack>
      </Container>
    </div>
  );
};
export default Home;
