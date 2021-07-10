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
exports.getTasksTypes = void 0;
const typeorm_1 = require("typeorm");
function getTasksTypes(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let manager = typeorm_1.getManager();
        let task_types = yield manager.query("SELECT id, name FROM task_type ORDER BY ordering ASC");
        let tasks = yield manager.query("SELECT id, type_id, name, ordering FROM tasks ORDER BY ordering ASC");
        response.send({
            status: true,
            task_types,
            tasks,
        });
    });
}
exports.getTasksTypes = getTasksTypes;
//# sourceMappingURL=GetTasksTypes.js.map