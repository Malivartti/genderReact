import React from 'react'
import './App.css'

const serverUrlgender = 'https://api.genderize.io';

async function getGender(name) {
  if (!name) return ''
  const response  = await fetch(`${serverUrlgender}?name=${name}`)
  const result = await response.json()
  return await result.gender
}


class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    this.props.sendValue(this.state.value)
    e.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input className='input' type="text" placeholder='Name' value={this.state.value} onChange={this.handleChange} />
        <button className='button' type="submit">Search</button>
      </form>
    )
  }
}


function OutputApp(props) {
  let gender = props.gender
  if (gender == null) {
    gender = 'the alien'
  }
  return (
    <p className="output">Gender {props.name} is {gender}</p>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', gender: ''};
    this.getValue = this.getValue.bind(this);
  }

  async getValue(value) {
    const date = await getGender(value)
    this.setState({name: value});
    this.setState({gender: date})
  }

  render() {
    return (
      <div className="App">
        <FormApp sendValue={this.getValue}/>
        <OutputApp name={this.state.name} gender={this.state.gender}/>
      </div>
    )
  }
}


export default App
