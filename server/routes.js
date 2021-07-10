"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const GetTasksTypes_1 = require("./controller/GetTasksTypes");
const AddTask_1 = require("./controller/AddTask");
const EditTask_1 = require("./controller/EditTask");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/api/get-tasks-types",
        method: "post",
        action: GetTasksTypes_1.getTasksTypes,
    },
    {
        path: "/api/add-task",
        method: "post",
        action: AddTask_1.addTask,
    },
    {
        path: "/api/update-task",
        method: "post",
        action: EditTask_1.editTask,
    },
];
//# sourceMappingURL=routes.js.map