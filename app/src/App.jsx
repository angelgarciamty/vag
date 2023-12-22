import "./assets/css/app.css"
import Menu from './components/Menu'
import { Routes,Route,Outlet} from 'react-router-dom'
import { ThemeProvider, extendTheme} from '@mui/joy';
import Dashboard from './pages/Dashboard'
import Perfiles from './pages/Perfiles'
import Imagenes from './pages/Imagenes'
import Videos from './pages/Videos'
import Configuracion from './pages/Configuracion'
import Logo from './components/Logo'
import { ModalProvider } from "./context/ModalContext";

const theme = extendTheme({
  fontFamily: {
    display: 'Lato', // applies to `h1`–`h4`
    body: 'Lato', // applies to `title-*` and `body-*`
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <aside>
          <Logo/>
          <Menu/>
        </aside>
        <ModalProvider>
          <div id="contenido">
              <Outlet></Outlet>
          </div>
        </ModalProvider>
    </ThemeProvider>

  )
}

export default App
