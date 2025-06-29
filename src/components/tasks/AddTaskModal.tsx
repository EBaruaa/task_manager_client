import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskForm from './TaskForm';
import type { TaskFormData } from '@/types/index';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';


export default function AddTaskModal()  {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const queryParam = new URLSearchParams(location.search)
    const modalTask = queryParam.get('newTask')
    const show = modalTask ? true : false

    const projectId = params.projectId!

    const initialValues : TaskFormData = {
        name : '',
        description: ''
    }
    const {register, reset, handleSubmit, formState : {errors}} = useForm({defaultValues : initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey : ['editProject', projectId]})
            toast.success(data)
            reset()
            navigate(`/projects/${projectId}`)
        }
    })

    const handleCreateTask = (formData : TaskFormData) =>{
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {navigate(location.pathname, {replace: true})}}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-sky-600">una tarea</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >

                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit"
                                            value='Generar Tarea'
                                            className='bg-sky-600 w-full mt-2 p-3 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors rounded-lg'
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}