import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
    useRouteError,
} from "react-router-dom";

import BlogArticle from "./components/BlogArticle";
import BlogList from "./components/BlogList";
import Home from "./components/Home";
import SideBar from "./components/SideBar";

import "./css/root.css";

export default function App() {
    const Root = () => {
        return (
            <div className="root">
                <SideBar/>
                <Outlet/>
            </div>
        );
    };

    const ErrorBoundaryHome = () => {
        const error = useRouteError();
        console.error("Couldn't load WebGL properly:", error);
        return (
            <div style={{display: "flex", alignItems: "center"}}>
                There was an error with WebGL. See web console for more details.
            </div>
        );
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />} >
                <Route index element={<Home />} errorElement={<ErrorBoundaryHome/>}/>
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog:contentUrl" element={<BlogArticle />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}
