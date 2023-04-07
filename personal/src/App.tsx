import BlogList from "./components/BlogList";
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import "./css/root.css";

export default function App() {
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

const Root = () => {
    return (
        <div className="root">
            <Outlet />
            <SideBar />
        </div>
    );
};
