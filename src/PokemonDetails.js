import React, { useEffect, useState, } from "react";
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import "./pokemon.css";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

export default function PokemonDetailComponent() {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [abilities, setAbilities] = useState([]);
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        // set configurations for the API call here
        const idPokemon = localStorage.getItem('idPokemon')
        setMessage(idPokemon);
        const configuration = {
            method: "get",
            url: `${idPokemon}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                console.log(result)
                setName(result.data.name);
                setAbilities(result.data.abilities);
                setImage(result.data.sprites['front_shiny']);
            })
            .catch((error) => {
                error = new Error();
            });
    }, [])

    return (
        <div>
            <div class="containerPrincipal">
                <h1 class="tittlePokemon">Detalles</h1>
                <button class="buttonBack" variant="primary" onClick={()=>{navigate('/pokemon')}}> Volver </button>
                <h3 className="text-center text-danger"> </h3>
                    <Row className="justify-content-md-center detail-container">
                        <h4 class="namePokemon">{name}</h4>
                        <img src={image} className="pokemonImage" width="150"/>
                        <br/>
                        <span>habilidades:</span>
                        <br/>
                        <br/>
                        <ul>
                            {abilities.map((item, index) => (
                                <li key={index} >{item.ability.name} </li> // Assuming your API response has an 'id' and 'name' field
                            ))}
                        </ul>
                    </Row>
            </div>
        </div>
        
    );
}
