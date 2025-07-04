import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

export default function AppLayout() {
  return (
    <>
       <header className="bg-blue-400 py-5">
            <div className="max-w-screen-2xl flex mx-auto flex-col md:flex-row justify-between items-center">
                <div className="w-64">
                    <Link
                        to='/'
                    >
                        <Logo/>
                    </Link>
                </div>
                <div>
                    <NavMenu/>
                </div>
            </div>
       </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet/>
        </section>

        <footer className="py-5">
            <p className="text-center text-sm font-bold">
                Todos los derechos reservados {new Date().getFullYear()}
            </p>

        </footer>

        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
