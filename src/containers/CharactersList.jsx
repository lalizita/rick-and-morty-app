import React, { Fragment, useEffect, useState } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemText,
  Media, Spinner, Button,
  Row, Col, Pagination, PaginationItem,
  PaginationLink,
} from 'reactstrap';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../store/ducks/characters';

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

const PaginationContainer = styled.div`
  margin-top:20px;
  width:100%;
  text-align:center;
`;

const compareCresc = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const compareDecresc = (a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
};

const CharactersList = () => {
  const dispatch = useDispatch();
  const { filteredCharacters, loading } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [pagesNumber, setPagesNumber] = useState([]);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  useEffect(() => {
    const filterItensPerPage = filteredCharacters.slice(indexOfFirst, indexOfLast);
    const pages = [];
    if (filteredCharacters.length > 0) setCurrentItems(filterItensPerPage);
    for (let index = 1; index <= Math.ceil(filteredCharacters.length / itemsPerPage); index++) {
      pages.push(index);
    }
    setPagesNumber(pages);
    if (currentPage > pages.length) setCurrentPage(1);
    if(filteredCharacters.length === 0) setCurrentItems([]);
  }, [filteredCharacters, currentPage]);

  const sortCresc = (list, order) => {
    const orderedList = order === 'cresc' ? list.sort(compareCresc) : list.sort(compareDecresc);
    setCurrentItems([...orderedList]);
  };

  const handleClick = number => {
    setCurrentPage(number);
    setCurrentItems(filteredCharacters.slice(indexOfFirst, indexOfLast));
  };

  return (
    <>
      <ListHeader>
        <Row>
          <Col sm={6}>Resultados</Col>
          <Col sm={6}>
            <ButtonsContainer>
              <Button outline color="success" style={{ marginRight: 10 }} onClick={() => sortCresc(currentItems, 'cresc')}>
                <SortIcon src="https://image.flaticon.com/icons/svg/109/109583.svg" />
              </Button>
              <Button outline color="success" onClick={() => sortCresc(currentItems, 'desc')}>
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
        {currentItems.length > 0 && currentItems.map((character) => (
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
      </ListGroup>
      {filteredCharacters.length === 0 && (
        <ListGroup>
          <ListGroupItem>
            <h1>Ops, no results...</h1>
          </ListGroupItem>
        </ListGroup>
      )}
      <PaginationContainer>
        <Pagination>
          {pagesNumber.map((number) => {
            return (
              <PaginationItem active={currentPage === number}>
                <PaginationLink onClick={() => handleClick(number)}>
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          })}
        </Pagination>
      </PaginationContainer>
    </>
  );
};

export default CharactersList;
