import { useForm } from "react-hook-form";
import {type UserLoginForm } from "@/types/index";
import Error from "@/components/Error";
import { Link } from "react-router-dom";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = (formData: UserLoginForm) => { 

  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="theTask@theTask.com"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
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
          >Password</label>

          <input
            type="password"
            placeholder="Su contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <Error>{errors.password.message}</Error>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-cyan-600 hover:bg-cyan-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        />
      </form>
      <nav className="mt-10 flex space-y-4">
        <Link
            className="mx-auto gap-1 text-white"
            to='/auth/register'
        >
          Aún no tienes una cuenta?  <span className="font-bold uppercase cursor-pointer">crear una</span>
        </Link>
      </nav>
    </>
  )
}