import { Request, Response } from "express";
import { getManager } from "typeorm";


export async function editTask( request: Request, response: Response ) {
    let task_id = Number(request.body.task_id);
    let type_id = Number(request.body.type_id);
    let order = Number(request.body.order);

    if(isNaN(task_id) || isNaN(type_id) || isNaN(order)) {
        response.send({
            status: false,
            error_type: 'invalid_arguments',
        });
        return;
    }
    
    let manager = getManager();
    let result = await manager.query(`UPDATE tasks SET type_id = ${type_id}, ordering = ${order} WHERE id = ${task_id}`);

    if(result) {
        response.send({
            status: true,
        });
        return;
    }

    response.send({
        status: false,
        error_type: "server_error",
    });
}
