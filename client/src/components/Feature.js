import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Youtube from 'react-youtube'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'

class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoTitle: '',
      videoId: '',
      channelTitle: '',
      thumbnail: '',
      showModal: false
    }
  }

  handleShow = () => this.setState({showModal: true})

  handleClose = () => this.setState({showModal: false})

  componentDidMount() {
    fetch('/featured')
    .then(res => res.json())
    .then(data => {
      /* Format of data
      [{
        "n": {
          "type": "featured",
          "thumbnail":"https://i.ytimg.com/vi/wS9OGHe16R4/hqdefault.jpg",
          "videoId":"wS9OGHe16R4",
          "videoTitle":"WORLDS HARDEST CLIMBING TEST | #153",
          "channelId":"UC_gSotrFVZ_PiAxo3fTQVuQ",
          "channelTitle":"Magnus Midtbø"
        }
      }]
      */
      console.log('data', data)
      this.setState({videoTitle: data[0].n.videoTitle, videoId: data[0].n.videoId, channelTitle: data[0].n.channelTitle, thumbnail: data[0].n.thumbnail})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='bg-light-gray ba'>
        <div className='pa0 flex flex-wrap'>
        	<div className='fl w-40'>
        		{/* <Image className='pa0' src="https://via.placeholder.com/480x270" thumbnail /> */}
            <button
              onClick={this.handleShow}
              className='w-100 pa0 b--none'
            >
              <Image className='pa0 w-100' src={this.state.thumbnail} thumbnail />
            </button>
            
        	</div>
        	<div className='fl w-60'>
        		<h3 className='bb b--gray'>{this.state.videoTitle}</h3>
        		<p className='gray'>{this.state.channelTitle}</p>
        	</div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose} size='lg' centered>
          <Modal.Body>
            <h4>{this.state.videoTitle}</h4>
            <Youtube videoId={this.state.videoId} className='w-100'/>
          </Modal.Body>

          {/* Section to add comments feature later
          <Modal.Footer>
            
          </Modal.Footer>
          */}
        </Modal>
      </div>
    );
  }
}

export default Feature;