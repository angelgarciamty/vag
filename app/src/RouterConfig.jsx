import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Imagenes from "./pages/Imagenes";
import Videos from "./pages/Videos";
import EjemploModal from "./components/modals/EjemploModificarModal";
import EjemploAddModal from "./components/modals/EjemploAddModal";

const RouterConfig = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                path: 'imagenes',
                element: <Imagenes />,
                children:[
                  {
                    path:'modal',
                    element:<EjemploModal/>
                  },
                  {
                    path:"add",
                    element:<EjemploAddModal/>
                  }
                ]

            },
            {
                path: 'videos',
                element: <Videos />,
            },
        ],
    }
]);

export default RouterConfig;