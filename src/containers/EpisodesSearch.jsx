import React, { Fragment } from 'react';
import {
  Col, Row, Card,
  FormGroup, Label, Input,
  Button, FormFeedback,
} from 'reactstrap';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { filterEpisodes, getEpisodes } from '../store/ducks/episodes';

const ButtonContainer = styled.div`
  margin-top:30px;
  margin-left:5px;
  display:inline-block;
`;

const EpisodesSearch = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
      dispatch(filterEpisodes(values));
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().required("Required field"),
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
          <Col sm={12} md={7}>
            <FormGroup>
              <Label for="search">Search Episode</Label>
              <Input
                type="text"
                onChange={({ target: { value } }) => {
                  setFieldValue('search', value);
                }}
                name="search"
                id="search"
                placeholder="Search a episode"
                value={values.search}
              />
              {errors && errors.search && (
              <FormFeedback> {errors.search} </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col>
            <ButtonContainer>
              <Button color="primary" onClick={handleSubmit}>Search</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button outline color="primary" onClick={() => dispatch(getEpisodes())}>Clear</Button>
            </ButtonContainer>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default EpisodesSearch;
