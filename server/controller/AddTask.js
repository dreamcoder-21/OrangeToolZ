"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = void 0;
const typeorm_1 = require("typeorm");
function addTask(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = request.body.name;
        let type_id = Number(request.body.type_id);
        let order = Number(request.body.order);
        if (!name || isNaN(type_id) || isNaN(order)) {
            response.send({
                status: false,
                error_type: 'invalid_arguments',
            });
            return;
        }
        let manager = typeorm_1.getManager();
        let result = yield manager.query(`INSERT INTO tasks (type_id, name, ordering) VALUES (${type_id}, ?, ${order})`, [name]);
        if (result && result.insertId) {
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
    });
}
exports.addTask = addTask;
//# sourceMappingURL=AddTask.js.map