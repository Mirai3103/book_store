import { RouteObject } from "react-router-dom";
import AuthorManagementIndexPage from "./Page";

const router: RouteObject[] = [
    {
        path: "/author",
        element: <AuthorManagementIndexPage />,
    },
];

export default router;
