import React, { useEffect } from "react";
import {
  Container, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getLocations } from '../store/ducks/locations';
import LocationsList from '../containers/LocationsList';
// import CharactersSearch from '../containers/CharactersSearch';

const Locations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <LocationsList />
        </Col>
      </Row>
    </Container>
  );
};

export default Locations;