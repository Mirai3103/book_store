import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import BookManagementIndexPage from "../pages/Book";
import CategoryManagementIndexPage from "@/pages/Category";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <h1>Home</h1>,
            },
            {
                path: "/book",
                element: <BookManagementIndexPage />,
            },
            {
                path: "/category",
                element: <CategoryManagementIndexPage />,
            },
        ],
    },
];

const Router = createBrowserRouter(routes);

export default Router;
