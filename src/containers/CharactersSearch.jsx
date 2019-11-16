import React, { useState } from 'react';
import { Col, Row, Card, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { filterCharacters } from '../actions/charactersAction';

const CharactersSearch = () => {
  const dispatch = useDispatch();
  const { characters, filteredCharacters } = useSelector((state) => state.characters);

  const formik = useFormik({
    initialValues: {
      search: '',
      filter: '',
      species: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const { values, setFieldValue } = formik;

  const filterList = (value) => {
    setFieldValue('search', value);
    if (values.filter) {
      const filtered = characters.filter((character) => {
        if (character.gender.toLowerCase() === values.filter.toLowerCase()) {
          return character.name
          && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      });
      dispatch(filterCharacters(filtered));
      return;
    };
    const filtered = characters.filter((character) => {
      return character.name
      && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    });
    dispatch(filterCharacters(filtered));
  };

  const filterByGender = (gender) => {
    if (values.filter === gender) {
      setFieldValue('filter', '');
      filterList(values.search);
    } else {
      setFieldValue('filter', gender);
      const filtered = characters.filter((character) => {
        return character.gender.toLowerCase() === gender.toLowerCase()
      });
      dispatch(filterCharacters(filtered));
    }
  };

  return (
    <Card body>
      <Row form>
        <Col sm={12} md={8}>
          <FormGroup>
            <Label for="search">Search Character</Label>
            <Input
              type="text"
              onChange={({ target : { value } }) => {
                filterList(value);
              }}
              name="search"
              id="search"
              placeholder="Search a character" 
              value={values.search}
            />
          </FormGroup>
        </Col>
        <Col>
          <Label for="filter">Filter</Label>
          <Input
            type="select"
            name="filter"
            id="filter"
            onChange={({ target : { value } }) => {
              setFieldValue('filter', value);
            }}
            value={values.filter}
          >
            <option>name</option>
            <option>species</option>
          </Input>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <FormGroup style={{marginLeft:20}}>
            <Label check>
              <Input
                type="checkbox"
                checked={!!(values.filter === 'female')}
                onChange={() => filterByGender('female')} />{' '}
              Female
            </Label>
          </FormGroup>
        </Col>
        <Col sm={2}>
          <FormGroup>
            <Label check>
              <Input type="checkbox" checked={!!(values.filter === 'male')} onChange={() => filterByGender('male')} />{' '}
              Male
            </Label>
          </FormGroup>
        </Col>
        <Col sm={2}>
          <FormGroup>
            <Label check>
              <Input type="checkbox" checked={!!(values.filter === 'genderless')} onChange={() => filterByGender('genderless')} />{' '}
              Genderless
            </Label>
          </FormGroup>
        </Col>
        <Col sm={2}>
          <FormGroup>
            <Label check>
              <Input type="checkbox" checked={!!(values.filter === 'unknown')} onChange={() => filterByGender('unknown')} />{' '}
              unknown
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default CharactersSearch;
