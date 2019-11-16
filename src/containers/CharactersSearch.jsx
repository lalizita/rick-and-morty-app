import React from 'react';
import {
  Col, Row, Card,
  FormGroup, Label, Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { filterCharacters } from '../actions/charactersAction';

const CharactersSearch = () => {
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.characters);

  const formik = useFormik({
    initialValues: {
      search: '',
      filter: '',
      species: 'none',
    },
  });
  const { values, setFieldValue } = formik;

  const filterList = (value) => {
    setFieldValue('search', value);
    let filtered;
    if (values.filter) {
      filtered = characters.filter((character) => {
        if (character.gender.toLowerCase() === values.filter.toLowerCase()) {
          return character.name
          && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      });
    }
    if (values.species !== 'none') {
      filtered = characters.filter((character) => {
        if (character.species
          && character.species.toLowerCase().indexOf(value.toLowerCase()) !== -1
          && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return character;
        }
      });
    }
    if (values.species !== 'none' && values.filter) {
      filtered = characters.filter((character) => {
        if ( character.gender.toLowerCase() === values.filter.toLowerCase()
        && character.species.toLowerCase().indexOf(value.toLowerCase()) !== -1
        && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return character;
        }
      });
    }
    filtered = characters.filter((character) => character.name
      && character.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    dispatch(filterCharacters(filtered));
  };

  const filterByGender = (gender) => {
    let filtered;
    if (values.filter === gender) {
      setFieldValue('filter', '');
      filterList(values.search);
    } else {
      setFieldValue('filter', gender);
      if (values.species !== 'none') {
        filtered = characters.filter((character) => {
          return character.gender.toLowerCase() === gender.toLowerCase()
          && character.species.toLowerCase().indexOf(values.species.toLowerCase()) !== -1
        });
      } else {
        filtered = characters.filter((character) => {
          return character.gender.toLowerCase() === gender.toLowerCase()
        });
      }
      dispatch(filterCharacters(filtered));
    }
  };

  const filterBySpecies = (value) => {
    setFieldValue('species', value);
    let filtered;
    if (value === 'none' && !values.filter) {
      filtered = characters;
    }
    if (value === 'none' && values.filter) {
      filtered = characters.filter((character) => {
        return character.gender.toLowerCase().indexOf(values.filter.toLowerCase()) !== -1
        || character.name.toLowerCase() === values.search.toLowerCase()
      });
    } else {
      filtered = characters.filter((character) => {
        if (!values.filter) {
          return character.species
          && character.species.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
        if (character.species
          && character.species.toLowerCase().indexOf(value.toLowerCase()) !== -1
          && character.gender.toLowerCase() === values.filter.toLowerCase()) {
          return character;
        }
      });
    }
    dispatch(filterCharacters(filtered));
  };

  return (
    <Card body>
      <Row form>
        <Col sm={12} md={8}>
          <FormGroup>
            <Label for="search">Search Character</Label>
            <Input
              type="text"
              onChange={({ target: { value } }) => {
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
            onChange={({ target: { value } }) => {
              filterBySpecies(value);
            }}
            value={values.species}
          >
            <option>none</option>
            <option>Human</option>
            <option>Alien</option>
          </Input>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <FormGroup style={{ marginLeft: 20 }}>
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
