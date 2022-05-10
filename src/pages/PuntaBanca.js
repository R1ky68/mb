import React, { useState, useEffect } from "react";
import puntaBanca, {Bancata, Responsabilità, guadagno_minimo, guadagno_book, guadagno_exchange, profitto_book, profitto_exchange, bancataParziale } from "../calcolatori/punta_banca";
import { bancata_nuova, responsabilità_nuova } from "../calcolatori/punta_banca";

import InputContainer from '../components/InputContainer';
import { ParametriScommesse } from "../components/Parametri";
import Errors from "../components/Errors";

//style
import styled from 'styled-components';

export default function PuntaBanca() {

    useEffect(() => {
        if (puntata && q_punta && q_banca) {
            puntaBanca(q_punta, q_banca, puntata); 

            setBancata(Bancata);
            setResponsabilità(Responsabilità);
            setGuadagnoMinimo(guadagno_minimo);

            setGuadagnoBook(guadagno_book);
            setGuadagnoExchange(guadagno_exchange);
            setProfittoBook(profitto_book);
            setProfittoExchange(profitto_exchange);
        }
        if (abbinata !== 0 && nuova_quota !== 1) {
            bancataParziale(abbinata, nuova_quota, q_banca, bancata);
            
            setNuovaBancata(bancata_nuova);
            setNuovaResponsabilità(responsabilità_nuova);
        }
    })

    //Dati per scommettere
    var [puntata, setPuntata] = useState(0);
    var [bancata, setBancata] = useState(0);
    var [q_punta, setQuotaPunta] = useState(0);
    var [q_banca, setQuotaBanca] = useState(0);
    var [responsabilità, setResponsabilità] = useState(0);
    
    //Guadagni e profitti
    var [g_minimo, setGuadagnoMinimo] = useState(0);
    var [g_book, setGuadagnoBook] = useState(0);
    var [g_exchange, setGuadagnoExchange] = useState(0);
    var [p_book, setProfittoBook] = useState(0);
    var [p_exchange, setProfittoExchange] = useState(0);

    //Parametri
    var [tipologia, setTipologia] = useState("Normale");
    var [bancata_parziale, setBancataParziale] = useState(false);

    //Bancata parzialmente abbinata
    var [abbinata, setBancataAbbinata] = useState(0);
    var [nuova_quota, setNuovaQuota] = useState(1);
    var [nuova_bancata, setNuovaBancata] = useState(0);
    var [nuova_responsabilità, setNuovaResponsabilità] = useState(0);

    return (
        <DivContainer>
            <Errors text="Bancata parziale funzionante ma con alcuni centesimi di errore." />
            <Errors text="Guadagno non aggiornato con bancata parziale" />
            <ParametriScommesse tipologia={tipologia} setTipologia={setTipologia} bancata_parziale={bancata_parziale} setBancataParziale={setBancataParziale} setBancataAbbinata={setBancataAbbinata} setNuovaQuota={setNuovaQuota} />
            <main>
                <div className="input-container">
                    <div className="punta" style={{ display: 'flex', marginTop: '15px' }}>
                        <InputContainer divClass="puntata" text="Puntata" saveValues={(e) => { setPuntata(e.target.value) }} inputName="importo" />
                        <InputContainer divClass="quota-punta" text="Quota Punta" saveValues={(e) => { setQuotaPunta(e.target.value) }} inputName="q-punta" />
                    </div>
                    <div className="banca" style={{ display: 'flex', marginTop: '15px' }}>
                        <InputContainer divClass="commissione" text="Commissione" inputName="percentuale" placeholder="5" />
                        <InputContainer divClass="quota-banca" text="Quota Banca" saveValues={(e) => { setQuotaBanca(e.target.value) }} inputName="q-banca" />
                    </div>
                </div>
            </main>
            <div id="riepilogo-tabella">
                <Riepilogo puntata={puntata} q_punta={q_punta} bancata={bancata} q_banca={q_banca} responsabilità={responsabilità} g_minimo={g_minimo} />
                <hr />
                <Tabella g_book={g_book} responsabilità={responsabilità} p_book={p_book} puntata={puntata} g_exchange={g_exchange} p_exchange={p_exchange} />
            </div>
            <div id='bancata-parziale-container'>
                { bancata_parziale === true ?
                    <>
                        <div style={{ display: "flex", marginTop: "20px" }}>
                            <InputContainer divClass="abbinata" text="Abbinata" saveValues={(e) => { setBancataAbbinata(e.target.value) }} inputName="abbinata" />
                            <InputContainer divClass="nuova-quota" text="Nuova Quota" saveValues={(e) => { setNuovaQuota(e.target.value) }} inputName="nuova-quota" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                            <p>Banca: {nuova_bancata}</p>
                            <p>Responsabilità: {nuova_responsabilità}</p>
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </DivContainer>
    );
}

const Tabella = (props) => (
    <table className="tabella-profitti" style={{ borderSpacing: "20px 15px" }}>
        <tr>
            <th></th>
            <th>Book</th>
            <th>Exchange</th>
            <th></th>
            <th>Totale</th>
        </tr>
        <tr>
            <td>Se vinci la puntata sul Book:</td>
            <td>+ {props.g_book} €</td>
            <td>- {props.responsabilità} €</td>
            <td>=</td>
            {props.p_book >= 0 ? 
                <td style={{ color: "#4e9c4f" }}>+ {props.p_book} €</td> :
                <td style={{ color: "#db6e6e" }}>{props.p_book} €</td>
            }
        </tr>
        <tr>
            <td>Se vinci la bancata sull'Exchange:</td>
            <td>- {props.puntata} €</td>
            <td>+ {props.g_exchange} €</td>
            <td>=</td>
            {props.p_exchange >= 0 ? 
                <td style={{ color: "#4e9c4f" }}>+ {props.p_exchange} €</td> :
                <td style={{ color: "#db6e6e" }}>{props.p_exchange} €</td>
            }
        </tr>
    </table>
);

const Riepilogo = (props) => (
    <div className="riepilogo">
        <h3>Riepilogo</h3>
        <p>Punta {props.puntata}€ a quota {props.q_punta} sul Book</p>
        {window.location.pathname === '/punta-banca' ? 
        <>
            <p>Banca {props.bancata}€ a quota {props.q_banca} su Betfair</p>
            <p>con Responsabilità di {props.responsabilità}€</p>
        </> : 
            <p>Punta {props.bancata}€ a quota {props.q_banca} sul Book B</p>
        }
        {props.g_minimo >= 0 ? <h3 style={{color: "#4e9c4f"}}>Il guadagno minimo sarà: {props.g_minimo}€</h3> : <h3 style={{color: "#db6e6e"}}>Il guadagno minimo sarà: {props.g_minimo}€</h3>}
    </div>
);

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export { InputContainer, Riepilogo }