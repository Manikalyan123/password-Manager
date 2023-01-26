import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const colors = ['green', 'red', 'blue', 'purple', 'yellow', 'pink']

class PasswordCreator extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    isShow: false,
  }

  onClickWebsite = e => {
    this.setState({website: e.target.value})
  }

  onClickPassword = e => {
    this.setState({password: e.target.value})
  }

  onClickUserName = e => {
    this.setState({username: e.target.value})
  }

  onAddPassword = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const classname = colors[Math.ceil(Math.random() * 6)]
    const Initial = website[0].toUpperCase()
    const newList = {
      userName: username,
      id: uuidv4(),
      Website: website,
      Password: password,
      class: classname,
      initial: Initial,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newList],
      website: '',
      username: '',
      password: '',
    }))
  }

  deleteItem = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: newPasswordList})
  }

  searchList = e => {
    const {passwordList} = this.state
    const searchWord = e.target.value
    const searchResults = passwordList.map(each => each.includes(searchWord))
    this.setState({passwordList: searchResults})
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  render() {
    const {website, username, password, passwordList, isShow} = this.state
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.onAddPassword}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-image"
                alt="website"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onClickWebsite}
                value={website}
              />
            </div>

            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-image"
                alt="username"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onClickUserName}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-image"
                alt="password"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onClickPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{passwordList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.searchList}
                value={this.searchList.searchWord}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {passwordList.length === 0 && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {passwordList.length !== 0 && (
            <ul className="result-container">
              {passwordList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.class}`}>
                    {eachValue.initial}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.Website}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}

                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>

                  <button
                    type="button"
                    className="del-btn"
                    onClick={this.deleteItem(eachValue.id)}
                    id="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordCreator
