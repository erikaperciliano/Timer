import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export const Defaultlayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}