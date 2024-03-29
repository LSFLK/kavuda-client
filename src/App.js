import React, {useState} from 'react';
import {Route, Routes,} from "react-router-dom";
import './App.css';
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import SearchResult from "./components/search/SearchResult";
import Profile from "./components/profile/Profile";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Locales} from "./components/constants/Locales";
import {AppRoutes} from "./routes";

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: 80
    },
    h3: {
      marginLeft: 24,
      fontSize: 30
    },
    h4: {
      fontSize: 24
    }
  },
});

const localeToken = 'kavuda-locale';

function App() {

  function setLocale(value) {
    localStorage.setItem(localeToken, value);
    setLocaleState(value);
  }

  function getLocaleCookie() {
    return localStorage.getItem(localeToken);
  }

  if (!getLocaleCookie()) {
    localStorage.setItem(localeToken, Locales.en);
  }

  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocaleState] = useState(getLocaleCookie());

  const app_props = {
    isLoading,
    setIsLoading,
    locale,
    setLocale,
    searchKey, setSearchKey
  };

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Routes>
          <Route element={<Header {...app_props}/>}>
            <Route path={AppRoutes.home} element={<Home {...app_props}/>}/>
            <Route path={AppRoutes.search + ":searchParam"} element={<SearchResult {...app_props}/>}/>
            <Route path={AppRoutes.entity + ":title"} element={<Profile {...app_props}/>}/>
            <Route path="*" element={<div>invalid url!</div>}/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App;
