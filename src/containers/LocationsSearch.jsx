import React, { Fragment } from "react";
import {
  Col, Row, Card,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { filterLocations, getLocations } from '../store/ducks/locations';

const ButtonContainer = styled.div`
  margin-top:30px;
  margin-left:5px;
  display:inline-block;
`;

const LocationsSearch = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      search: '',
      filter: 'name',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(filterLocations(values));
      resetForm();
    },
  });
  const { values, setFieldValue, handleSubmit } = formik;

  return (
    <>
      <Row>
        <Col>
          <Link to="/">Home</Link>
        </Col>
      </Row>
      <Card body>
        <Row form>
          <Col sm={12} md={8}>
            <FormGroup>
              <Label for="search">Search Location</Label>
              <Input
                type="text"
                onChange={({ target: { value } }) => {
                  setFieldValue('search', value);
                }}
                name="search"
                id="search"
                placeholder="Search a location"
                value={values.search}
              />
            </FormGroup>
          </Col>
          <Col>
            <Label for="filter">Filter By</Label>
            <Input
              type="select"
              name="filter"
              id="filter"
              onChange={({ target: { value } }) => {
                setFieldValue('filter', value);
              }}
              value={values.filter}
            >
              <option>name</option>
              <option>dimension</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <ButtonContainer>
            <Button color="primary" onClick={handleSubmit}>Search</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button outline color="primary" onClick={() => dispatch(getLocations())}>Clear</Button>
          </ButtonContainer>
        </Row>
      </Card>
    </>
  );
};

export default LocationsSearch;
