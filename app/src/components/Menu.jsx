import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <nav>
        <ul>
            <li>
                <Link to={'/perfiles'}>Perfiles</Link>
            </li>
            <li>
                <Link to={'/imagenes'}>Imagenes</Link>
            </li>
            <li>
                <Link to={'/videos'}>Videos</Link>
            </li>
            <li>
                <Link to={'/configuracion'}>Configuracion</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Menu
