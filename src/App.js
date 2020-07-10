import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particlesparam = {
                particles: {
                  number: {
                    value:100,
                    density : {
                      enable:true,
                      value_area:800
                    }
                  }
                }
              };
const app = new Clarifai.App({
 apiKey: '28f3e57dca9945e9a95bd52c9b1407f2',
});
  class App extends React.Component {  
  constructor() {
    super();
    this.state ={
       input :'',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSigned:false,
      user : {
            id:'',
            name:'',
            email:'',
            entris:0,
      }
    };
  };
loadUser=(data)=>{
  this.setState({
    user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entris:data.entris
    }
  });
};
  calculateFaceLocation= (data) => {
   const clarifyface= data.outputs[0].data.regions[0].region_info.bounding_box;
   const image= document.getElementById('inputimage');
   const width= Number(image.width);
   const height= Number(image.height);
   return {
    leftCol:clarifyface.left_col * width,
    topRow: clarifyface.top_row * height,
    rightCol: width - (clarifyface.right_col * width),
    bottomRow : height -  (clarifyface.bottom_row * height),
   }
  };
  displayFaceBox=(box) => {
    this.setState({box});
  }
  onInputChange=(event)=>
  {
       this.setState({input:event.target.value});
      this.setState({imageUrl:event.target.value});

  };
  onButtonClick =() => {
     this.setState({imageUrl:this.state.input});
     app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=> {
      if(response) {
        fetch('http://localhost:3000/image', {
          method:'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          id:this.state.user.id,
      })
      })
        .then(response => response.json())
        .then(count=> {
        this.setState(Object.assign(this.state.user, {entris:count}))
      })
      }
    
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
    .catch(err => console.log(err)); 
  }
  onRouteChange =(route) => {
    if(route ==='home') { this.setState({isSigned:true}); }
    else if(route ==='signout')  { this.setState({isSigned:false}); }
    this.setState({route:route});

    
  }
  render() { 
    const {imageUrl,box,isSigned,route} =this.state;
  return (
      <div className="App">
      <Particles className='particles' params={particlesparam} />
      <header className="App-header">

        <Navigation isSigned={isSigned} onRouteChange={this.onRouteChange} />
        { route ==='signin' 
        ? 
            <Signin loadUser={this.loadUser} onRouteChange= {this.onRouteChange} />
        : ( route==='home' ? 
            <div>  <Logo />
                <Rank name={this.state.user.name} entris={this.state.user.entris} />
                <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonClick= {this.onButtonClick}
                 />
                 <FaceRecognition box={box} imageUrl= {imageUrl} />
          </div>
         :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </header>
    </div>
  );
}
}
export default App;
