import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import LinkButton from '../components/layout/LinkButton';
import Loading from '../components/layout/Loading';
import Style from './Project.module.css'

export function Project() {
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((resp) =>resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch((err) => console.log(err))
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
  return (
    <>
    {project.name ? 
    <div className={Style.project_details}>
        <Container customClass="column">
            <div className={Style.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={Style.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
            
            {!showProjectForm ? (
                <div className={Style.project_info}>
                    <p>
                        <span>Categoria:</span> {project.category.name}
                    </p>
                    <p>
                        <span>Total de Orçamento:</span> R$ {project.budget}
                    </p>
                    <p>
                        <span>Total Utilizado:</span> R$ {project.cost}
                    </p>
                </div>
            ) : (<div className={Style.project_info}>asd</div>)}
            </div>
        </Container>
    </div> : <Loading />}
    </>
  );
}

export default Project