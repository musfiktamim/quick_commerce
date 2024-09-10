import { z } from "zod";

export const warehousesSchema = z.object({
    name:z.string({message:"warehouse name should be a text"}),
    pincode:z.string({message:"Pincode should be a text"}).length(6)
})