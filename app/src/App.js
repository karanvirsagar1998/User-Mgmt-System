import React from 'react';
import axios from 'axios';  //to handle requests
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
    }
  }
  componentDidMount() {
    axios.get("http://localhost:8080/")
      .then((response) => {
        this.setState({
          users: response.data,
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
        })
      })
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios.post("http://localhost:8080/", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      }).then(() => {
        this.componentDidMount();
      })
    } else {
      axios.put("http://localhost:8080/", {
        id: id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      }).then(() => {
        this.componentDidMount();
      })
    }
  }
  delete(id) {
    axios.delete("http://localhost:8080/" + id)
      .then(() => {
        this.componentDidMount();
      })
  }
  edit(id) {
    axios.get("http://localhost:8080/" + id)
      .then((response) => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        })
      })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s4">
            <form onSubmit={(e) => this.submit(e, this.state.id)}>
              <div className="input-field col s12">
                <i className="material-icons prefix">person_pin</i>
                <input value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} type="text" id="autocomplete-input" className="autocomplete" />
                <label htmlFor="autocomplete-input">First Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">person_pin</i>
                <input value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} type="text" id="autocomplete-input" className="autocomplete" />
                <label htmlFor="autocomplete-input">Last Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">mail</i>
                <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="email" id="autocomplete-input" className="autocomplete" />
                <label htmlFor="autocomplete-input">Email</label>
              </div>
              <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
          <div className="col s8">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.users.map(user =>
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td id="tablePassword">{user.email}</td>
                      <td>
                        <button onClick={(e) => this.edit(user.id)} className="btn waves-effect waves-light" type="submit" name="action">
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => this.delete(user.id)} className="btn waves-effect waves-light" type="submit" name="action">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
