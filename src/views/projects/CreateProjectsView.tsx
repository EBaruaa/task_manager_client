import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectsView() {
    const navigate = useNavigate()
    const initialValues : ProjectFormData = {
        projectName : "",
        clientName : "",
        description : ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues : initialValues})

    const mutation = useMutation({
        mutationFn: createProject,
        onError: () =>{

        },
        onSuccess: (data) =>{
            navigate('/')
            toast.success(data)
        }
    })
    const handleForm = async (formData : ProjectFormData) =>{
        await mutation.mutateAsync(formData)

    }
  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-600 mt-5 text-center">Completa el siguiente formulario para crear un proyecto</p>
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
                    value='Crear Proyecto'
                    className=" bg-sky-500 w-full mt-2 p-3 text-white uppercase font-bold hover:bg-sky-600 cursor-pointer transition-colors rounded-lg"
                />
            </form>
        </div>
            
    </>
  )
}
