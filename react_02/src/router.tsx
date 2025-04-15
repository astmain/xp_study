// import { createBrowserRouter, createHashRouter, createMemoryRouter, createStaticRouter } from "react-router";
import { createBrowserRouter } from "react-router";
import About from './pages/About';
import Home from './pages/Home';
import layout from './layout/layout';



const router = createBrowserRouter([
    // const router = createHashRouter([
    // const router = createMemoryRouter([
    {
        path: "/",
        // path: "/index",
        Component: layout, //父路由可以省略path
        //子路由不需要加/
        children: [
            {
                path: "Home",
                index: true,
                Component: Home,

            },
            { path: "About", Component: About },
        ]
    },
    // {
    //     path: "/about",
    //     Component: About,
    // },

])

export default router
