import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

import AboutMe from "./components/AboutMe";
import BlogArticle, { articleTextLoader } from "./components/BlogArticle";
import BlogList, { articleLoader } from "./components/BlogList";
import Home, { Donut } from "./components/Home";
import Error404 from "./components/404";
import RSSFeed from "./components/RSSFeed";
import Test from "./components/Test";

import "./css/root.css";

export default function App() {
    const routes = createRoutesFromElements(
        <Route path="/">
            <Route index path="/" element={<Home />} errorElement={<Donut />}/>
            <Route path="/about-me" element={<AboutMe />}/>
            <Route path="/blog" element={<BlogList />} loader={articleLoader}/>
            <Route path="/blog/:contentUrl/article" element={<BlogArticle />} loader={({ params }) => articleTextLoader(params.contentUrl)} />
            <Route path="/rss" element={<RSSFeed/>} loader={articleLoader}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="*" element={<Error404 />}/>
        </Route>
    );

    return <RouterProvider router={createHashRouter(routes)} />;
}
