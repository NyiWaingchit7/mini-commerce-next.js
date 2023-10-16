import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
}

const ProductCard = ({ title, description, imageUrl, price }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 500, p: 3 }}>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          sx={{ width: "40%" }}
          image={imageUrl || ""}
          alt={title}
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2">
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {price} $
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
