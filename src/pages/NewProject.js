import { useHistory, useNavigate } from 'react-router-dom'
import Container from "../components/layout/Container";
import { ProjectForm } from "../project/ProjectForm";
import style from './NewProject.module.css'


export function NewProject() {

  const navigate = useNavigate();



  function createPost(project){
    project.cost = 0
    project.services = []

    //console.log(project)

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      return navigate('/Projects', { state: {message: 'Projeto criado com sucesso'}})
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={style.newproject_container}>
      <h1>Criar novo projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} textbtn="Criar Projeto" />
    </div>
  );
}

export default NewProject