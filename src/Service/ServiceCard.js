import style from "../project/ProjectCard.module.css"

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from "react-router-dom";

export function ServiceCard({id, key, name, cost, description, handleRemove}) {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }
  return (
    <div className={style.project_card}>
        <h4>{name}</h4>
        <p>
            <span>Custo total:</span> R${cost}
        </p>
        <p>
            {description}
        </p>
        <div className={style.project_card_actions}>
            <button onClick={remove}><BsFillTrashFill /> Excluir</button>
        </div>
    </div>
  );
}

export default ServiceCard