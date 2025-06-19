import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {type Project, type  TaskFormData } from "../types";

type TaskAPIType = {
    formData : TaskFormData
    projectId: Project['_id']
}

export async function createTask({formData, projectId} : Pick<TaskAPIType, 'formData' | 'projectId'>) {
    try {
        const url = `/${projectId}/create/tasks`
        const { data } = await api.post<string>(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}