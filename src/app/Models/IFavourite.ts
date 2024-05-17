import { IProduct } from "./IProduct";

export interface IFavourite 
{
    productId : number ,
    userId : string,
    product : IProduct
}