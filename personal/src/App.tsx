import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";

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

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}
