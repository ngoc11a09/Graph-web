import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Dfs: React.FC = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ backgroundColor: "#88C273", py: 20 }}>
          <Typography
            textAlign="center"
            color="white"
            variant="h3"
            sx={{ fontFamily: "Arial, Monospace" }}
          >
            DFS
          </Typography>
        </Box>
        <Typography variant="h6" color="secondary">
          DFS là gì?
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Tìm kiếm theo chiều sâu (DFS) là một thuật toán để duyệt qua hoặc tìm
          kiếm cấu trúc dữ liệu dạng cây hoặc đồ thị. Thuật toán bắt đầu tại nút
          gốc và kiểm tra từng nhánh càng xa càng tốt trước khi quay lui.
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Kết quả của một DFS là một cây bao trùm (cây khung - spanning tree).
          Cây khung là một đồ thị không có vòng lặp. Để thực hiện duyệt theo
          DFS, chúng ta cần sử dụng cấu trúc dữ liệu ngăn xếp có kích thước tối
          đa bằng tổng số đỉnh trong biểu đồ.
        </Typography>

        <Typography variant="h6" color="secondary">
          Thuật toán
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Để cài đặt DFS, ta cần thực hiện các bước sau:
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 1: Lấy một đỉnh bất kỳ trong đồ thì đưa vào ngăn xếp.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 2: Lấy top value của ngăn xếp để duyệt và thêm vào visited
            list.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 3: Tạo một list bao gồm các đỉnh liền kề của đỉnh đang xét,
            thêm những đỉnh không có trong visited list vào ngăn xếp.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Bước 4: Tiếp tục lặp lại bước 2 và bước 3 đến khi ngăn xếp rỗng.
          </Typography>
        </Stack>

        <Typography variant="h6" color="secondary">
          Độ phức tạp
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Độ phức tạp thời gian của thuật toán DFS được biểu diễn dưới dạng O(V
          + E), trong đó V là số nút và E là số cạnh. Độ phức tạp không gian của
          thuật toán là O(V).
        </Typography>

        <Typography variant="h6" color="secondary">
          Ứng dụng:
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Có rất nhiều ứng dụng của thuật toán tìm kiếm theo chiều sâu trong lý
          thuyết đồ thị. Thuật toán DFS có thể được sử dụng để giải hầu hết các
          bài toán liên quan đến đồ thị hoặc cây. Một số ứng dụng phổ biến của
          nó là:
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Sắp xếp tô pô, schedule problems, phát hiện chu trình trong biểu đồ
            và giải các câu đố chỉ bằng một giải pháp, chẳng hạn như mê cung
            hoặc câu đố sudoku, tất cả đều sử dụng tìm kiếm theo chiều sâu.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Các ứng dụng khác liên quan đến phân tích mạng, chẳng hạn như phát
            hiện xem biểu đồ có phải là bipartite không.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            DFS cũng được sử dụng như một chương trình con trong các thuật toán
            matching trong lý thuyết đồ thị như thuật toán Hopcroft-Karp.
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Tìm kiếm theo chiều sâu được sử dụng trong lập route mapping,
            scheduling và tìm cây khung.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Dfs;
