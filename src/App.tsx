import { useState } from 'react';
import styles from './App.module.css'
import List from './components/list';
import Modal from './components/modal';
import FormWithFeedback from './components/form';
import Input from './components/input';


function App() {

  const [ isOpen, setIsOpen ] = useState(false);
  const [ isFiltering, setIsFiltering ] = useState(false);
  const [ filter, setFilter ] = useState("");

  return (
    <main>
      <div className={styles.header}>
        <h2>Cadastro de CEP</h2>
        <div className={styles.buttonContainer}>
          <Input 
            name="filter"
            label="Filtro"
            handleChange={(e) => setFilter(e.target.value)}
            errors={{}}
            disabled= {!isFiltering}
          />
          <button 
            onClick={() =>setIsFiltering(!isFiltering)}
          >
        { !isFiltering ? "Filtrar" : "Limpar"}
          </button>
          <button 
            onClick={() =>setIsOpen(true)}
          >
            Adicionar
          </button>
        </div>
      </div>
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
      >
        <FormWithFeedback 

        />
      </Modal>
      <List 
        setIsOpen={setIsOpen} 
        filter={filter}
      />
    </main>
  )
}

export default App
