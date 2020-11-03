import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";
import { Context, helpers } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { IContext } from "../interfaces.ts";


const locate =async(ctx:IContext)=>{

    try{
        
        const db: Database = ctx.state.db;
        
        const { id } = helpers.getQuery(ctx, { mergeParams: true });
       
        const personas = db.collection<any>("Personas")
        
        const coches = db.collection<any>("Coches")
        
        
        const persona = await personas.findOne({id:Number(id)})
       if(persona){
            let a=await coches.find({id:persona.idCoche}).limit(1) //-> array de 1 de capacidad
            a=a.map((elem)=>{
                delete elem["_id"]
                return{
                    ...elem
                }
            })
            ctx.response.body=a
        
         
       }else{
           ctx.response.body="No hay persona"
           ctx.response.status=400
       }
       

    }catch(e){

    }
}

export {locate as default}