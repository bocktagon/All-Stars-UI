import React from 'react';
import CONSTANTS from '../Constants.js'

import Dropdown from 'react-bootstrap/Dropdown'

import CardDetails from './CardDetails';

class CardSelector extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			idolSelectText: "Select Idol",
			cardSelectText: "Select Card",
			idolOptions: [],
			cardOptions: [],
			cardListElements: [],
			selectedCard: null
		}

		this.handleIdolSelectMenu = this.handleIdolSelectMenu.bind(this);
		this.handleCardSelectMenu = this.handleCardSelectMenu.bind(this);
	}

	componentDidMount() {
		fetch(CONSTANTS.API_URL + 'ref/idols')
			.then(res => res.json())
			.then((data) => {
				this.setState({idolOptions: data})
			})
			.catch(console.log)
	}

	handleIdolSelectMenu(event) {
		this.setState({idolSelectText: event.target.innerText})
		fetch(CONSTANTS.API_URL + 'cards/idol/' + event.target.innerText)
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
			selectedCard: card
		})
	}

	render() {
		const nameOptions = this.state.idolOptions.map((idol, key) =>
				<Dropdown.Item key={idol.id} onClick={this.handleIdolSelectMenu}>{idol.firstName}</Dropdown.Item>);

		let card;
		if(this.state.selectedCard != null) {
			card = <CardDetails cardData={this.state.selectedCard} />
		}

		return (
			<div id="selector-container container-fluid">
				<Dropdown block>
					<Dropdown.Toggle id="dropdown-basic" block>
						{this.state.idolSelectText}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{nameOptions}
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown block>
					<Dropdown.Toggle id="dropdown-basic" block>
						{this.state.cardSelectText}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{this.state.cardListElements}
					</Dropdown.Menu>
				</Dropdown>
				<div id="cardContainer">
					{card}
				</div>
			</div>
		)
	}
}

export default CardSelector;