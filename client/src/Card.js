import React, { Component } from 'react';
import Youtube from 'react-youtube'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'


class Card extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}
	}

	handleShow = () => this.setState({showModal: true})

	handleClose = () => this.setState({showModal: false})

	render() {
		const opts = {
			height: '390',
	      	width: '640',
	      	playerVars: { // https://developers.google.com/youtube/player_parameters
	        	autoplay: 1
	        }
		}
		return (
		  	<div className="fl w-20 ma2 flex-column bg-white shadow5">
				<div className="">
					<button
						onClick={this.handleShow}
						className='w-100 pa0 b--none'
					>
						<img src={this.props.thumbnail} className=''/>
					</button>
				</div>
				<div className="">
					<p><b>{this.props.title}</b></p>
				</div>
				<div className="bt b--gray flex-grow-1">
					<p className='mb0 gray relative v-btm'>{this.props.channel}</p>
				</div>
				<Modal show={this.state.showModal} onHide={this.handleClose} size='lg' centered>
					<Modal.Body>
						<h4>{this.props.title}</h4>
						<Youtube videoId={this.props.id} className='w-100'/>
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

export default Card;