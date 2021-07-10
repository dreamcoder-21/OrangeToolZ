import axios from "axios";
import qs from "qs";

const base_url = "http://localhost:3001/api/";


export const get_tasks_types = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: base_url + "get-tasks-types",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(response => {
            resolve(response.data);
        });
    });
}

export const add_task = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: base_url + "add-task",
            data: qs.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(response => {
            resolve(response.data);
        });
    });
}


export const edit_task = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: base_url + "update-task",
            data: qs.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(response => {
            resolve(response.data);
        });
    });
}
