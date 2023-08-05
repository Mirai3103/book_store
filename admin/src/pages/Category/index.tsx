import { RouteObject } from "react-router-dom";
import CategoryManagementIndexPage from "./Page";

const router: RouteObject[] = [
    {
        path: "/category",
        element: <CategoryManagementIndexPage />,
    },
];

export default router;
