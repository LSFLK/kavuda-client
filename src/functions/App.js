import {createTheme} from "@mui/material";

const THEME = createTheme({
  typography: {
    "fontFamily": `"Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

constructor(props) {
  super(props);
  this.state = {
    searchKey: "",
    searchResults: [],
    searchResultsPage: 0,
    trendingResults: [],
    trendingResultsPage: 0,
    homeResults: [],
    homeResultsPage: 0,
    loadedEntity: [],
    relatedResults: [],
    relatedResultsPage: 0,
    internalLinks: [],
    internalLinksPage: 0,
    loading: true,
    alertOpen: false,
    language: 'en'
  };

  this.handleChange = this.handleChange.bind(this);
  this.startLoading = this.startLoading.bind(this);
  this.endLoading = this.endLoading.bind(this);
  this.getSearchResults = this.getSearchResults.bind(this);
  this.getTrendingResults = this.getTrendingResults.bind(this);
  this.getRelatedResults = this.getRelatedResults.bind(this);
  this.getInternalLinks = this.getInternalLinks.bind(this);
  this.getHomeResults = this.getHomeResults.bind(this);
  this.getEntity = this.getEntity.bind(this);
}

startLoading() {
  this.setState({loading: true});
};

endLoading() {
  this.setState({loading: false});
}

handleChange(key, value) {
  this.setState({[key]: value});
}

async getHomeResults() {
  let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
  return await this.getResults(searchUrl, false, "homeResults", 15);

}

async getResults(searchUrl, newSearch, results, limit) {
  let page = results + "Page";
  this.startLoading();
  searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (this.state[page] + 1));
  const response = await fetch(searchUrl, {method: 'GET'});
  const json = await response.json();

  if (response.status === 200) {
    if (newSearch) {
      this.setState({
        [results]: json,
        [page]: 1
      });
    } else {
      if (json) {
        this.setState({
          [results]: this.state[results].concat(json),
          [page]: (this.state[page] + 1)
        })
      } else {
        this.endLoading();
        return false;
      }
    }
  }
  this.endLoading();
  return true
}

async getTrendingResults() {
  let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
  return await this.getResults(searchUrl, false, "trendingResults", 15)

}

async getSearchResults(searchKey, newSearch) {
  if (searchKey.length > 1) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
    if (searchKey.includes(":")) {
      let searchArray = searchKey.split(":", 2);
      searchUrl += searchArray[1] + '&categories=' + searchArray[0];
    } else {
      searchUrl += searchKey;
    }
    return await this.getResults(searchUrl, newSearch, "searchResults", 15)
  }
}

async getRelatedResults(title, newSearch) {
  if (title !== undefined) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/relations/' + title;
    return await this.getResults(searchUrl + '?', newSearch, "relatedResults", 4)
  }

}

async getInternalLinks(title, newSearch) {
  if (title !== undefined) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/links/' + title;
    return await this.getResults(searchUrl + '?', newSearch, "internalLinks", 15)
  }

}

async getEntity(title) {
  this.startLoading();
  fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + title, {
    method: 'GET'
  }).then(results => {
    if (results.status === 200) {
      return results.json();
    }
    return null
  }).then(data => {
    this.handleChange("loadedEntity", data);
  }).then(
    end => this.endLoading()
  );
}
