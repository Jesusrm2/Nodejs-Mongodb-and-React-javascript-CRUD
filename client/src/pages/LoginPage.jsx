import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm();
 const {singin, errors: siginErrors, isAuthenticated} =useAuth()
  
const navigate = useNavigate()
 const onSubmit= handleSubmit(data =>{
    singin(data);
  })

  useEffect(()=>{
    if(isAuthenticated) navigate("/task");
  }, [isAuthenticated]);

  
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1 className="text-3xl font-bold my-2">Inicio de sesion</h1>
      {
                siginErrors.map((error, i) =>(
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                    </div>
                ))
            }
      <form onSubmit={
                onSubmit
            }>
                <input type="email" {...register("email", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='correo'
                />
                {
                    errors.email && (
                        <p className="text-red-500">
                            Correo es requerido
                        </p>
                    )
                }
                <input type="password" {...register("password", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='contrasenia'
                />
                {
                    errors.password && (
                        <p className="text-red-500">
                            Contrasenia es requerido
                        </p>
                    )
                }
                <button type='submit' className="bg-sky-500 hover:bg-white-600 text-white px-4 py-2 rounded-md">
                    Ingresar
                </button>
            </form>
            <p className="flex gap-x-z justify-between">
              No tienes una cuenta? <Link className="text-sky-500" to="/register">Registrarme</Link>
              </p>
      </div>
    </div>
  )
}

export default LoginPage
