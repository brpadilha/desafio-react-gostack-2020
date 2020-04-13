import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get("repositories");

      setRepository(response.data);
    }

    getData();
  }, []);

  async function handleRemoveRepository(repository) {
    // TODO
    const id = repository.id;

    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter((repository) => repository.id !== id));
  }
  async function handleAddRepository() {
    // TODO;
    const repository = {
      id: "12314",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post("repositories", repository);

    setRepository([...repositories, response.data]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
