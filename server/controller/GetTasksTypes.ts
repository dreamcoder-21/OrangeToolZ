import { Request, Response } from "express";
import { getManager } from "typeorm";


export async function getTasksTypes( request: Request, response: Response ) {
    let manager = getManager();
    
    let task_types = await manager.query("SELECT id, name FROM task_type ORDER BY ordering ASC");
    let tasks = await manager.query("SELECT id, type_id, name, ordering FROM tasks ORDER BY ordering ASC");
    
    response.send({
        status: true,
        task_types,
        tasks,
    });
}
