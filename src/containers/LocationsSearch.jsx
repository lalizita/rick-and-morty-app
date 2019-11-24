import React, { Fragment } from "react";
import {
  Col, Row, Card,
  FormGroup, Label, Input,
  Button, FormText,
} from 'reactstrap';
import * as Yup from 'yup';
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
    onSubmit: (values) => {
      dispatch(filterLocations(values));
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().required("Required field"),
      filter: Yup.string().required("Required field")
    }),
  });
  const { values, setFieldValue, handleSubmit, errors } = formik;

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
              {errors && errors.search && (
                <FormText> {errors.search} </FormText>
              )}
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
