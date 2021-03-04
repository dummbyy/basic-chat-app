import React from 'react';
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 

import Spinner from 'react-spinkit';

import Chat from './components/Chat'

import Sidebar from './components/Sidebar';
import Header from './components/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Login from './components/Login'
function App() {
  const [user ,loading] = useAuthState(auth);

  if(loading){
    return (
    <AppLoading>
        <AppLoadingContents>
          
          <img src="https://i.ibb.co/Xb04kNk/s-letter-logo-design-letter-s-design-s-logo-vector-28025074-removebg-preview-1.png" alt=""/>

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none"/>
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return(
     <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ) : (
        <>
          <Header/>
            <AppBody>
              <Sidebar/>
              <Switch>
                <Route path='/' exact>
                    <Chat />
                </Route>
              </Switch>
            </AppBody>
        </>
        )}

      </Router>
    </div>
  )
}

export default App;

const AppLoading = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    width: 100%;

`;

const AppLoadingContents = styled.div`
    text-align:center;
    padding-bottom:100px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;

    >img {
      height: 100px;
      padding: 20px;
      margin-bottom: 40px;
    }
`;
const AppBody = styled.div`
    display:flex;
    height:100vh;
`;
