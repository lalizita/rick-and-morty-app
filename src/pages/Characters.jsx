import React, { useEffect } from "react";
import {
  Container, Row, Col,
  Card,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../actions/charactersAction';
import CharactersList from '../containers/CharactersList.jsx';
import CharactersSearch from '../containers/CharactersSearch';


const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading } = useSelector(state => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <CharactersSearch />
          <CharactersList />
        </Col>
      </Row>
    </Container>
  );
};

export default Characters;