import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualiser'





class AudioAnalyser extends Component {
 

	constructor(props) {
	    super(props);
	    this.state = { audioData: new Uint8Array(0) };
	    this.tick = this.tick.bind(this);
	}



	componentDidMount() {
	    this.audioContext = new window.AudioContext();
	    this.analyser = this.audioContext.createAnalyser();

	     // create the audio stream from the HTML audio element
	    this.source = this.audioContext.createMediaElementSource(this.props.audio);


	    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
	    console.log(this.dataArray);

	    // for some reason the data will always be in 1024 bytes
	    this.analyser.fftsize = 256;


	    this.source.connect(this.analyser);
	    this.rafId = requestAnimationFrame(this.tick);


	    // sourcing
	    this.gainNode = this.audioContext.createGain();
	    this.source.connect(this.gainNode);
	    this.gainNode.connect(this.audioContext.destination);
	}



	tick() {
	    this.analyser.getByteFrequencyData(this.dataArray);
	    this.setState({ audioData: this.dataArray });
	    this.rafId = requestAnimationFrame(this.tick);
	}


	componentWillUnmount() {
	    cancelAnimationFrame(this.rafId);
	    this.analyser.disconnect();
	    this.source.disconnect();
	}		



	render() {
		return (
			<AudioVisualiser audioData={this.state.audioData} />
		);
	}


}

export default AudioAnalyser;