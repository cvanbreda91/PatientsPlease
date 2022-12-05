import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Footer from './components/Footer';
import Nav from './components/Nav'
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import PatientNotes from './pages/PatientNotes';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import DoctorPage from './pages/DoctorsPage'


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Router>
          <Nav />
          <div className="flex-column justify-flex-start min-100-vh">
            <div className="container">

              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/forgotpassword"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/signup"
                  element={<Signup />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route
                  path="/patientnotes/:id"
                  element={<PatientNotes />}
                />
                <Route
                  path="*"
                  element={<NoMatch />}
                />
                <Route
                  path='/Doctor/1'
                  element={<DoctorPage />} />
              </Routes>

            </div>
            <Footer></Footer>
          </div>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;