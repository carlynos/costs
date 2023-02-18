import { useLocation } from "react-router-dom";
import Message from "../components/layout/Message";
import Container from "../components/layout/Container";
import LinkButton from "../components/layout/LinkButton";
import Loading from '../components/layout/Loading'

import style from "./Projects.module.css"
import { useEffect, useState } from "react";
import ProjectCard from "../project/ProjectCard";


export function Projects() {

  const location = useLocation()
  const [project, setProject] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  let message = ''
   
  if(location.state){
      message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      
    
    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setProject(data)
      setRemoveLoading(true)
    })
    .catch((err) => console.log(err))

  }, 500);

  }, [])

  return (
    <div className={style.project_container}>
      <div className={style.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
        
        {message && ( <Message type="success" msg={message} /> )}
        <Container customClass="start">
         {project.length > 0 && project.map((project) => (
         <ProjectCard 
          id={project.id}
          name={project.name}
          budget={project.budget}
          category={project.category.name}
          key={project.id}
         />))}
         {
          !removeLoading && <Loading />
         }
         {removeLoading && project.length === 0 && (<p>Não há projetos cadastrados</p>)}
        </Container>
        
    </div>
  );
}

export default Projects