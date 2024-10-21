import { Stack, Typography } from "@mui/material";

const secondaryColor: string = `#${import.meta.env.VITE_SECONDARY_COLOR}`;
interface ContentCardProps {
  description: {
    title: string;
    description: string;
    request: string;
    input1: string;
    input2: string;
    output: string;
  };
}

const Description: React.FC<ContentCardProps> = ({ description }) => {
  return (
    <Stack sx={{ textAlign: "justify", width: 1 / 2 }}>
      <Typography variant="h4" gutterBottom color="secondary" align="center">
        {description.title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b style={{ color: secondaryColor }}>Mô tả bài toán:</b>{" "}
        {description.description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <b style={{ color: secondaryColor }}>Yêu cầu:</b> {description.request}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        marginTop={2}
        divider={<div className="border border-solid border-[#9c27b0]"></div>}
      >
        <Typography variant="body2" gutterBottom>
          <b style={{ color: secondaryColor }}>Đầu vào:</b> {description.input1}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description.input2}
        </Typography>
      </Stack>
      <Typography variant="body2" gutterBottom>
        <b style={{ color: secondaryColor }}>Đầu ra:</b> {description.output}
      </Typography>
    </Stack>
  );
};

export default Description;
