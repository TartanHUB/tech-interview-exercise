import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import axios from 'axios';
import Modal from 'react-modal';

import logo from './images/logo.png';
import theme from './styles/theme';
import { PageContainer } from './components';
import CssReset from './styles/cssReset';
import Login from './views/Login';
import Gallery from './views/Gallery';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

Modal.setAppElement('#root');

const Navbar = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.sizes.halfSpacer} 0;
  margin-bottom: ${(props) => props.theme.sizes.baseSpacer};
`;

const App: FunctionComponent<unknown> = () => {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false, revalidateOnMount: true }}>
      <ThemeProvider theme={theme}>
        <CssReset />
        <Navbar>
          <PageContainer>
            <img src={logo} alt="" />
          </PageContainer>
        </Navbar>
        <PageContainer>
          <Router>
            <Login path="/" />
            <Gallery path="gallery" />
          </Router>
        </PageContainer>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
