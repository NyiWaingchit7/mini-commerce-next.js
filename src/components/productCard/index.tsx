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
    <Card
      sx={{
        maxWidth: 300,
        minHeight: { lg: 500, md: 450 },
        maxHeight: { xs: 350 },
        p: 3,
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          sx={{ width: { lg: "100px", xs: "70px" }, objectFit: "contain" }}
          image={imageUrl || ""}
          alt={title}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ fontSize: { xs: "0.7rem" } }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ fontSize: { xs: "0.5rem" } }}
          >
            {description.substring(0, 150)} ...
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
