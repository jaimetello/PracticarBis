import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";

import { persona } from "../interfaces.ts";
import { IContext } from "../interfaces.ts";


const journey = async(ctx:IContext)=>{
    try{
        const db: Database = ctx.state.db;
        const personas = db.collection<any>("Personas")
        const coches = db.collection<any>("Coches")
        let a:persona =await ctx.request.body().value
        
        
        if(a.people>6){
            ctx.response.body="Personas mal introducidas"
            ctx.response.status=400
        }else{

           const coche= await coches.findOne({status:false,seats:{$gt:a.people-1}})
               
            console.log(coche)
            if(coche){
            a.idCoche=coche.id
            await coches.updateOne(
                {id:a.idCoche},
                {$set:{status:true}}
            )
            
            await personas.insertOne(a)
            ctx.response.body="OK"
            ctx.response.status=200
            
            }else{
                ctx.response.body="No hay coches disponibles"
                ctx.response.status=404
            }
            
        }

    }catch(e){
        ctx.response.body="Error server"
                ctx.response.status=500
    }
}
export {journey as default}