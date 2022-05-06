import React from 'react'
import styled from "styled-components";

function Home() {
    return (
        <>
            <Green />
            <Row>
                <div>
                    <Title>Matched Betting.<br /> Una seconda entrata mensile, lavorando da casa.</Title>
                </div>
            </Row>
        </>
    )
}

export default Home;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 7.3rem 100px;

    @media only screen and (max-width: 600px) {
        margin: 1rem 0px;
    }

`

const Title = styled.h1`
    font-size: 50px;
    width: 800px;
    font-family: 'Roboto', sans-serif;

    @media only screen and (max-width: 600px) {
        font-size: 38px;
        width: 375px;
    }
`

const Green = styled.div`
	background-color: rgba(22, 255, 111, 0.301);
    width: 35%;
    height: 100%;
    display: inline-block;
    position: absolute;
    z-index:-1;

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: 25%;
    }
`