import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
        <div className="bg-blue-400 min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
                <div className="w-54 h-44 mx-auto">
                    <Logo/>
                </div>
                <div className="mt-10">
                    <Outlet/>
                </div>
            </div>
        </div>

        
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
