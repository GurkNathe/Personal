import {
    createHashRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider
} from "react-router-dom";

import AboutMe from "./components/AboutMe";
import BlogArticle, { articleTextLoader } from "./components/BlogArticle";
import BlogList, { articleLoader } from "./components/BlogList";
import Home, { Donut } from "./components/Home";
import Error404 from "./components/404";
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

    const routes = createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route index path="/" element={<Home />} errorElement={<Donut/>}/>
            <Route path="/about-me" element={<AboutMe />}/>
            <Route path="/blog" element={<BlogList />} loader={articleLoader}/>
            <Route path="/blog/:contentUrl/article" element={<BlogArticle />} loader={({ params }) => articleTextLoader(params.contentUrl)} />
            <Route path="*" element={<Error404/>}/>
        </Route>
    );

    const router = createHashRouter(
        routes
    );

    return <RouterProvider router={router} />;
}
