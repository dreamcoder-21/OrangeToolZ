import { getTasksTypes } from "./controller/GetTasksTypes";
import { addTask } from "./controller/AddTask";
import { editTask } from "./controller/EditTask";


/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/api/get-tasks-types", // get all types & tasks
        method: "post",
        action: getTasksTypes,
    },
    {
        path: "/api/add-task",
        method: "post",
        action: addTask,
    },
    {
        path: "/api/update-task", // update task type with ordering
        method: "post",
        action: editTask,
    },
];
