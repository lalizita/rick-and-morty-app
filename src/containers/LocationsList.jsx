import React, { Fragment, useEffect, useState } from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemText,
  Media, Spinner, Button,
  Row, Col, Pagination, PaginationItem,
  PaginationLink, Modal, ModalHeader,
  ModalBody, ModalFooter, Table,
} from 'reactstrap';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getLocations } from '../store/ducks/locations';
import { getMultipleCharacters } from '../store/ducks/characters';

const Label = styled.span`
  font-weight:600;
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

const SeeCharacters = styled.span`
  font-weight:700;
  color:#82D00A;
  cursor:pointer;
`;

const CharactersModal = ({ isOpen, onClose }) => {
  const { characters, loading } = useSelector((state) => state.characters);
  return (
    <Modal isOpen={isOpen} toggle={onClose} scrollable onClose={onClose}>
      <ModalHeader toggle={onClose}>Who lives in this location</ModalHeader>
      {loading && (
        <SpinnerContainer>
          <Spinner type="grow" color="success" />
        </SpinnerContainer>
      )}
      <ModalBody>
        {characters && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specie</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(characters) ? characters.map((character) => (
                <tr key={character.id}>
                  <td>{character.name}</td>
                  <td>{character.species}</td>
                </tr>
              )) : (
                <tr key={characters.id}>
                  <td>{characters.name}</td>
                  <td>{characters.species}</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClose}>Quit</Button>
      </ModalFooter>
    </Modal>
  );
};

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

const LocationsList = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locations);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [pagesNumber, setPagesNumber] = useState([]);
  const [charactersModal, setCharactersModal] = useState(false);
  const itemsPerPage = 5;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  useEffect(() => {
    const filterItensPerPage = locations.slice(indexOfFirst, indexOfLast);
    const pages = [];
    if (locations.length > 0) setCurrentItems(filterItensPerPage);
    for (let index = 1; index <= Math.ceil(locations.length / itemsPerPage); index++) {
      pages.push(index);
    }
    setPagesNumber(pages);
    if (currentPage > pages.length) setCurrentPage(1);
    if (locations.length === 0) setCurrentItems([]);
  }, [locations, currentPage]);

  const sortCresc = (list, order) => {
    const orderedList = order === 'cresc' ? list.sort(compareCresc) : list.sort(compareDecresc);
    setCurrentItems([...orderedList]);
  };

  const handleClick = number => {
    setCurrentPage(number);
    setCurrentItems(locations.slice(indexOfFirst, indexOfLast));
  };

  const openModal = (residents) => {
    const charactersToSend = residents.reduce((acc, cur) => {
      const regex = /([0-9]+)/g;
      const number = cur.match(regex);
      acc.push(number[0]);
      return acc;
    }, []);
    dispatch(getMultipleCharacters(charactersToSend));
    setCharactersModal(true);
  };

  return (
    <>
      <ListHeader>
        <Row>
          <Col sm={6}>
            Results (
            {locations.length}
            )
          </Col>
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
        {currentItems.length > 0 && currentItems.map((location) => (
          <ListGroupItem key={location.id}>
            <Media body>
              <Media heading>
                { location.name }
              </Media>
              <ListGroupItemText>
                <div>
                  <Label>Dimension:</Label>
                  { location.dimension }
                </div>
                <div>
                  <Label>Type:</Label>
                  { location.type }
                </div>
                <div>
                  <Label>Who lives here?:</Label>
                  <SeeCharacters onClick={() => openModal(location.residents)}> See now</SeeCharacters>
                  <CharactersModal isOpen={charactersModal} onClose={() => setCharactersModal(false)} />
                </div>
              </ListGroupItemText>
            </Media>
          </ListGroupItem>
        ))}
      </ListGroup>
      {locations.length === 0 && (
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

export default LocationsList;
