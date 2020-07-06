import React from 'react';
import CONSTANTS from '../Constants.js'

import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CardSelector extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			idolSelectText: "Select Idol",
			cardSelectText: "Select Card",
			idolOptions: [],
			cardOptions: [],
			cardListElements: [],
			selectedCard: null,
			showModal: false
		}

		this.handleIdolSelectMenu = this.handleIdolSelectMenu.bind(this);
		this.handleCardSelectMenu = this.handleCardSelectMenu.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this)
		this.handleShowModal = this.handleShowModal.bind(this)
	}

	componentDidMount() {
		fetch(CONSTANTS.API_URL + CONSTANTS.IDOLS_REF_PATH)
			.then(res => res.json())
			.then((data) => {
				this.setState({idolOptions: data})
			})
			.catch(console.log)
	}

	handleIdolSelectMenu(event) {
		this.setState({idolSelectText: event.target.innerText})
		fetch(CONSTANTS.API_URL + CONSTANTS.CARDS_BY_IDOL_PATH + event.target.innerText)
			.then(res => res.json())
			.then((data) => {
				this.setState({
						cardOptions: data,
						cardListElements: data.map((card, key) =>
							<Dropdown.Item key={card.id} cardid={card.id} onClick={this.handleCardSelectMenu}>{card.idolizedTitle}</Dropdown.Item>)
				 	})
			})
			.catch(console.log)
	}

	handleCardSelectMenu(event) {

		var card = this.state.cardOptions.find(element => element.id == event.target.getAttribute("cardid"));

		this.setState({
			cardSelectText: card.idolizedTitle,
			selectedCard: card,
			showModal: false
		})

		this.props.cardSelectedCallback(card)
	}

	handleCloseModal() {
		this.setState({showModal: false})
	}

	handleShowModal() {
		this.setState({showModal: true})
	}

	render() {
		const nameOptions = this.state.idolOptions.map((idol, key) =>
				<Dropdown.Item key={idol.id} onClick={this.handleIdolSelectMenu}>{idol.firstName}</Dropdown.Item>);

		const buttonMenu = <div id="selector-container container-fluid">
				<Dropdown block="True">
					<Dropdown.Toggle id="dropdown-basic" block>
						{this.state.idolSelectText}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{nameOptions}
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown block="True">
					<Dropdown.Toggle id="dropdown-basic" block>
						{this.state.cardSelectText}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{this.state.cardListElements}
					</Dropdown.Menu>
				</Dropdown>
			</div>;

		if(this.props.menuMode === "modal") {
			return (
				<div>
					<Button className="select-card-button" onClick={this.handleShowModal} block>
						Select Card
					</Button>

					<Modal show={this.state.showModal} onHide={this.handleCloseModal} centered>
						<Modal.Header closeButton>
							<Modal.Title>Select a Card</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{buttonMenu}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleCloseModal}>
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)
		} else {
			return (
				[buttonMenu]
			)
		}
	}
}

export default CardSelector;