import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const productId = Number(router.query.id);
  const products = useAppSelector((state) => state.products.items);
  const product = products.find((product) => product.id === productId);
  const dispatch = useAppDispatch();

  if (!product) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",

        mt: 13,
      }}
    >
      <Box
        sx={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 900,
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box sx={{ maxWidth: { xs: 100, md: 200, lg: 300 } }}>
              <img src={product?.imageUrl || ""} width={"100%"} />
            </Box>
            <Box sx={{ ml: 5 }}>
              <Typography variant="h4">{product?.title}</Typography>
              <Typography sx={{ my: 2 }}>{product?.description}</Typography>
              <Typography variant="h5">$ {product?.price}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(addToCart({ ...product, quantity: 1 }));
              router.push("/");
            }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
