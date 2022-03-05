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
    this.props.changeName(this.state.value)
    e.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input 
          className='input' 
          type="text" 
          placeholder='Name' 
          value={this.state.value} 
          onChange={this.handleChange} />
        <button 
          className='button' 
          type="submit">Search</button>
      </form>
    )
  }
}


function OutputApp(props) {
  const gender = props.gender
  let name = <span>Gender <span className='value'>{props.name}</span> is </span>
  let value;

  if (gender === '') return null;
  if (gender === null) {
    value = <span className='value'>the alien</span>
  } else if (props.name.length < 2) {
    name = ''
    value = <span style={{color: 'red'}}>Short name</span>
  } else {
    value = <span className='value'>{gender}</span>
  }
  return (
    <p className="output">{name} {value}</p>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', gender: ''};
    this.changeNameGender = this.changeNameGender.bind(this);
  }

  async changeNameGender(value) {
    const date = await getGender(value)
    this.setState({name: value, gender: date});
  }

  render() {
    return (
      <div className="App">
        <FormApp changeName={this.changeNameGender}/>
        <OutputApp name={this.state.name} gender={this.state.gender}/>
      </div>
    )
  }
}


export default App
