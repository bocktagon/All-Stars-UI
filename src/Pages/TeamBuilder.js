import React from 'react';

import CardSelector from '../Components/CardSelector.js'
import CardDetails from '../Components/CardDetails.js'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './TeamBuilder.css'


class TeamBuilder extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			red: {
				left: {
					card: null,
					lb: null,
					component: ""
				},
				middle: {
					card: null,
					lb: null,
					component: ""
				},
				right: {
					card: null,
					lb: null,
					component: ""
				}
			},
			green: {
				left: {
					card: null,
					lb: null,
					component: ""
				},
				middle: {
					card: null,
					lb: null,
					component: ""
				},
				right: {
					card: null,
					lb: null,
					component: ""
				}
			},
			blue: {
				left: {
					card: null,
					lb: null,
					component: ""
				},
				middle: {
					card: null,
					lb: null,
					component: ""
				},
				right: {
					card: null,
					lb: null,
					component: ""
				}
			}
		}

		this.handleCardSelected = this.handleCardSelected.bind(this)
		this.handleLBChanged = this.handleLBChanged.bind(this)
		this.buildCardDetailComponent = this.buildCardDetailComponent.bind(this)
	}

	handleCardSelected(cardData, strategy, position) {
		const newState = this.state;
		newState[strategy][position].card = cardData;
		newState[strategy][position].lb = 0;
		this.setState({ newState });
	}

	handleLBChanged(newLB, strategy, position) {
		const newState = this.state;
		newState[strategy][position].lb = newLB;
		this.setState(newState)
	}

	buildCardDetailComponent(strategy, position) {
		const details = this.state[strategy][position].card === null ? "" : 
			<CardDetails cardData={this.state[strategy][position].card} size="extra-small" lbChangedCallback={newLB => this.handleLBChanged(newLB, strategy, position)}/>
		
		return (
			<Col className="no-padding card-container">
				<CardSelector cardSelectedCallback={newCardData => this.handleCardSelected(newCardData, strategy, position)} menuMode="modal"/>
				{details}
			</Col>
		)
	}

	calculateStrategyAppeal(strategy) {
		for(let [key, value] of Object.entries(this.state[strategy])) {
			if(value.card === null) {
				return "Select 3 cards for your " + strategy + " strategy"
			}
		}

		return this.state[strategy]["left"].card.appeal["lb" + this.state[strategy]["left"].lb]
			+ this.state[strategy]["middle"].card.appeal["lb" + this.state[strategy]["middle"].lb]
			+ this.state[strategy]["right"].card.appeal["lb" + this.state[strategy]["right"].lb]
	}

	calculateTotalStamina() {
		if(this.state.redLeft === null) {
			return "Select 9 cards"
		}

		return this.state.redLeft.stamina.lb0 * 9
	}


	render() {
		let redLeftComponent = <CardDetails cardData={this.state.red.left.card} size="extra-small" lbChangedCallback={newLB => this.handleLBChanged(newLB, "ref", "left")}/>

		return (
			<div>
				<Row>
					<ul>
						<li>Red Appeal: {this.calculateStrategyAppeal("red")}</li>
						<li>Green Appeal: {this.calculateStrategyAppeal("green")}</li>
						<li>Blue Appeal: {this.calculateStrategyAppeal("blue")}</li>
					</ul>
				</Row>
				<Row className="cards-row">
					<Col xs={12} lg={4} className="strategy-col red-col">
						<Row>
							{this.buildCardDetailComponent("red", "left")}
							{this.buildCardDetailComponent("red", "middle")}
							{this.buildCardDetailComponent("red", "right")}
						</Row>
					</Col>
					<Col xs={12} lg={4} className="strategy-col green-col">
						<Row>
							{this.buildCardDetailComponent("green", "left")}
							{this.buildCardDetailComponent("green", "middle")}
							{this.buildCardDetailComponent("green", "right")}
						</Row>
					</Col>
					<Col xs={12} lg={4} className="strategy-col blue-col">
						<Row>
							{this.buildCardDetailComponent("blue", "left")}
							{this.buildCardDetailComponent("blue", "middle")}
							{this.buildCardDetailComponent("blue", "right")}
						</Row>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TeamBuilder;