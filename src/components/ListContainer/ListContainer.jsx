import React from "react";
import styled from "styled-components";

import PageHeader from "components/PageHeader";

const Container = styled.div`
  height: 600px;
  box-sizing: border-box;
  width: 500px;
  padding: 20px;
  background: #fafafa;
`;

const ListContainer = ({ setMenu, header, children, component }) => {
  return (
    <Container>
      {header ? (
        <PageHeader setMenu={setMenu} header={header} action={component} />
      ) : null}
      {children}
    </Container>
  );
};

export default ListContainer;
