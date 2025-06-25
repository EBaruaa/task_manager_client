import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {taskSchema, type Project, type Task, type  TaskFormData } from "../types";

type TaskAPIType = {
    formData : TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId} : Pick<TaskAPIType, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/create/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getTaskById({projectId, taskId} : Pick<TaskAPIType, 'projectId' | 'taskId'>) {
   try {
        const url = `/projects/${projectId}/task/${taskId}`
        const {data} = await api(url)
        const result = taskSchema.safeParse(data)
        if(result.success){
            return result.data
        }
   } catch (error) {
        if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
        }
   }
}
export async function editTaskById({projectId, taskId, formData} : Pick<TaskAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
        }
    }
}
export async function deletTaskById({projectId, taskId} : Pick<TaskAPIType, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function changeStatus({projectId, taskId, status} : Pick<TaskAPIType, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/status`
        const { data } = await api.post(url, {status})
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }    
}