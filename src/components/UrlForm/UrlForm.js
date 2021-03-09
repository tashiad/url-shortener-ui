import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      long_url: '',
      title: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUrl = { ...this.state }
    this.props.addUrl(newUrl)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', long_url: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='long_url'
          value={this.state.long_url}
          onChange={e => this.handleNameChange(e)}
        />
        { this.state.long_url && this.state.title ?
          <button name="submit" onClick={e => this.handleSubmit(e)}>
            Shorten Please!
          </button>
          :
          <button name="submit" disabled>Shorten Please!</button>
        }
      </form>
    )
  }
}

export default UrlForm;
