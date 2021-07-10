import { Request, Response } from "express";
import { getManager } from "typeorm";


export async function addTask( request: Request, response: Response ) {
    let name = request.body.name;
    let type_id = Number(request.body.type_id);
    let order = Number(request.body.order);

    if(!name || isNaN(type_id) || isNaN(order)) {
        response.send({
            status: false,
            error_type: 'invalid_arguments',
        });
        return;
    }
    
    let manager = getManager();
    let result = await manager.query(`INSERT INTO tasks (type_id, name, ordering) VALUES (${type_id}, ?, ${order})`, [name]);

    if(result && result.insertId) {
        response.send({
            status: true,
            data: {
                id: result.insertId,
                type_id,
                name,
                ordering: order,
            },
        });
        return;
    }

    response.send({
        status: false,
        error_type: "server_error",
    });
}
