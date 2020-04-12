import React,{useState} from 'react';
import axios from 'axios';
import Search from './components/Search'
import Results from './components/Results';
import Popup from './components/Popup';
import './App.css';


function App() {
    
    const [term,setTerm] = useState('');
    const [results,setResults] = useState([]);
    const [selected,setSelected] = useState({});
       
    const apiurl = ` https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    const search = async (e) => {
        if(e.key === "Enter"){
            const response = await axios(apiurl + "&s=" + term);
            setResults(response.data.Search);
        }
    }

    const openPopup = async (id) => {
        const popres = await axios(apiurl + '&i=' + id);
        console.log(popres);
        setSelected(popres.data);
    }

    const closePopup = () => {
        setSelected({});
    }

    const handleInput = (e) => {
        let sea = e.target.value;
        setTerm(sea);
        
    }
    return (
        <div>
            <header>
                <h1>Movie Beat</h1>
            </header>
            <main>
                <Search handleInput={handleInput} search={search} />
                <Results results={results} openPopup={openPopup}/>

                {(typeof selected.Title != "undefined") ? <Popup selected={selected} closePopup={closePopup}/>:false}
            </main>
        </div>
    )
}

export default App;
