import React, { Component } from 'react';
import Card from './Card'

class Wheel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			videos: []
		}
	}

	componentDidMount() {
		if(this.props.type === 'trending') {
			console.log('trending')
			fetch('/trending')
			.then(res => res.json())
			.then(data => {
				console.log('trending', data)
				let videoInfo = []
				data.forEach(video => {
					videoInfo.push({videoTitle: video.n.videoTitle, channelTitle: video.n.channelTitle, thumbnail: video.n.thumbnail, videoId: video.n.videoId })
				})
				this.setState({videos: videoInfo})
			})
			.catch(err => console.log(err))
		}
		else {
			console.log('recent')
			fetch('/recent')
			.then(res => res.json())
			.then(data => {
				console.log('recent', data)
				let videoInfo = []
				data.forEach(video => {
					videoInfo.push({videoTitle: video.n.videoTitle, channelTitle: video.n.channelTitle, thumbnail: video.n.thumbnail, videoId: video.n.videoId })
				})
				this.setState({videos: videoInfo})
			})
			.catch(err => console.log(err))
		}
	}


  	render() {
	    return (
	      <div className="w-100 flex">
	      	{
				this.state.videos.map((video) => {
					return (
				      	<Card key={video.thumbnail} thumbnail={video.thumbnail} title={video.videoTitle} channel={video.channelTitle} id={video.videoId}/>
					);
				})
			}
	      </div>
	    );
  	}
}

export default Wheel;