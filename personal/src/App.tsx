import {
    createHashRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
    useRouteError,
} from "react-router-dom";

import AboutMe from "./components/AboutMe";
import BlogArticle, { articleTextLoader } from "./components/BlogArticle";
import BlogList, { articleLoader } from "./components/BlogList";
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

    // TODO: Better visual when no WebGL
    const ErrorBoundaryHome = () => {
        const error = useRouteError();
        console.error("Couldn't load WebGL properly:", error);
        return (
            <div style={{display: "flex", alignItems: "center"}}>
                There was an error with WebGL. See web console for more details.
            </div>
        );
    };

    const routes = createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route index path="/" element={<Home />} errorElement={<ErrorBoundaryHome/>}/>
            <Route path="/about-me" element={<AboutMe />}/>
            <Route path="/blog" element={<BlogList />} loader={articleLoader}/>
            <Route path="/blog/:contentUrl/article" element={<BlogArticle />} loader={({ params }) => articleTextLoader(params.contentUrl)} />
        </Route>
    );

    const router = createHashRouter(
        routes
    );

    return <RouterProvider router={router} />;
}
