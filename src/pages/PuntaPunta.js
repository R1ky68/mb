import React, { useState, useEffect } from 'react';
import puntaPunta, {guadagno_book_A, contro_puntata, guadagno_book_B, profitto_book_A, profitto_book_B, guadagno_minimo} from '../calcolatori/punta_punta';
import { Riepilogo } from './PuntaBanca';
import styled from 'styled-components';
import InputContainer from '../components/InputContainer';

export default function PuntaPunta() {

    useEffect(() => {
        if (puntataA && q_puntaA && q_puntaB) {
            puntaPunta(q_puntaA, q_puntaB, puntataA); 

            setPuntataB(contro_puntata);
            setGuadagnoMinimo(guadagno_minimo);
            setGuadagnoBookA(guadagno_book_A);
            setGuadagnoBookB(guadagno_book_B);
            setProfittoBookA(profitto_book_A);
            setProfittoBookB(profitto_book_B);
        }
    })

    var [puntataA, setPuntataA] = useState(0);
    var [puntataB, setPuntataB] = useState(0);
    var [q_puntaA, setQuotaPuntaA] = useState(0);
    var [q_puntaB, setQuotaPuntaB] = useState(0);

    var [g_minimo, setGuadagnoMinimo] = useState(0);
    var [g_bookA, setGuadagnoBookA] = useState(0);
    var [g_bookB, setGuadagnoBookB] = useState(0);
    var [p_bookA, setProfittoBookA] = useState(0);
    var [p_bookB, setProfittoBookB] = useState(0);

    return (
        <DivContainer>
            <main>
                <div className="input-container">
                    <div className="punta">
                        <InputContainer divClass='puntata-a' text="Puntata A" saveValues={(e) => { setPuntataA(e.target.value) }} inputName="importo" />
                        <InputContainer divClass='quota-punta-a' text="Quota punta A" saveValues={(e) => { setQuotaPuntaA(e.target.value) }} inputName="quota-a" />
                    </div>
                    <div className="punta">
                        <InputContainer divClass='quota-punta-b' text="Quota punta B" saveValues={(e) => { setQuotaPuntaB(e.target.value) }} inputName="quota-b" />
                    </div>
                </div>
            </main>
            <div id="riepilogo-tabella">
                <Riepilogo puntata={puntataA} q_punta={q_puntaA} bancata={puntataB} q_banca={q_puntaB} g_minimo={g_minimo} />
                <hr />
                <table className='tabella-profitti' style={{ borderSpacing: "20px 15px" }}>
                    <tr>
                        <th></th>
                        <th>Book A</th>
                        <th>Book B</th>
                        <th></th>
                        <th>Totale</th>
                    </tr>
                    <tr>
                        <td>Se vinci la puntata sul Book A:</td>
                        <td style={{color: "#4e9c4f"}}>+ {g_bookA} €</td>
                        <td style={{color: "#db6e6e"}}>- {puntataB} €</td>
                        <td>=</td>
                        <td>{p_bookA} €</td>
                    </tr>
                    <tr>
                        <td>Se vinci la bancata sul Book B:</td>
                        <td style={{color: "#db6e6e"}}>- {puntataA} €</td>
                        <td style={{color: "#4e9c4f"}}>+ {g_bookB} €</td>
                        <td>=</td>
                        <td>{p_bookB} €</td>
                    </tr>
                </table>
            </div>
        </DivContainer>
    );
}

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`