import React, { Fragment } from "react";
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { simpleAction } from '../actions/charactersAction';
import styled from 'styled-components';
import rickAndMortyImage from '../images/rickAndMorty.png';
import { Link } from "react-router-dom";

const HomeContainer = styled(Container)`
  text-align:center;
  margin-top:40px;
`;

const ImageElement = styled.img`
  width:60%;
  margin:0 auto;
  @media(max-width:768px){
    width:100%;
  }
`;

const Title = styled.div`
  font-size:24px;
  margin:10px 0px;
  font-family: Verdana, Geneva, sans-serif;
  text-align:center;
`;

const Menu = styled.div`
  background:#fafafa;
  text-align:center;
  padding:20px;
  width:100%;
  margin:0 auto;
`;

const MenuItem = styled(Link)`
  font-family: Verdana, Geneva, sans-serif;
  text-decoration:none;
  color: #1d1d1d;
  font-size:18px;
  margin:0 10px;
  cursor:pointer;
  &:hover{
    transition:color 0.2s ease-out;
    color:#82D00A;
    text-decoration:none;
  }
  @media(max-width:768px){
    display:block;
    width:100%;
    margin:20px 0px;
  }
`;

const Home = () => {
  // const dispatch = useDispatch();
  // const characters = useSelector(state => state.characters);
  // const handleAction = () => dispatch(simpleAction());
  return (
    <HomeContainer>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <ImageElement src={rickAndMortyImage} alt="imagem do Rick And Morty" />
          <Title>Bem vindo ao App do Rick and Morty App!</Title>
          <Menu>
            <MenuItem to="/characters">Personagens</MenuItem>
            <MenuItem to="/locations">Locais</MenuItem>
            <MenuItem to="/episodes">Episódios</MenuItem>
          </Menu>
        </Col>
      </Row>
    </HomeContainer>
  );
};

export default Home;