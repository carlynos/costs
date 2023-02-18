import { useEffect, useState } from 'react';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import SubmitButton from '../components/form/SubmitButton';
import style from './ProjectForm.module.css'

export function ProjectForm({handleSubmit, textbtn, projectData}) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories",{
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    }).then((resp) => resp.json()).then((data) => {
      setCategories(data)
    }).catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    //console.log(project)
    handleSubmit(project)

  }

  function handleChange(e){
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e){
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    }})
  }

  return (
    <div>
        <form onSubmit={submit}>

            <Input type="text" name="name" text="Nome" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name} />
            <Input type="number" name="budget" text="Orçamento do projeto" placeholder="Insira o orçamento total" handleOnChange={handleChange} value={project.budget} />
            <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''} />
            <SubmitButton text={textbtn} />
            
        </form>
    </div>
  );
}

export default ProjectForm