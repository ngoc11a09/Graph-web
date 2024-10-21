import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  title: string;
  description: string;
  path: string;
  img: string;
  index: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  path,
  img,
  index,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <Card className="w-full h-32 " sx={{ bgcolor: "grey.A200" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        onClick={handleClick}
      >
        {index % 2 === 0 && (
          <CardMedia
            component="img"
            image={img}
            alt={path}
            sx={{ height: "128px", width: "25%" }}
          />
        )}
        <Container>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              align="justify"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {description}
            </Typography>
          </CardContent>
        </Container>
        {index % 2 !== 0 && (
          <CardMedia
            component="img"
            image={img}
            alt={path}
            sx={{ width: "25%" }}
          />
        )}
      </CardActionArea>
    </Card>
  );
};

export default ContentCard;
