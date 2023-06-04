import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AppSidebarItems from "../Utils/Constant";

export default function Layout() {
    return (
        <>
            <Header />
            <Sidebar sidebarGroups={AppSidebarItems} />

            <div className="p-8 sm:ml-64 bg-base-100 mt-14">
                <Outlet />
            </div>
        </>
    );
}
