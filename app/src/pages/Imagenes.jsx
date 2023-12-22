import Header from "../components/Header"
import { Link } from "react-router-dom"
import { Button } from "@mui/joy"
import { Outlet } from "react-router-dom"
import ListArchivos from "../components/ListArchivos"

const Imagenes = ({}) => {
  return (
    <>
        <Header>
            <h2>Imagenes</h2>
            <Link to={'./modal'}><Button variant="solid">Dashboard</Button></Link>
        </Header>
        <main>
          <ListArchivos></ListArchivos>
        </main>
        <Outlet></Outlet>
    </>
  )
}

export default Imagenes
