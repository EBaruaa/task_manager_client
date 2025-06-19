import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import type { ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectById } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectProps = {
    data : ProjectFormData
}

export default function EditProject({data} : EditProjectProps) {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues : {
            projectName : data.projectName,
            clientName : data.clientName,
            description : data.description
        }})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateProjectById,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey: ['projects']})
                queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            navigate('/')
            toast.success(data)
        }
    })

    const handleForm = (formData : ProjectFormData) =>{
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-600 mt-5 text-center">Utilice el siguiente formulario para editar el proyecto</p>
            <nav className="my-4 flex justify-center">
                <Link 
                    className="rounded-lg bg-sky-500 hover:bg-sky-600 cursor-pointer px-10 py-3 text-white text-xl font-semibold transition-colors"
                    to='/'
                >
                Volver a Proyectos
                </Link>
            </nav>

            <form action=""
                className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />

                <input type="submit" 
                    value='Guardar cambios'
                    className="bg-sky-600 w-full mt-2 p-3 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors rounded-lg"
                />
            </form>
        </div>
            
    </>
  )
}
