import Products from "@/components/products";
import SearchProduct from "@/components/searchProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { Box, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
    }
  }, [products]);
  if (!products) return null;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/cart"} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: 3,
            cursor: "pointer",
          }}
        >
          <AddShoppingCartIcon sx={{ fontSize: 50, color: "purple" }} />
          {cartItems.length > 0 && (
            <Typography variant="h5" sx={{ color: "green" }}>
              {cartItems.length}
            </Typography>
          )}
        </Box>
      </Link>
      <SearchProduct
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <Products products={filteredProducts} />
    </Box>
  );
}
