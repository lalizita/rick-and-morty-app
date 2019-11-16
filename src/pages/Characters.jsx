import React, { useEffect } from "react";
import { Container, Row, Col,
ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
Media,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../actions/charactersAction';
import CharactersList from '../containers/CharactersList.jsx'


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
          <CharactersList />
        </Col>
      </Row>
    </Container>
  );
};

export default Characters;