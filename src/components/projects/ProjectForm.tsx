import type { ProjectFormData } from "types";
import Error from "../Error";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";

type ProjectFormProps = {
    register : UseFormRegister<ProjectFormData>
    errors : FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors} : ProjectFormProps) {
  return (
    <>
        <div>
            <label 
                htmlFor="projectName"
                className="text-sm uppercase font-bold"
            >
                Nombre del Proyecto
            </label>
            <input type="text" 
                id="projectName"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Nombre del Proyecto"
                {...register('projectName', {
                    required: 'El nombre del Proyecto es obligatorio'
                })}
            />
            {errors.projectName && (
                <Error>{errors.projectName.message}</Error>
            )}
        </div>
        <div>
            <label 
                htmlFor="clientName"
                className="text-sm uppercase font-bold"
            >
                Nombre del Cliente
            </label>
            <input type="text" 
                id="clientName"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Nombre del Cliente"
                {...register('clientName', {
                    required: 'El nombre del Cliente es obligatorio'
                })}
            />
            {errors.clientName && (
                <Error>{errors.clientName.message}</Error>
            )}
        </div>
        <div>
            <label 
                htmlFor="description"
                className="text-sm uppercase font-bold"
            >
                Descripción
            </label>
            <textarea
                id="description"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Descripción"
                {...register('description', {
                    required: 'La Descripción del proyecto es obligatoria'
                })}
            />
            {errors.description && (
                <Error>{errors.description.message}</Error>
            )}
        </div>
    </>
  )
}
