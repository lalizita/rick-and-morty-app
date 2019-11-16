import React, { Fragment, useEffect } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemText,
  Media, Spinner, Button,
  Card, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters, filterCharacters } from '../actions/charactersAction';

const Label = styled.span`
  font-weight:600;
`;

const CharacterImage = styled.img`
  width:90px;
  margin-right:10px;
`;

const SpinnerContainer = styled.div`
  text-align:center;
  width:100%;
`;

const ListHeader = styled.div`
  padding:40px 20px 10px 20px;
  font-size:24px;
`;

const ButtonsContainer = styled.div`
  text-align:right;
`;

const SortIcon = styled.img`
  height:20px;
`;

const compareCresc = ( a, b ) => {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

const compareDecresc = ( a, b ) => {
  if ( a.name > b.name ){
    return -1;
  }
  if ( a.name < b.name ){
    return 1;
  }
  return 0;
}

const CharactersList = () => {
  const dispatch = useDispatch();
  const { filteredCharacters, loading, characters } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const sortCresc = (list, order) => {
    const orderedList = order === 'cresc' ? list.sort(compareCresc) : list.sort(compareDecresc);
    dispatch(filterCharacters(orderedList));
  };

  return (
    <>
      <ListHeader>
        <Row>
          <Col sm={6}>Resultados</Col>
          <Col sm={6}>
            <ButtonsContainer>
              <Button outline color="success" style={{ marginRight: 10 }} onClick={() => sortCresc(filteredCharacters, 'cresc')}>
                <SortIcon src="https://image.flaticon.com/icons/svg/109/109583.svg"  />
              </Button>
              <Button outline color="success" onClick={() => sortCresc(filteredCharacters, 'desc')}>
                <SortIcon src="https://image.flaticon.com/icons/svg/109/109611.svg" />
              </Button>
            </ButtonsContainer>
          </Col>
        </Row>
      </ListHeader>
      <ListGroup>
        {loading && (
          <SpinnerContainer>
            <Spinner type="grow" color="success" />
          </SpinnerContainer>
        )}
        {filteredCharacters.length > 0 && filteredCharacters.map((character) => (
          <ListGroupItem key={character.id}>
            <Media>
              <Media left top>
                <CharacterImage object src={character.image} alt={`${character.name}'s photo`} />
              </Media>
              <Media body>
                <Media heading>
                  { character.name }
                </Media>
                <ListGroupItemText>
                  <div>
                    <Label>Specie:</Label>
                    { character.species }
                  </div>
                  <div>
                    <Label>Gender:</Label>
                    { character.gender }
                  </div>
                  <div>
                    <Label>Status:</Label>
                    { character.status }
                  </div>
                </ListGroupItemText>
              </Media>
            </Media>
          </ListGroupItem>
        ))}
        {characters.length === 0 && (
          <ListGroupItem>
            <h1>There is not...</h1>
          </ListGroupItem>
        )}
      </ListGroup>
    </>
  );
};

export default CharactersList;
