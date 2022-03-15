import React, {useState} from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import InputBase from "@mui/material/InputBase/InputBase";
import BeatLoader from 'react-spinners/BeatLoader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Locale} from "../constants/Locale";

function Header(props) {
  const [searchKey, setSearchKey] = useState("");
  const {classes, isLoading, setIsLoading, setLocale} = props;
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = '/search/';
    const url = routePath + encodeURI(searchKey);
    if (searchKey.length > 1 && url !== location.pathname) {
      setIsLoading(true);
      navigate(url);
    }
  }

  return (
    <AppBar className={classes.appBar} style={{backgroundColor: '#282c34'}} position="sticky">
      <Grid container width={1} style={{textAlign: 'left'}}>
        <Grid item xs={3}>
          <Typography component={Link} to="/" style={{textDecoration: 'none'}}
                      variant="h4"
                      color="inherit" noWrap>
            Kavuda.lk
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerColumn}>
          <div className={classes.search}>
            <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <InputBase
                name="search"
                placeholder="Search…"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={1} className={classes.loaderColumn}>
          <BeatLoader
            sizeUnit={"px"}
            size={14}
            color={'#36D7B7'}
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={2} className={classes.headerColumn}>
          <Grid container width={1} justify="flex-end" style={{textAlign: 'right'}}>
            <Grid item>
              <Button onClick={() => setLocale(Locale.en)} size="small" variant="outlined"
                      style={{color: 'white'}}>English</Button>
              <Button onClick={() => setLocale(Locale.sinhala)} size="small" variant="outlined"
                      style={{color: 'white'}}>සිංහල</Button>
              <Button onClick={() => setLocale(Locale.tamil)} size="small" variant="outlined"
                      style={{color: 'white'}}>
                தமிழ்</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default withStyles(Styles)(Header);