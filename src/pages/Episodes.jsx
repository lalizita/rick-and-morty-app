import React, { useEffect } from "react";
import {
  Container, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getEpisodes } from '../store/ducks/episodes';
import EpisodesList from '../containers/EpisodesList';

const Episodes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEpisodes());
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <EpisodesList />
        </Col>
      </Row>
    </Container>
  );
};

export default Episodes;