import React,{useState} from 'react';
import axios from 'axios';
import Search from './components/Search'
import Results from './components/Results';
import './App.css';

function App() {
    
    const [term,setTerm] = useState('');
    const [results,setResults] = useState([]);
    const [selected,setSelected] = useState({});
       
    const apiurl = ` http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    const search = async (e) => {
        if(e.key === "Enter"){
            const response = await axios(apiurl + "&s=" + term);
            setResults(response.data.Search);
        }
    }

    const handleInput = (e) => {
        let sea = e.target.value;
        setTerm(sea);
        
    }
    return (
        <div>
            <header>
                <h1>Movies App</h1>
            </header>
            <main>
                <Search handleInput={handleInput} search={search} />
            </main>
        </div>
    )
}

export default App;
