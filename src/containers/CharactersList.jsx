import React, { useEffect } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemText,
  Media, Spinner,
} from 'reactstrap';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../actions/charactersAction';

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

const CharactersList = () => {
  const dispatch = useDispatch();
  const { filteredCharacters, loading, characters } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  console.log("CAHRLIST", filteredCharacters);


  return (
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
  );
};

export default CharactersList;
