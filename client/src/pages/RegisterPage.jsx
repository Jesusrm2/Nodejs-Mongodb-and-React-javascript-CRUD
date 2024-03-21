import { useForm } from 'react-hook-form';
//import { registerRequest } from '../api/auth';
import { useAuth  } from '../context/AuthContext';
import { useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom'

function RegisterPage() {

    const { register, handleSubmit, formState:{
        errors
    } } = useForm();
    const {singup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigation = useNavigate()
     
    useEffect(()=>{
        if (isAuthenticated) navigation('/task')
    },[isAuthenticated])

    const funcionOnSumit = handleSubmit(async (values) => {
        singup(values);
    })
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">

<div className="bg-zinc-800 maz-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) =>(
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={
                funcionOnSumit
            }>
                <h1 className="text-3xl font-bold my-2">Registro</h1>
                <input type="text" {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='Usuario'
                />
                {
                    errors.username && (
                        <p className="text-red-500">
                            Usuario es requerido
                        </p>
                    )
                }
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
                    Registrar
                </button>
            </form>
            <p className="flex gap-x-z justify-between">
              Ya tienes una cuenta? <Link className="text-sky-500" to="/login">Inicia sesion</Link>
              </p>
        </div>
        </div>

       
    )
}

export default RegisterPage