/* eslint-disable react/jsx-key */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  createOrder,
  updateQuantity,
} from "@/store/slices/cartSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import router from "next/router";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const getCartTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const increaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const onSuccess = (data: any) => {
    router.push(`/comfirmation?orderId=${data.orderId}&status=${data.status}`);
    dispatch(clearCart({}));
  };

  const onError = () => {};
  const handleCreateOrder = () => {
    dispatch(createOrder({ payload: cartItems, onSuccess, onError }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        {cartItems.length ? (
          <Box>
            <Box>
              <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
                Here is your cart list
              </Typography>
              {cartItems.map((item) => (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: { xs: "column", lg: "row" },
                      mt: { xs: 15, md: 10, lg: 5 },
                      mb: { xs: 15, md: 15, lg: 10 },
                      maxHeight: 100,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={item.imageUrl || ""} width={100} />
                        <Box sx={{ ml: 3 }}>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography variant="h6">{item.price} $</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ ml: 5 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <RemoveCircleOutlineIcon
                          sx={{
                            fontSize: 40,
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            decreaseQuantity(item.id, item.quantity - 1)
                          }
                        />
                        <Typography sx={{ mx: 2 }} variant="h4">
                          {item.quantity}
                        </Typography>
                        <AddCircleOutlineIcon
                          sx={{
                            fontSize: 40,
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            increaseQuantity(item.id, item.quantity + 1)
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <div
                    style={{
                      maxWidth: "1100px",
                      height: "1px",
                      backgroundColor: "black",
                      margin: "auto",
                    }}
                  ></div>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography variant="h4" sx={{ color: "red" }}>
            Empty cart
          </Typography>
        )}
      </Box>

      {cartItems.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Typography variant="h4">
              Total price: {getCartTotalPrice()} $
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "fit-content", my: 3 }}
              onClick={handleCreateOrder}
            >
              Confirm order
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
