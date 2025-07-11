import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/ModalDetail"

export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const {data, isLoading, isError} = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId)
    })
    if(isLoading){return 'Cargandoo...'}
    if(isError){return <Navigate to='/404'/>}
    if(data) return (
      <>
        <h1 className="text-5xl font-bold">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-600 transition-colors px-10 py-3 text-white text-xl cursor-pointer rounded-lg"
            onClick={() => navigate(location.pathname +   '?newTask=true')}
          >
            Agregar tarea
          </button>
        </nav>

        <TaskList
          tasks={data.tasks}
        />
        <AddTaskModal/>
        <EditTaskData/>
        <TaskModalDetails/>
      </>
    )
}
