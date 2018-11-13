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
  apiKey: '01caa341e4814061a6e7183be682c4cd'
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
      //see clarifai guide if there is confusion
      //"a403429f2ddf4b49b307e318f00e528b"
      //predict takes a model and an image url as inputs
      clApp.models.predict(
        FACE_MODEL, 
        this.state.input)
      .then((response) => {
        console.log('the response is:');
        console.log(response);
        this.dispFaceBox(this.calculateFaceLocation(response));
        if (response) {
          fetch('http://localhost:3001/image', {
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

//Clarifai API Clarifai.DETECT_FACE has changed to Clarifai.DETECT_FACE_MODEL
//"https://samples.clarifai.com/metro-north.jpg"
//your api key 01caa341e4814061a6e7183be682c4cd


/*
Info about set state:
  -setstate is asynchronous
  -React batches multiple calls to setState into one call
  -Then it re-renders the component a single time
  -this is why we can't call the imageUrl parameter directly
  -Because React will not be done updating the state by the time
  that Clarifai is called

  more info: https://reactjs.org/docs/react-component.html#setstate

Info about return from face detect function:
  returns a bounding box, these are co-ordinates expressed in terms of
  percentage some direction across the page.

  we can use these numbers to create the box
*/