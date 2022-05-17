import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {

    const [data, setData] = useState([])
    const [selectedRAdio, setSelectedRAdio] = useState("")
    const [rangeValue, setRangeValue] = useState(36);

    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]

    // le useEffect se joue lorsque le composant est monte
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((res) => setData(res.data))
    }, [])

    return (
        <div className='countries'>
            <ul className="radio-container">
                <input 
                    type="range" 
                    min="1" 
                    max="250" 
                    defaultValue={rangeValue} 
                    onChange={(e) => setRangeValue(e.target.value)} 
                />
                {radios.map((continent) => (
                    <li>
                        <input type="radio" 
                            id={continent} 
                            name="continentRadio"
                            checked={continent === selectedRAdio}
                            onChange={(e) => setSelectedRAdio(e.target.id) }    
                        />
                        <label htmlFor={continent} key={continent} > {continent} </label>
                    </li>
                ))}
            </ul>
            {selectedRAdio && (
                <button onClick={() => setSelectedRAdio("")} >Annuler la recherche</button>
            )}
            <ul>
                {
                    data
                    .filter((country) => country.continents[0].includes(selectedRAdio))
                    .sort((a, b) => b.population - a.population)
                    .slice(0, rangeValue).map((country, index) => (
                        <Card key={index} country={country} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Countries;