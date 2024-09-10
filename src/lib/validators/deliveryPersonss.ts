import { string, z } from "zod";

export const deliveryPersonss = z.object({
    name:z.string({message:"name should be text"}),
    phone:z.string({message:"phone must be required"}),
    warehouseId:z.number({message:"warehouse_id should be number"})
})