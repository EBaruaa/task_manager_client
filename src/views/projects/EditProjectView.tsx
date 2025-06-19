import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import EditProject from "@/components/projects/EditProject"

export default function EditProjectView() {

    const params = useParams()
    const projectId = params.projectId!

    const {data, isLoading, isError} = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId)
    })

    if(isLoading){return 'Cargandoo...'}
    if(isError){return <Navigate to='/404'/>}
    if(data){return <EditProject
        data={data}
    />}
}
