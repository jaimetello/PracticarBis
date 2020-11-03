import { Context } from "https://deno.land/x/oak@v6.3.1/mod.ts";

export interface coches{
    id:number,
    seats:number,
    status:boolean
}

export interface persona{
    id:number,
    people:number,
    idCoche:number
}
export type IContext = Context<Record<string, any>>