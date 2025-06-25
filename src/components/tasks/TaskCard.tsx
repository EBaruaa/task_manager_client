import type { Task } from "@/types/index"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment } from "react/jsx-runtime"
import { deletTaskById } from "@/api/TaskAPI"
import { toast } from "react-toastify"

type TaskCardProps ={
    task : Task
}
export default function TaskCard({task} : TaskCardProps) {
    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!
    const { mutate } = useMutation({
        mutationFn: deletTaskById,
        onError: (errors) => {
            toast.error(errors.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({ queryKey : ['editProject', projectId]})
            toast.success(data)
        }
    })
    const navigate = useNavigate()

  return (
    <li className="flex p-5 bg-white border border-slate-300 justify-between gap-3 rounded-lg">
        <div className="min-w-0 flex flex-col gap-y-4">
            <button
                type="button"
                className="text-xl font-bold text-slate-600 text-left"
            >
                {task.name}
            </button>
            <p className="text-slate-500 text-left">{task.description}</p>
        </div>
        <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </MenuButton>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <MenuItems
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                            <button 
                                type='button' 
                                className='w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-200 transition-colors'
                                onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                            >
                                Ver Tarea
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button 
                                type='button' 
                                className='w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-200 transition-colors'
                                onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                            >
                                Editar Tarea
                            </button>
                        </MenuItem>
        
                        <MenuItem>
                            <button type='button' 
                                className='w-full text-left px-3 py-1 text-sm leading-6 text-red-500 hover:font-bold transition'
                                onClick={() => mutate({projectId, taskId : task._id})}
                                >
                                Eliminar Tarea
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    </li>
  )
}
