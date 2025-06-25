import { Fragment } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { changeStatus, getTaskById } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTransaletd } from '@/locales/es';
import type { Task } from '@/types/index';


export default function TaskModalDetails() {
    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: changeStatus,
        onError: (errors) =>{
            toast.error(errors.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        let status = e.target.value as Task['status']
        mutate({projectId, taskId, status})
    }

    if(isError){
        toast.error(error.message, {toastId: 'error'})
        return <Navigate to={`/projects/${projectId}`}/>
    }
    const show = taskId ? true : false

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: <span className='font-bold text-black'>{formatDate(data.createdAt)}</span></p>
                                    <p className='text-sm text-slate-400'>Última actualización: <span className='font-bold text-black'>{formatDate(data.updatedAt)}</span></p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: <span>{data.description}</span></p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: 
                                            <span>
                                                <select 
                                                    name="status" 
                                                    id="status"
                                                    className='w-full p-3 bg-white border border-gray-300'
                                                    defaultValue={data.status}
                                                    onChange={handleChange}
                                                >
                                                    {Object.entries(statusTransaletd).map(([key, value]) => (
                                                        <option key={key} value={key}>{value}</option>
                                                    ))}
                                                </select>
                                            </span>
                                        </label> 
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}