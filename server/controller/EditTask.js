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
exports.editTask = void 0;
const typeorm_1 = require("typeorm");
function editTask(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let task_id = Number(request.body.task_id);
        let type_id = Number(request.body.type_id);
        let order = Number(request.body.order);
        if (isNaN(task_id) || isNaN(type_id) || isNaN(order)) {
            response.send({
                status: false,
                error_type: 'invalid_arguments',
            });
            return;
        }
        let manager = typeorm_1.getManager();
        let result = yield manager.query(`UPDATE tasks SET type_id = ${type_id}, ordering = ${order} WHERE id = ${task_id}`);
        if (result) {
            response.send({
                status: true,
            });
            return;
        }
        response.send({
            status: false,
            error_type: "server_error",
        });
    });
}
exports.editTask = editTask;
//# sourceMappingURL=EditTask.js.map