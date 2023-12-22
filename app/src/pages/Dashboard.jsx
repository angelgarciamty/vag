import Header from "../components/Header"
import Gallery from "../components/Gallery"
import { Button} from "@mui/joy"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
        <Header>
            <h2>Dashboard</h2>
            <Link to={'./modal'}><Button variant="solid">Dashboard</Button></Link>
        </Header>
        <main>
            <Gallery>

            </Gallery>
        </main>
        
    </>
  )
}

export default Dashboard
