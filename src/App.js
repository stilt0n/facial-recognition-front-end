import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/img-form/ImageInputForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';


const FACE_MODEL = "a403429f2ddf4b49b307e318f00e528b";
//the face model id for Clarifai
const clApp = new Clarifai.App({
  apiKey: //put key here
});

const particlesOptions = {
  particles: {
     number: {
      value: 55,
      density: {
        enable: true,
        value_area: 800
      },
      bounce: true,
      attract: {
        enable: true,
        rotateX: 15,
        rotateY: 20
      }
    }
  }
}

const defaultState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  signedIn: false,
  user: {
    id: '',
    name:'',
    email:'',
    entries: 0,
    joined:''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      signedIn: false,
      user: {
        id: '',
        name:'',
        email:'',
        entries: 0,
        joined:''
      }
    }
  }

  loadUser = (userObj) => {
    this.setState({user: {
      id: userObj.id,
      name: userObj.name,
      email: userObj.email,
      entries: userObj.entries,
      joined: userObj.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const cFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      //we need to return an object that figures out:
      //first dot:
      leftCol: cFace.left_col * width,
      //second dot:
      topRow: cFace.top_row * height,
      //third dot:
      rightCol: width - cFace.right_col * width,
      //fourth dot:
      bottomRow: height - cFace.bottom_row * height
    }

  }

  dispFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
      this.setState({imageUrl: this.state.input})
      //predict takes a model and an image url as inputs
      clApp.models.predict(
        FACE_MODEL, 
        this.state.input)
      .then((response) => {
        this.dispFaceBox(this.calculateFaceLocation(response));
        if (response) {
          fetch('https://agile-oasis-19176.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => Object.assign(this.state.user, {entries: count}));
        }
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(defaultState)
    } else if (route === 'homepage') {
      this.setState({signedIn: true})
    }
    this.setState({route: route});
  }

  render() {

    const { signedIn, imageUrl, route, box } = this.state;

    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions}/>
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'homepage'
          ? <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageInputForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            route === 'signIn' || route === 'signout'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )

      }
      </div>
    );
  }
}

export default App;