import React from 'react'
import CONSTANTS from '../Constants.js'

import './CardTableEntry.css'

import CardDetails from './CardDetails.js'

import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import LazyLoad from 'react-lazy-load';


class CardTableEntry extends React.Component {

	constructor(props) {
		super(props);

		this.lbHandler = this.lbHandler.bind(this)

		this.state = {
			showModal: false
		}

		this.handleCloseModal = this.handleCloseModal.bind(this)
		this.handleShowModal = this.handleShowModal.bind(this)
	}

	lbHandler(stats) {
		switch(this.props.selectedLB){
			case "0":
				return stats.lb0
			case "1":
				return stats.lb1
			case "2":
				return stats.lb2
			case "3":
				return stats.lb3
			case "4":
				return stats.lb4
			case "5":
				return stats.lb5
			default:
				return "error"
		}
	}

	handleCloseModal() {
		this.setState({showModal: false})
	}

	handleShowModal() {
		this.setState({showModal: true})
	}

	render() {

		let normalCardIconUrl = CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.props.cardData.id + CONSTANTS.ICON_NORMAL;
		let idolizedCardIconUrl = CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.props.cardData.id + CONSTANTS.ICON_IDOLIZED;
		let idolIconUrl = CONSTANTS.API_URL + CONSTANTS.IDOL_ICON_PATH + this.props.cardData.idol.firstName.toLowerCase() + ".png"

		return (
			<tr className="table-row">
				<td className="icon-cell normal-icon">
					<LazyLoad height={64} offsetVertical={100} >
						<Image fluid rounded src={normalCardIconUrl} alt="Icon_N" />
					</LazyLoad>
				</td>
				<td className="icon-cell idolized-icon">
					<LazyLoad height={64} offsetVertical={100} >
						<Image fluid rounded src={idolizedCardIconUrl} alt="Icon_I" />
					</LazyLoad>
				</td>
				<td className="icon-cell idol-icon">
					<LazyLoad height={40} width={40} offsetVertical={100} >
						<Image fluid src={idolIconUrl} />
					</LazyLoad>
				</td>
				<td className="info-box">
					<div className="info-container">
						{this.props.cardData.idol.firstName} {this.props.cardData.idol.lastName}
						<ul>
							<li>{this.props.cardData.title}</li>
							<li>{this.props.cardData.idolizedTitle}</li>
						</ul>
					</div>
				</td>
				<td className="button-cell">
					<Button onClick={this.handleShowModal}>Details</Button>
					<Modal size="lg" show={this.state.showModal} onHide={this.handleCloseModal}>
						<Modal.Header closeButton>
							<Modal.Title>Card Info</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<CardDetails cardData={this.props.cardData} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleCloseModal}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</td>
				<td className="stats appeal">
					{this.lbHandler(this.props.cardData.appeal)}
				</td>
				<td className="stats stamina">
					{this.lbHandler(this.props.cardData.stamina)}
				</td>
				<td className="stats technique">
					{this.lbHandler(this.props.cardData.technique)}
				</td>
				{this.props.extraColumns}
			</tr>
		)
	}

}

export default CardTableEntry;