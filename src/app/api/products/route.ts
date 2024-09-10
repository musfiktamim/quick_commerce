import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs";
import path from "node:path";

export async function GET(req: Request) {
    
    try{
        const allProducts = await db.select().from(products).orderBy(desc(products.id));
        return Response.json(allProducts)
    }catch(err){
        return Response.json({message:err.message},{status:500})
    }
}
export async function POST(req: Request){
    // todo user authorize
    const data = await req.formData();
    let validatedData;
    try {
        validatedData = productSchema.parse({
            name:data.get("name"),
            description:data.get("description"),
            price:Number(data.get("price")),
            image:data.get("image")
        })
    } catch (error) {
           return Response.json({message:error.message})
    }

    const filename = `${Date.now()}.${validatedData.image.name.split(".").splice(-1)}`;

    try {
        const buffer = Buffer.from(await validatedData.image.arrayBuffer())
        writeFile(path.join(process.cwd(),"public/assets",filename),buffer,(err)=>{
            return Response.json({message:err?.message})
        })
    } catch (error) {
        return Response.json({message:error.message})
    }

    try{
        await db.insert(products).values({...validatedData,image:filename})
    }catch (error){
        return Response.json({message:error.message})
    }


    return Response.json({message:"posted requiest send"},{status:201})
}


