import {Link} from 'react-router-dom'

import logo from '../../img/costs_logo.png'
import Container from './Container';
import style from './Navbar.module.css'

export function Navbar() {
  return (
    <nav className={style.navbar}>
        <Container customClass="min-height">
            <Link to="/"><img src={logo} alt="Costs" /></Link>
            <ul className={style.list}>
                <li className={style.item}><Link to="/">Home</Link></li>
                <li className={style.item}><Link to="/contact">Contact</Link></li>
                <li className={style.item}><Link to="/company">company</Link></li>
                <li className={style.item}><Link to="/projects">Project</Link></li>
            </ul>
            
            
            
            
        </Container>
      
    </nav>
  );
}

export default Navbar