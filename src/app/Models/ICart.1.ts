import { IOrderProducts } from "./IOrderProducts";

export interface ICart {
  id: number;
  checkOutDate: string;
  totalPrice: number;
  quantity: number;
  status: string;
  userId: string;
  orderProducts:IOrderProducts[]
}
