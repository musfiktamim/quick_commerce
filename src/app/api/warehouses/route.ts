import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehousesSchema } from "@/lib/validators/warehousesSchema";
import { desc } from "drizzle-orm";

export async function GET(req: Request){
    try{
        const warehousess = await db.select().from(warehouses).orderBy(desc(warehouses.id))
        return Response.json(warehousess)
    }catch (error){
        return Response.json({message:error.message},{status:500})
    }
}

export async function POST(req: Request){
    const data = await req.json();
    console.log(data)
    let validatedData;
    try {
        validatedData = warehousesSchema.parse({
            name:data.name,
            pincode:data.pincode
        })
    } catch (error) {
        return Response.json({message:error.message})
    }

    try {
        await db.insert(warehouses).values(validatedData)
    } catch (error) {
        return Response.json({message:error.message},{status:500})
    }

    return Response.json({"message":"OK"},{status:201})
}