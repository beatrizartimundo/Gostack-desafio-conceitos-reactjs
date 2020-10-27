import React,{useState,useEffect} from "react";
import "./styles.css";
import api from './services/api';

function App() {

  const [repositories,setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title:`Novo projeto`,
      url: 'https://github.com',
      techs: ['Node.js', 'React.js']
    })
    const repository = response.data;
    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    //TODO
     await api.delete(`repositories/${id}`)
 
       //remove da listagem o repositorio que foi excluido comparando pelo ID
       const updatedRepositories = repositories.filter(repository => repository.id !== id)
        setRepositories(updatedRepositories);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}<button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button></li>)}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
