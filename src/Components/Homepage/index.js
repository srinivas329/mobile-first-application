import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = (props) => {
    const {jokesData} = props 
    const {joke} = jokesData
    console.log(joke)

    return(
    
        <li className="list-item">{joke}</li>
    
)
    }
export default Homepage