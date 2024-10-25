import { Box, Container, Stack, Typography } from "@mui/material";
import babImg from "../../assets/images/bab.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const BranchAndBound: React.FC = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ backgroundColor: "#B3A398", py: 20 }}>
          <Typography
            textAlign="center"
            color="white"
            variant="h3"
            sx={{ fontFamily: "Arial, Monospace" }}
          >
            Nhánh cận <br /> (Branch and Bound)
          </Typography>
        </Box>
        <Typography variant="h6" color="secondary">
          Giới thiệu phương pháp
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Thuật toán nhánh cận nhằm tìm một giá trị trong tập nghiệm ứng viên
          sao cho giá trị của hàm mục tiêu đạt cực đại hoặc cực tiểu. Thuật toán
          nhánh cận hoạt động dựa trên hai nguyên tắc chính:
        </Typography>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Phân nhánh: Thuật toán chia không gian tìm kiếm thành các vùng nhỏ
            hơn rồi tìm giá trị nhỏ nhất của hàm mục tiêu trong từng vùng nhỏ.
            Quá trình chia nhỏ không gian này được gọi là "phân nhánh".
          </Typography>
        </Stack>
        <Stack direction="row">
          <ArrowRightIcon />
          <Typography variant="body1" textAlign="justify">
            Cắt tỉa: Nếu chỉ dùng phân nhánh thì thuật toán sẽ phải liệt kê và
            kiểm tra tất cả các nghiệm khả thi, như tìm kiếm vét cạn. Để tăng
            tốc quá trình này, thuật toán nhánh cận sử dụng các "cận" để loại bỏ
            những vùng không gian không thể chứa nghiệm tối ưu.
          </Typography>
        </Stack>
        <Typography variant="h6" color="secondary">
          Ý tưởng
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Để xây dựng một thuật toán nhánh cận cho bài toán cụ thể, cần sử dụng
          một cấu trúc dữ liệu để biểu diễn các tập nghiệm. Cấu trúc này gọi là
          một instance (trường hợp) của bài toán. Mỗi instance biểu diễn một tập
          con các nghiệm khả thi và cung cấp ba thao tác chính sau:
        </Typography>
        <Container>
          <Typography variant="body1" textAlign="justify">
            1. Phân nhánh: Chia một instance thành hai hoặc nhiều instance con,
            mỗi instance con biểu diễn một phần của không gian nghiệm ứng viên.
            Thông thường, các tập con này không giao nhau để tránh việc kiểm tra
            một nghiệm nhiều lần, nhưng điều này không bắt buộc. Tuy nhiên,
            nghiệm tối ưu phải nằm trong ít nhất một trong các tập con này.
          </Typography>
          <Typography variant="body1" textAlign="justify">
            2. Tính cận dưới: Thao tác này tính toán một cận dưới cho giá trị
            của hàm mục tiêu trong một instance. Điều này giúp ta xác định nhanh
            chóng liệu một instance có thể chứa nghiệm tối ưu hay không, từ đó
            quyết định có tiếp tục phân nhánh instance đó không.
          </Typography>
          <Typography variant="body1" textAlign="justify">
            3. Kiểm tra nghiệm: Xác định xem một instance có phải là một nghiệm
            duy nhất hay không. Nếu phải, thì giá trị của hàm mục tiêu tại đó sẽ
            cung cấp một cận trên cho nghiệm tối ưu. Cận trên này có thể dùng để
            so sánh và loại bỏ các vùng không gian có giá trị cận dưới lớn hơn
            cận trên này.
          </Typography>
        </Container>
        <Typography variant="body1" textAlign="justify">
          Bằng phương pháp trên, ta sẽ loại bỏ được những nhánh không cần thiết
          để không duyệt vào các phương án đó, từ đó việc tìm ra nghiệm tối ưu
          sẽ nhanh hơn. Tuy nhiên, việc đánh giá được "độ tốt" của các nghiệm mở
          rộng không phải việc đơn giản, nhưng nếu làm được như vậy thì giải
          thuật sẽ thực thi nhanh hơn nhiều so với vét cạn.
        </Typography>
      </Stack>
      <img src={babImg} alt="bab" />
    </Container>
  );
};

export default BranchAndBound;
