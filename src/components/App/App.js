import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({ urls: data.urls }))
    .catch(error => this.setState({ error: 'Something went wrong with the server. Please refresh the page or try again later' }))
  }

  addUrl = (newUrl) => {
    postUrl(newUrl)
    .then(data => this.setState({ urls: [...this.state.urls, data] }))
    .catch(error => console.log(error))
  }

  removeUrl = (id) => {
    const filteredUrls = this.state.urls.filter(url => url.id !== id)
    this.setState({ urls: filteredUrls })
    deleteUrl(id)
  }

  render() {
    return (
      <main className="App">

        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>

        <UrlContainer
          urls={this.state.urls}
          error={this.state.error}
          removeUrl={this.removeUrl}
        />

      </main>
    );
  }
}

export default App;
