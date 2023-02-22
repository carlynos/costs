import {parse, v4 as uuidv4} from 'uuid'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import LinkButton from '../components/layout/LinkButton';
import Loading from '../components/layout/Loading';
import Message from '../components/layout/Message';
import ProjectForm from '../project/ProjectForm'
import { ServiceForm } from '../Service/ServiceForm';
import ServiceCard from '../Service/ServiceCard';
import Style from './Project.module.css'

export function Project() {
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((resp) =>resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
    }, [id])

    function createService(project){

        setMessage(false);
        

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setMessageType('error');
            project.services.pop()
            return false
        }

        // add service cost to project total cost

        project.cost = newCost

        //update Project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) =>resp.json())
        .then((data) => {
            setProject(data)
            setShowServiceForm(false)
            setMessage('Serviço adicionado com sucesso!')
            setMessageType('success');
        })
        .catch((err) => console.log(err))



    }

    function removeService(){

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project){
        setMessage('sem info')
        //budget validation
        if(project.budget < project.cost){
            setMessage('Orçamento não pode ser menor que o valor alocado!')
            setMessageType('error');
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) =>resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado com sucesso!')
            setMessageType('success');
        })
        .catch((err) => console.log(err))

    }
  return (
    <>
    {project.name ? 
    <div className={Style.project_details}>
        <Container customClass="column">
            {message && <Message type={messageType} msg={message} />}
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
            ) : (<div className={Style.project_info}><ProjectForm handleSubmit={editPost} textbtn="Concluir edição" projectData={project} /></div>)}
            </div>
            <div className={Style.service_form_container}>
                <h2>Adicione um serviço:</h2>
                <button className={Style.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                <div className={Style.project_info}>
                    {showServiceForm && (<ServiceForm
                        handleSubmit={createService}
                        textBtn="adicionar Serviço"
                        projectData={project}
                    />)}
                </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
               {services.length > 0 && services.map((service) => (
                <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handkleRemove={removeService}
                />
               ))}
               {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
        </Container>
    </div> : <Loading />}
    </>
  );
}

export default Project