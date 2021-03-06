import React, { useEffect } from "react";
import {
  Container, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getCharacters } from '../store/ducks/characters';
import CharactersList from '../containers/CharactersList';
import CharactersSearch from '../containers/CharactersSearch';


const Characters = () => {
  const dispatch = useDispatch();
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