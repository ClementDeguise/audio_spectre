import React from 'react';

import {IoIosPlay, IoIosPause} from 'react-icons/io'
import Track from './tracks/Riles-thank_god.mp3'
import Track2 from './tracks/fakear chakra.mp3'
import AudioAnalyser from './AudioAnalyser'


// https://www.w3schools.com/tags/ref_av_dom.asp




class App extends React.Component {

  constructor() {
    super();
    this.state={
      playing: false
    }

    this.switchAudioStream = this.switchAudioStream.bind(this);

  }


  /* IMPORTANT

  The embedded HTML player element allows easy loading, playing and pausing of audio HTML elements, as we used below.

  However, using the WEB AUDIO API for processing the signal will override the player properties. 
  As such, passing the audio file to the analyser without setting an output will overwrite the player, and the audio
  will not be played despite successful calls to player.play().

  Therefore we have to only use the Web Audio API and setup a gain node and output destination (speakers) in the analyser.
  
  BUT the player still works, for instance unpausing will still resume the file as it writes the audio element that is then passed to the analyser.





  */




  componentDidMount() {
    this.player.src = Track2;
    this.player.load();
  }




  turnOn() {
    this.player.play();
    //console.log("playing");
    this.setState({
      playing: true
    })
  }

  turnOff() {

    this.player.pause();
    //console.log("pausing");
    this.setState({
      playing: false
    })


  }


  switchAudioStream() {
    this.state.playing ? this.turnOff() : this.turnOn();
    //console.log(this.state.playing);
  }

  // add a reference in the audio to the html player element, which have methods to play and pause tracks (see first link above)

  render() {

    return (
      <div className="App">
       
        <header className="top-header"><b>Audio spectre</b></header>


          <div className="play-button" onClick={this.switchAudioStream}>
            {this.state.playing ? <IoIosPause className="pause" /> : <IoIosPlay className="play" />}
          </div>
          
          <div>
           <audio ref={ref => (this.player = ref)} />
          </div>

          <div>
          {this.state.playing ? <AudioAnalyser audio={document.querySelector('audio')}/> : ''}
        </div>

      </div>
    );
  }

}



export default App;
