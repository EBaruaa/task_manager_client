import api from "@/lib/axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData) {
    try {
        const { data } = await api.post('/projects/new', formData)
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function getAllProjects() {
    try {
        const { data } = await api('/projects')
        const result = dashboardProjectSchema.safeParse(data.data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}
export async function getProjectById(id : Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        return(data.data)
    } catch (error) {
        console.log(error)
    }
}

type ProjectAPIType ={
    formData : ProjectFormData
    projectId : Project['_id']
}
export async function updateProjectById({formData, projectId} : ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function deleteProjectById(projectId : Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}