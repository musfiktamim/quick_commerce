import { db } from "@/lib/db/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req:Request,{params}:{params:{id:String}}) {
    const id = params.id
    const product = await db.select().from(products).where(eq(products.id,Number(id))).limit(1)
    if(product.length!=0){
        return Response.json(product[0])
    }else{
        return Response.json({message:"product not found"},{status:400})
    }
}