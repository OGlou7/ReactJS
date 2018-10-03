import React, { Component } from 'react'
import logo                 from '../assets/logo.svg'
import '../css/App.css'
import { establishments }    from './establishments/fixtures'
import Establishment    from './establishments/Establishment'
import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBTxZcRtJQ8UQ-BBB0SPzNXSXEYiDheP-A",
  authDomain: "reactjs-happydrink.firebaseapp.com",
  databaseURL: "https://reactjs-happydrink.firebaseio.com",
  storageBucket: "reactjs-happydrink.appspot.com",
  messagingSenderId: "588769235863"
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            pseudo  : "Inconnu",
            searchStringUser: "",
            establishments: [
                {
                    id          : "0890786GH",
                    name        : "Biberium",
                    description : "Un super bar karaoké"
                },
                {
                    id          : "0890786GD",
                    name        : "Brew Dogs",
                    description : "Un super bar à bière"
                },
                {
                    id          : "MJLMH0389",
                    name        : "Batonier",
                    description : "Un super bar de fin de soirée"
                }
            ]
          }
      }
      handleChange(e){
        this.setState({searchStringUser: e.target.value});
    }

      // componentWillMount () {
      //     console.log("componentWillMount")
      // }
        componentDidMount(){
          base.post(`establishments`,{
            data: this.state.establishments
          });
        }
    //   componentDidMount (){
    //       console.log("componentDidMount");
    //     base.syncState(`/`, {
    //         context: this,
    //         state: 'establishments',
    //         asArray: true
    //     });
    // }

    randomPseudo = () => {
        let randomPseudo    = ""
        const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        const size          = Math.floor(Math.random() * 10) + 5
        for( let i=0; i < size; i++ ){
          randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        this.setState({
            pseudo : randomPseudo
        })
      }
    render() {
      const establishmentFilter = establishments.filter((searchText) => {
      let search = searchText.name + " " + searchText.description;
      return search.toLowerCase().match(this.state.searchStringUser);
    })

      const listEstablishment = establishmentFilter.map( (establishment) => {
        return (
          <Establishment
            key={ establishment.id }
            establishment={ establishment }
          />
      )
    })

    return (
      <div className="App">
       <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <h2>Welcome "{ this.state.pseudo }" to { this.props.title } HappyDrink</h2>
       </header>
       <div className="App-intro">
         <p> <a onClick={ this.randomPseudo } >Changer le pseudo !</a> </p>
         <div>
           <input
             type="text"
             placeholder="search"
             value={this.state.searchStringUser}
             onChange={this.handleChange.bind(this)}
           />
         </div>
         <section>
             { listEstablishment }
         </section>
        </div>
      </div>
    );
    }
  }

export default App;
