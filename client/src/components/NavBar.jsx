import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function NavBar() {

    const { isAuthenticated , logout} = useAuth();
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={
                isAuthenticated ? '/task' : '/'
            }>
                <h1 className="text-2xl font-bold">Manejo de tareas</h1>
            </Link>

            <ul className="flex gap-x-2">
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                <Link>Bienvenido</Link>
                            </li>
                            <li>
                                <Link to="/add-task"
                                  className="bg-indigo-500 px-4 py-1 rounded-sm "
                                  >Aniadir tarea</Link>
                            </li>
                            <li>
                                <Link to="/task"
                                  className="bg-indigo-500 px-4 py-1 rounded-sm "
                                  >Tareas</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={() => {
                                    logout();
                                }}>Salir</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" 
                                    className="bg-indigo-500 px- 4 py-1 rounded-sm "
                                >Iniciar sesion</Link>
                            </li>
                            <li>
                                <Link to="/register"
                                  className="bg-indigo-500 px- 4 py-1 rounded-sm "
                                  >Registrar</Link>
                            </li>
                        </>
                    )

                }


            </ul>
        </nav>
    )
}

export default NavBar
