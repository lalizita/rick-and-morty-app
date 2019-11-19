import React, { Fragment, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

const PaginationComponent = ({ children, limitPerPAge }) => {
  // const [ currentPage, setLimitPer ]
  return (
    <div>
      <Fragment>
        {children}
      </Fragment>
      <div>
        <Pagination>
          <PaginationItem disabled>
            <PaginationLink first href="#" />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  )
}

export default PaginationComponent;
