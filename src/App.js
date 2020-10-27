import React,{useState,useEffect} from "react";
import "./styles.css";
import api from './services/api';

function App() {

  const [repositories,setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepository(response.data)
    })
  },[])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title:`Novo projeto ${Date.now()}`
    })
    const repository = response.data;
    setRepository([...repositories,repository])
  }

  async function handleRemoveRepository() {
    // TODO
    //  const request = await api.delete('repository',{})

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
