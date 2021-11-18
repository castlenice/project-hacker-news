import React, { useState, useEffect } from 'react';
import "./styles.css";
import axios from "axios";

export default function Search() {
  
  const [querys, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

    useEffect(() => {
      axios
        .get(`https://hn.algolia.com/api/v1/search?query=${querys}`)
        .then((response) => setResults(response.data.hits))
        .catch((error) => alert(error));
    }, [querys]);

  
  return (
    <div className="App">
      
        <input value={querys} onChange={handleChange} type="text" placeholder="Search..." />
    
      {results
        ? results.map((query) => ( //ternery operater: (?,:,...)
            <div key={query.objectID}>
              <h2>{query.title}</h2>
              <p>{query.author}</p>
              <a href={query.url}>Link zum Artikel</a>
            </div>
          ))
        : "Loading......"}
    </div>
  )
}




