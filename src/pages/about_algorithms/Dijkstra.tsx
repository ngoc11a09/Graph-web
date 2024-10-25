import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Dijkstra: React.FC = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ backgroundColor: "#6B8A7A", py: 20 }}>
          <Typography
            textAlign="center"
            color="white"
            variant="h3"
            sx={{ fontFamily: "Arial, Monospace" }}
          >
            Dijkstra
          </Typography>
        </Box>
        <Typography variant="h6" color="secondary">
          Tổng quan
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Thuật toán Dijkstra giải quyết bài toán đường đi ngắn nhất nguồn đơn
          trong một đồ thị có hướng hoặc vô hướng không có cạnh mang trọng số
          âm. Thuật toán thường được sử dụng trong định tuyến với một chương
          trình con trong các thuật toán đồ thị hay trong công nghệ Hệ thống
          định vị toàn cầu (GPS).
        </Typography>

        <Typography variant="h6" color="secondary">
          Ý tưởng
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 1: Từ đỉnh gốc, khởi tạo khoảng cách tới chính nó là 0, khởi
            tạo khoảng cách nhỏ nhất ban đầu tới các đỉnh khác là +∞. Ta được
            danh sách các khoảng cách tới các đỉnh.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 2: Chọn đỉnh a có khoảng cách nhỏ nhất trong danh sách này và
            ghi nhận. Các lần sau sẽ không xét tới đỉnh này nữa.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 3: Lần lượt xét các đỉnh kề b của đỉnh a. Nếu khoảng cách từ
            đỉnh gốc tới đỉnh b nhỏ hơn khoảng cách hiện tại đang được ghi nhận
            thì cập nhật giá trị và đỉnh kề a vào khoảng cách hiện tại của b.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 4: Sau khi xét tất cả đỉnh kề b của đỉnh a. Lúc này ta được
            danh sách khoảng cách tới các điểm đã được cập nhật. Quay lại Bước 2
            với danh sách này. Thuật toán kết thúc khi chọn được khoảng cách nhỏ
            nhất từ tất cả các điểm.
          </Typography>
        </Stack>

        <Typography variant="h6" color="secondary">
          Ứng dụng thực tế của thuật toán Dijkstra
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Một số ứng dụng của thuật toán Dijkstra trong thực tế:
        </Typography>
        <Stack direction="row" justifyContent="space-evenly">
          <Stack direction="column">
            <Stack direction="row">
              <ArrowRightIcon />
              <Typography variant="body1" textAlign="justify">
                Tìm đường đi ngắn nhất trên bản đồ.
              </Typography>
            </Stack>
            <Stack direction="row">
              <ArrowRightIcon />
              <Typography variant="body1" textAlign="justify">
                Ứng dụng trong mạng xã hội.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Stack direction="row">
              <ArrowRightIcon />
              <Typography variant="body1" textAlign="justify">
                Ứng dụng trong hệ thống thông tin di động.
              </Typography>
            </Stack>
            <Stack direction="row">
              <ArrowRightIcon />
              <Typography variant="body1" textAlign="justify">
                Ứng dụng trong hàng không.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Dijkstra;
