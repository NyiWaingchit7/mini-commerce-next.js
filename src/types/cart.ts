import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface CreateOrderOption extends BaseOption {
  payload: CartItem[];
}
export interface CancelOrderOption extends BaseOption {
  orderId: string;
}
