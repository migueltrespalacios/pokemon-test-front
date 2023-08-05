import React, { useEffect, useState, } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./pokemon.css";
const cookies = new Cookies();

export default function PokemonComponent() {
  const [message, setMessage] = useState([]);
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);

  const handleOnclick = (id) => {
    localStorage.setItem('idPokemon', id);
    navigate('/detail');
  }

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:3010/pokemon",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        //console.log(result.data.data.results[0].name)
        // assign the message in our result to the message we initialized above
        setMessage(result.data.data.results);
      })
      .catch((error) => {
        error = new Error();
      });
  }, [])

  useEffect(() => {
    // Aquí puedes hacer la llamada a tu backend para obtener los datos
    // Por ahora, simularemos datos de ejemplo
    const configuration = {
      method: "get",
      url: "http://localhost:3010/pokemon",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log('tavo', result.data.data.results)
        setDatos(result.data.data.results);
        // assign the message in our result to the message we initialized above
        setMessage(result.data.data.results);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
      {/* <h1 className="text-center">Lista de Pokemon</h1>
      <h3 className="text-center text-danger">
        <Row className="justify-content-md-center pokemon-list">
          {message.map((item, index) => (
            <Col class="pokemon-item" xs lg="3" key={index} onClick={() => { handleOnclick(item.url) }}>{item.name} </Col> // Assuming your API response has an 'id' and 'name' field
          ))}
        </Row>
      </h3> */}
      <button class="buttonBack" variant="primary" onClick={()=>{navigate('/')}}> Volver </button>

      <div class="containerButtonsPokemon">
        <h1 class="tittlePokemon">Lista de Pokemon</h1>
        <div class="containerMediumButton">
          {datos.map(dato => (
            <button class="buttonClassPokemon" key={dato.id} onClick={() => { handleOnclick(dato.url) }}>{dato.name}</button>
          ))}
        </div>
      </div>
      
    </div>
  );
}
