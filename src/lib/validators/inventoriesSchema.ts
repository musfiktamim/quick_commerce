import {z} from "zod";

export const inventioriesSchema = z.object({
    sku:z.string({message:"SKU should be string"}).length(8,{message:"SKU should be 8 char"}),
    warehouseId:z.number({message:"warehouseId should be number"}),
    productId:z.number({message:"order id should be a number"})
})