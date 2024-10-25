import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Kruskal: React.FC = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ backgroundColor: "#E4C087", py: 20 }}>
          <Typography
            textAlign="center"
            color="white"
            variant="h3"
            sx={{ fontFamily: "Arial, Monospace" }}
          >
            KRUSKAL
          </Typography>
        </Box>
        <Typography variant="h6" color="secondary">
          Giải thuật Kruskal là gì ?
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Thuật toán Kruskal là một thuật toán trong lý thuyết đồ thị để tìm cây
          bao trùm nhỏ nhất của một đồ thị liên thông vô hướng có trọng số. Nói
          cách khác, nó tìm một tập hợp các cạnh tạo thành một cây chứa tất cả
          các đỉnh của đồ thị và có tổng trọng số các cạnh là nhỏ nhất.Thuật
          toán Kruskal dựa trên giải thuật tham lam, xem đồ thị như là một rừng
          cây và mỗi nút là một cây riêng lẻ trong rừng. Giải thuật không phụ
          thuộc vào điểm bắt đầu.
        </Typography>

        <Typography variant="h6" color="secondary">
          Ý tưởng thuật toán
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Thuật toán Kruskal dựa trên mô hình xây dựng cây khung nhỏ nhất bằng
          thuật toán hợp nhất.
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Thuật toán không xét các cạnh với thứ tự tuỳ ý.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Thuật toán xét các cạnh theo thứ tự đã sắp xếp theo trọng số.
          </Typography>
        </Stack>
        <Typography variant="body1" textAlign="justify">
          Để xây dựng tập n-1 cạnh của cây khung nhỏ nhất - tạm gọi là tập K,
          Kruskal đề nghị cách kết nạp lần lượt các cạnh vào tập đó theo nguyên
          tắc như sau:
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Ưu tiên các cạnh có trọng số nhỏ hơn.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Kết nạp cạnh khi nó không tạo chu trình với tập cạnh đã kết nạp
            trước đó.
          </Typography>
        </Stack>
        <Typography variant="body1" textAlign="justify">
          Đó là một nguyên tắc chính xác và đúng đắn, đảm bảo tập K nếu thu đủ n
          - 1 cạnh sẽ là cây khung nhỏ nhất.
        </Typography>

        <Typography variant="h6" color="secondary">
          Mô tả thuật toán
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Giả sử ta cần tìm cây bao trùm nhỏ nhất của đồ thị G. Thuật toán bao
          gồm các bước sau:
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Khởi tạo rừng F (tập hợp các cây), trong đó mỗi đỉnh của G tạo thành
            một cây riêng biệt
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Khởi tạo tập S chứa tất cả các cạnh của G
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Chừng nào S còn khác rỗng và F gồm hơn một cây
          </Typography>
        </Stack>
        <Container>
          <Stack direction="row">
            <ArrowRightIcon />
            <Typography variant="body1" textAlign="justify">
              Xóa cạnh nhỏ nhất trong S
            </Typography>
          </Stack>
          <Stack direction="row">
            <ArrowRightIcon />
            <Typography variant="body1" textAlign="justify">
              Nếu cạnh đó nối hai cây khác nhau trong F, thì thêm nó vào F và
              hợp hai cây kề với nó làm một
            </Typography>
          </Stack>
          <Stack direction="row">
            <ArrowRightIcon />
            <Typography variant="body1" textAlign="justify">
              Nếu không thì loại bỏ cạnh đó.
            </Typography>
          </Stack>
        </Container>
        <Typography variant="body1" textAlign="justify">
          Khi thuật toán kết thúc, rừng chỉ gồm đúng một cây và đó là một cây
          bao trùm nhỏ nhất của đồ thị G.
        </Typography>

        <Typography variant="h6" color="secondary">
          Độ phức tạp
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Ta thấy chi phí lớn nhất của thuật toán trên nằm ở khâu sắp xếp các
          cạnh và có độ phức tạp là 0(n * logn). Do đó, độ phức tạp thời gian
          của thuật toán là 0(n * logn).
        </Typography>
      </Stack>
    </Container>
  );
};

export default Kruskal;
