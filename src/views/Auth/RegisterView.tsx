import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import {type UserRegisterForm } from "@/types/index"
import Error from "@/components/Error";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export default function RegisterView() {
  
  const initialValues: UserRegisterForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });

  const navigate = useNavigate()

  const password = watch('password');

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) =>{
        toast.error(error.message)
    },
    onSuccess: (data) =>{
        toast.success(data)
        navigate('/auth/login')
    }
  })

  const handleRegister = (formData: UserRegisterForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-white font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10 rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <Error>{errors.email.message}</Error>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            autoComplete="on"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <Error>{errors.name.message}</Error>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            autoComplete="on"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <Error>{errors.password.message}</Error>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            autoComplete="on"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <Error>{errors.password_confirmation.message}</Error>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex space-y-4">
        <Link
            className="mx-auto gap-1 text-white"
            to='/auth/login '
        >
          Ya tienes una cuenta?  <span className="font-bold uppercase cursor-pointer">Inicia Sesión</span>
        </Link>
      </nav>
    </>
  )
}