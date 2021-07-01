import styled from 'styled-components';

const PageContainer = styled.div`
  position: relative;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${(props) => props.theme.sizes.halfSpacer};
  padding-left: ${(props) => props.theme.sizes.halfSpacer};
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
    padding-right: ${(props) => props.theme.sizes.baseSpacer};
    padding-left: ${(props) => props.theme.sizes.baseSpacer};
  }
`;

export default PageContainer;
