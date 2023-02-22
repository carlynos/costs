import style from '../project/ProjectForm.module.css'
import Input from '../components/form/Input';
import SubmitButton from '../components/form/SubmitButton';
import { useState } from 'react';

export function ServiceForm({handleSubmit,textBtn, projectData}) {

    const [service, setService] = useState([])
    
    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }
  return (
    <form onSubmit={submit} className={style.form}>
        <Input
            type="text"
            text="Nome do Serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
        />
        <Input
            type="number"
            text="Custo de serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
        />
        <Input
            type="text"
            text="Descrição do Serviço"
            name="description"
            placeholder="Insira a descrição do serviço"
            handleOnChange={handleChange}
        />
        <SubmitButton text={textBtn} />
    </form>
  );
}