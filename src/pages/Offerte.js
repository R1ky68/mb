import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';

export default function Offerte() {

  const offerte = [
    {id: "WilliamHill", image: "https://www.periodicodaily.com/wp-content/uploads/2021/03/william-hill-review-1.png", descrizione: "[1/2] - scommetti 10€, ricevi 10€ + 5€"},
    {id: "Bet365", image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Bet365_Logo.svg", descrizione: "deposita 100€, ricevi 100€"},
    {id: "Sisal", image: "https://www.123scommesse.it/img/sisal-logo-678x381.jpg", descrizione: "rimborso di 25€ + 10€ per 30 settimane"},
    {id: "Better", image: "https://imigliorisitidiscommesse.it/wp-content/uploads/2020/08/better-s.jpg", descrizione: "deposita 100€, ricevi 10€"},
    {id: "Bwin", image: "https://affidabile.org/wp-content/uploads/2017/10/bwin-logo.png", descrizione: "Bwin - scommetti 10€, ricevi 10€ + 30 giri gratis"},
    {id: "Leovegas", image: "https://casino-on-line.cc/wp-content/uploads/2021/07/Recensioni-di-LeoVegas-Casino-2021.png", descrizione: "scommessa da 25€ maggiorata del 50%"},
    {id: "Pokerstars", image: "https://vtlogo.com/wp-content/uploads/2021/06/pokerstars-vector-logo.png", descrizione: "rimborso multipla del 100% fino a 10€"},
    {id: "Snai", image: "https://www.barinedita.it/public/foto_news_upload/Snai.jpg", descrizione: "deposita 500€, ricevi 300€ bonus + 5€ bonus"},
    {id: "StanleyBet", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Stanleybet_logo_international.svg/1200px-Stanleybet_logo_international.svg.png", descrizione: "deposita 25€ ricevi 5€ + scommetti 25€ ricevi 5€"},
  ]
  return (
    <OffertaContainer>
      <OffertaComponent offerte={offerte} />
    </OffertaContainer>
  )
}

const OffertaComponent = (props) => props.offerte.map((offerta, index) =>
  <CardContainer>
    <Link to={"/offerte/" + offerta.id} style={{ color: 'black', textDecoration: "none" }}>
      <Card key={index} style={{ width: '15rem' }}>
        <Card.Img variant="top" src={offerta.image} id={offerta.id} style={{ height: "150px" }} />
        <Card.Body>
          <Card.Title>{offerta.id}</Card.Title>
          <Card.Text>
            {offerta.descrizione}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </CardContainer>
);

const CardContainer = styled.div`
  cursor: pointer;
`

const OffertaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 30px 8rem;
  
`