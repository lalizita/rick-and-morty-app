import React, { useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../actions/charactersAction';


const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading } = useSelector(state => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={12}>
      <h3>Personagens</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Characters;