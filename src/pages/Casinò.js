import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { roulette, baccarat } from '../calcolatori/calcolatore_casino';
import { caso_rosso, caso_nero, caso_zero, nero, zero, guadagno_minimo_roulette } from '../calcolatori/calcolatore_casino';
import { caso_giocatore, caso_banco, banco, guadagno_minimo_baccarat } from '../calcolatori/calcolatore_casino';
import Errors from '../components/Errors';

import InputContainer from '../components/InputContainer';
import { ParametriCasino } from '../components/Parametri';

export default function Casino() {

  useEffect(() => {
    if (metodo === "Roulette") {
      if (puntata_roulette) {
        roulette(puntata_roulette, fiche_minima); 
  
        setGuadagnoMinimo(guadagno_minimo_roulette);
        setGuadagnoRosso(caso_rosso);
        setGuadagnoNero(caso_nero);
        setGuadagnoZero(caso_zero);
  
        setNero(nero);
        setZero(zero);
      } 
    } else {
      if (puntata_baccarat) {
        baccarat(puntata_baccarat, fiche_minima); 
  
        setGuadagnoMinimo(guadagno_minimo_baccarat);
        
        setCasoGiocatore(caso_giocatore);
        setCasoBanco(caso_banco);

        setBanco(banco);
        setGuadagnoGiocatore(puntata_baccarat - banco2);
        setGuadagnoBanco(banco2 * 0.95);
      } 
    }
  })

  //Roulette
  var [puntata_roulette, setPuntataRoulette] = useState(0);
  var [g_rosso, setGuadagnoRosso] = useState(0);
  var [g_nero, setGuadagnoNero] = useState(0);
  var [g_zero, setGuadagnoZero] = useState(0);
  var [nero2, setNero] = useState(0);
  var [zero2, setZero] = useState(0);

  //Baccarat
  var [puntata_baccarat, setPuntataBaccarat] = useState(0);
  var [g_giocatore, setGuadagnoGiocatore] = useState(0);
  var [g_banco, setGuadagnoBanco] = useState(0);
  var [caso_giocatore2, setCasoGiocatore] = useState(0);
  var [caso_banco2, setCasoBanco] = useState(0);
  var [banco2, setBanco] = useState(0);

  //Parametri
  var [g_minimo, setGuadagnoMinimo] = useState(0);
  var [metodo, setMetodo] = useState("Roulette");
  var [tipologia, setTipologia] = useState("Normale");
  var [copertura, setCopertura] = useState("3 (Rosso/Nero)");
  var [fiche_minima, setFicheMinima] = useState(0.10);
  var [rimborso, setRimborso] = useState(0);

  return (
    <DivContainer> 
      <Errors text="Momentaneamente cambiare l'importo delle fiche bloccherà il sito" />
      <Errors text="Calcolatore dozzine non funzionante" />

      <ParametriCasino metodo={metodo} setMetodo={setMetodo} tipologia={tipologia} setTipologia={setTipologia} copertura={copertura} setCopertura={setCopertura} />
      <main>
        <div className="input-container" style={{ display: 'flex', marginTop: '15px' }}>
          <InputContainer divClass="puntata" text="Puntata" inputName="importo" saveValues={(e) => { 
            if (metodo === "Roulette") setPuntataRoulette(e.target.value);
            if (metodo === "Baccarat") setPuntataBaccarat(e.target.value);
            }} />
          <div>
            <p>Fiche minime</p>
            <Select name="fiche" id="fiche" onChange={(e) => { setFicheMinima(e.target.value) }}>
              <option value="0.10">€0.10</option>
              <option value="0.20">€0.20</option>
              <option value="0.50">€0.50</option>
              <option value="1">€1</option>
              <option value="5">€5</option>
              <option value="10">€10</option>
            </Select>
          </div>
        </div>
        { tipologia === "Rimborso CR%" ? 
          <InputContainer divClass="rimborso" text="Rimborso" inputName="rimborso" saveValues={(e) => { setRimborso(e.target.value) }} />
          : null
        }
      </main>
      <div id="riepilogo-tabella">
        <div className="riepilogo">
          <h3>Riepilogo</h3>
          { metodo === "Roulette" ? <p>Rating: 94%</p> : <p>Rating: 97%</p> }
          <div className='istruzioni-casino'>
            { metodo === "Roulette" ?
              <RiepilogoRoulette copertura={copertura} puntata={puntata_roulette} nero={nero2} zero={zero2.toFixed(2)} />
              :
              <RiepilogoBaccarat puntata={puntata_baccarat} banco={banco2.toFixed(2)} />
            }
          </div>
          {g_minimo >= 0 ? <h3 style={{color: "#4e9c4f"}}>Il guadagno minimo sarà: {g_minimo.toFixed(2)}€</h3> : <h3 style={{color: "#db6e6e"}}>Il guadagno minimo sarà: {g_minimo.toFixed(2)}€</h3>}
        </div>
        <hr />
        { metodo === "Roulette" ? 
          <TabellaRoulette puntata={puntata_roulette} nero={nero2} zero={zero2.toFixed(2)} g_rosso={g_rosso.toFixed(2)} g_nero={g_nero.toFixed(2)} g_zero={g_zero.toFixed(2)} copertura={copertura} />
          :
          <TabellaBaccarat puntata={puntata_baccarat} banco={banco2.toFixed(2)} g_banco={g_banco.toFixed(2)} caso_giocatore={caso_giocatore2.toFixed(2)} caso_banco={caso_banco2.toFixed(2)} />
        }
      </div>
    </DivContainer>
  )
}

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Select = styled.select`
  margin-top: 2px;
  height: 47px;

  width: 300px;
  fontSize: 30px;
  padding: 3px;
  background: #B8FFD3;
  border: 2px solid #000000;
  boxSizing: border-box;
`

const RiepilogoRoulette = (props) => (
  props.copertura === "3 (Rosso/Nero)" ?
    <>
      <p>Punta {props.puntata}€ sul Rosso</p>
      <p>Punta {props.nero}€ sul Nero</p>
      <p>Punta {props.zero}€ sullo Zero</p>
    </>
  :
    <>
      <p>Punta € sulla dozzina 1-12</p>
      <p>Punta € sulla dozzina 13-24</p>
      <p>Punta € sulla dozzina 25-36</p>
      <p>Punta € sullo Zero</p>
    </>
)

const RiepilogoBaccarat = (props) => (
  <>
    <p>Punta {props.puntata}€ sul Giocatore</p>
    <p>Punta {props.banco}€ sul Banco</p>
  </>
)

const TabellaRoulette = (props) => (
  props.copertura === "3 (Rosso/Nero)" ? 
    <table className="tabella-profitti" style={{ borderSpacing: "20px 15px" }}>
      <tr>
        <th></th>
        <th>Rosso</th>
        <th>Nero</th>
        <th>Zero</th>
        <th></th>
        <th>Totale</th>
      </tr>
      <tr>
        <td>Se esce Rosso:</td>
        <td>+ {props.puntata} €</td>
        <td>- {props.nero} €</td>
        <td>- {props.zero} €</td>
        <td>=</td>
        {props.g_rosso >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_rosso} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_rosso} €</td>
        }
      </tr>
      <tr>
        <td>Se esce Nero:</td>
        <td>- {props.puntata} €</td>
        <td>+ {props.nero} €</td>
        <td>- {props.zero} €</td>
        <td>=</td>
        {props.g_nero >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_nero} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_nero} €</td>
        }
      </tr>
      <tr>
        <td>Se esce Zero:</td>
        <td>- {props.puntata} €</td>
        <td>- {props.nero} €</td>
        <td>+ {props.zero * 35} €</td>
        <td>=</td>
        {props.g_zero >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_zero} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_zero} €</td>
        }
      </tr>
    </table>
  :
    <table className="tabella-profitti" style={{ borderSpacing: "20px 15px" }}>
      <tr>
        <th></th>
        <th>1-12</th>
        <th>13-24</th>
        <th>25-36</th>
        <th>Zero</th>
        <th></th>
        <th>Totale</th>
      </tr>
      <tr>
        <td>Se esce 1-12:</td>
        <td>+ {props.importo * 3} €</td>
        <td>- {props.importo} €</td>
        <td>- {props.importo} €</td>
        <td>- {props.zero} €</td>
        <td>=</td>
        {props.g_rosso >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_rosso} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_rosso} €</td>
        }
      </tr>
      <tr>
        <td>Se esce 13-24:</td>
        <td>-  €</td>
        <td>+  €</td>
        <td>-  €</td>
        <td>-  €</td>
        <td>=</td>
        {props.g_nero >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+{props.g_nero} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_nero} €</td>
        }
      </tr>
      <tr>
        <td>Se esce 25-36:</td>
        <td>-  €</td>
        <td>-  €</td>
        <td>+  €</td>
        <td>-  €</td>
        <td>=</td>
        {props.g_zero >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_zero} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_zero} €</td>
        }
      </tr>
      <tr>
        <td>Se esce Zero:</td>
        <td>-  €</td>
        <td>-  €</td>
        <td>-  €</td>
        <td>+  €</td>
        <td>=</td>
        {props.g_zero >= 0 ? 
          <td style={{ color: "#4e9c4f" }}>+ {props.g_zero} €</td> :
          <td style={{ color: "#db6e6e" }}>{props.g_zero} €</td>
        }
      </tr>
    </table>
);

const TabellaBaccarat = (props) => (
  <table className="tabella-profitti" style={{ borderSpacing: "20px 15px" }}>
    <tr>
      <th></th>
      <th>Giocatore</th>
      <th>Banco</th>
      <th></th>
      <th>Totale</th>
    </tr>
    <tr>
      <td>Se vince il Giocatore</td>
      <td>+ {props.puntata} €</td>
      <td>- {props.banco} €</td>
      <td>=</td>
      {props.caso_giocatore >= 0 ? 
        <td style={{ color: "#4e9c4f" }}>+ {props.caso_giocatore} €</td> :
        <td style={{ color: "#db6e6e" }}>{props.caso_giocatore} €</td>
      }
    </tr>
    <tr>
      <td>Se vince il Banco</td>
      <td>- {props.puntata} €</td>
      <td>+ {props.g_banco} €</td>
      <td>=</td>
      {props.caso_banco >= 0 ? 
        <td style={{ color: "#4e9c4f" }}>+ {props.caso_banco} €</td> :
        <td style={{ color: "#db6e6e" }}>{props.caso_banco} €</td>
      }
    </tr>
    <tr>
      <td>Se esce un Pareggio:</td>
      <td>+ 0 €</td>
      <td>+ 0 €</td>
      <td>=</td>
      <td style={{ color: "#4e9c4f" }}>+ 0 €</td>
    </tr>
  </table>
);
