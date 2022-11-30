
import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

var md5 = require('md5');

const { useEffect, useState } = require("react");
function Joke() {
    const [personajes, setPersonajes] = useState([]);
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("personajes") === null) {
                setPersonajes([]);
                setTitle("Loading...");
            } else {
                console.log("Entré al else");
                setPersonajes(JSON.parse(localStorage.getItem("personajes")));
                setTitle("Personajes");
            }
        } else {
            const INIT_URL = "https://gateway.marvel.com/v1/public/characters?";
            var timeStamp = Date.now();
            const publicKey ="729da637a04545dcacb46da05121c86a";
            const privateKey ="0514564ae7f81088474666e9db03d66c19890011";
            const hash = md5(timeStamp+privateKey+publicKey);
            const URL = INIT_URL+"ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
            
            console.log(URL);
            fetch(URL).then(res => res.json()).then(res => {
                setPersonajes(res.data.results);
                setTitle("Personajes");
                localStorage.setItem("personajes", JSON.stringify(res.data.results));
            })
        }
    }, []);
    console.log("app");
    console.log(personajes);

    return (
        <div className="container">
            <h1>{title}</h1>

            <hr></hr>
     <Row>
       {personajes.map((personaje) => (
         <Col key={personaje.id}>
           <p><b>{personaje.name}: </b>{personaje.description} </p>
           <p></p>
         </Col>
       ))}
     </Row>
        </div>
    );
}

export default Joke;