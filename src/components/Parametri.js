import React from "react";
import styled from 'styled-components';


const ParametriCasino = (props) => (
    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>
        <ParameterContainer>
            <Label style={{ marginRight: "5px" }}>Metodo</Label>
            <Select onChange={(e) => props.setMetodo(String(e.target.value)) }>
                <option>Roulette</option>
                <option>Baccarat</option>
            </Select>
        </ParameterContainer>
        <ParameterContainer>
            <Label style={{ marginRight: "5px" }}>Tipologia</Label>
            <Select onChange={(e) => props.setTipologia(String(e.target.value)) }>
                <option>Normale</option>
                <option>Rimborso CR%</option>
                <option>Bonus</option>
            </Select>
        </ParameterContainer>
        <ParameterContainer>
            <Label style={{ marginRight: "5px" }}>Copertura</Label>
            { props.metodo === "Roulette" ?
                <Select onChange={(e) => props.setCopertura(String(e.target.value)) }>
                    <option>3 (Rosso/Nero)</option>
                    <option>4 (Dozzine)</option>
                    </Select> 
                    :
                    <Select disabled>
                    <option>2</option>
                </Select> 
            }
        </ParameterContainer>
    </div>
);

const ParametriScommesse = (props) => (
    <div style={{ display: "flex", alignItems: 'center' }}>
        <ParameterContainer>
            <Label style={{ marginRight: "5px" }}>Tipologia</Label>
            <Select onChange={(e) => props.setTipologia(String(e.target.value)) }>
                <option>Normale</option>
                <option>Rimborso CR%</option>
                <option>Bonus</option>
            </Select>
        </ParameterContainer>
        <ParameterContainer>
            <Label style={{ marginRight: "5px" }}>Bancata parziale</Label>
            <input type="checkbox" name='bancata parzialmente abbinata' onChange={() => {props.setBancataParziale(!props.bancata_parziale); console.log(props.bancata_parziale)} } />
        </ParameterContainer>
    </div>
);

const ParameterContainer = styled.div`
    margin: 15px;
`

const Label = styled.label`
    margin-right: 5px;
`

const Select = styled.select`
  fontSize: 30px;
  padding: 3px;
  background: #B8FFD3;
  border: 2px solid #000000;
  border-radius: 6px;
  boxSizing: border-box;
`

export { ParametriCasino, ParametriScommesse };