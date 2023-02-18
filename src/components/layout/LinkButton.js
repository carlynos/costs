import { Link } from 'react-router-dom'
import style from'./LinkButton.module.css'

export function LinkButton({to, text}) {
  return (
    <Link className={style.btn} to={to}>
        {text}
    </Link>
  );
}

export default LinkButton