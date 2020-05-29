import React from 'react';
import CONSTANTS from '../Constants.js'
import {cleanIdolGroupName} from './Utils.js'
import './CardDetails.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'

class CardDetails extends React.Component {

	constructor(props) {
		super(props);

		var dataReady;
		var cardData;
		var displayNameInfo;

		if(props.cardData === undefined) {
			dataReady = false
			cardData = null
		} else {
			dataReady = true
			cardData = props.cardData
		}

		this.state = {
			dataReady: dataReady,
			cardData: cardData,
			displayNameInfo: displayNameInfo
		}; 

		console.log(this.state)
	}
	

	componentDidMount() {
		if (this.state.cardData == null) {
			fetch(CONSTANTS.API_URL + CONSTANTS.CARD_BY_ID_PATH + this.props.cardid)
				.then(res => res.json())
				.then((data) => {
					this.setState({dataReady: true, cardData: data})
				})
				.catch(console.log)
		}
	}

	render() {
		if(!this.state.dataReady) {
			return <div>Loading...</div>
		}

		let normalCardIconUrl = CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.state.cardData.id + CONSTANTS.ICON_NORMAL;
		let idolizedCardIconUrl = CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.state.cardData.id + CONSTANTS.ICON_IDOLIZED;
		let idolIconUrl = CONSTANTS.API_URL + CONSTANTS.IDOL_ICON_PATH + this.state.cardData.idol.firstName + ".png"

		return (
			<Container id='card-content-container'>
				<Row>
					<Col xs={12} md={6} className="icon-images content-nopad">
						<div>
							<Image fluid rounded src={normalCardIconUrl} alt="IconN" />
							<Image fluid rounded src={idolizedCardIconUrl} alt="IconI" />
						</div>
					</Col>
					<Col xs={12} md={6} className="name-container content-nopad">
						<h1><Image fluid src={idolIconUrl} /> {this.state.cardData.idol.firstName} {this.state.cardData.idol.lastName}</h1>
						<ul>
							<li>{this.state.cardData.title}</li>
							<li>{this.state.cardData.idolizedTitle}</li>
						</ul>
					</Col>
				</Row>
				<Row className="stats-info-row">
					<Col xs={12} md={6} className="stats-container content-nopad">
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>LB</th>
									<th>Appeal</th>
									<th>Stamina</th>
									<th>Technique</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>0</td>
									<td>{this.state.cardData.appeal.lb0}</td>
									<td>{this.state.cardData.stamina.lb0}</td>
									<td>{this.state.cardData.technique.lb0}</td>
								</tr>
								<tr>
									<td>1</td>
									<td>{this.state.cardData.appeal.lb1}</td>
									<td>{this.state.cardData.stamina.lb1}</td>
									<td>{this.state.cardData.technique.lb1}</td>
								</tr>
								<tr>
									<td>2</td>
									<td>{this.state.cardData.appeal.lb2}</td>
									<td>{this.state.cardData.stamina.lb2}</td>
									<td>{this.state.cardData.technique.lb2}</td>
								</tr>
								<tr>
									<td>3</td>
									<td>{this.state.cardData.appeal.lb3}</td>
									<td>{this.state.cardData.stamina.lb3}</td>
									<td>{this.state.cardData.technique.lb3}</td>
								</tr>
								<tr>
									<td>4</td>
									<td>{this.state.cardData.appeal.lb4}</td>
									<td>{this.state.cardData.stamina.lb4}</td>
									<td>{this.state.cardData.technique.lb4}</td>
								</tr>
								<tr>
									<td>5</td>
									<td>{this.state.cardData.appeal.lb5}</td>
									<td>{this.state.cardData.stamina.lb5}</td>
									<td>{this.state.cardData.technique.lb5}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col xs={12} md={6} className="info-container content-nopad">
						<Table bordered size="sm">
							<thead>
								<tr>
									<th colSpan="2">
										Info
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Rarity</td>
									<td>{this.state.cardData.rarity.name}</td>
								</tr>
								<tr>
									<td>Attribute</td>
									<td>{this.state.cardData.attribute.name}</td>
								</tr>
								<tr>
									<td>Type</td>
									<td>{this.state.cardData.cardType.name}</td>
								</tr>
								<tr>
									<td>Year</td>
									<td>{this.state.cardData.idol.year}</td>
								</tr>
								<tr>
									<td>Group</td>
									<td>{cleanIdolGroupName(this.state.cardData.idol.idolGroup.name)}</td>
								</tr>
								<tr>
									<td>Subunit</td>
									<td>{this.state.cardData.idol.subunit.name}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col className="content-nopad">
						<Table bordered size="sm">
							<thead>
								<tr>
									<th colSpan="2">
										Abilities
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Active</td>
									<td>{this.state.cardData.primaryActiveAbilityText}</td>
								</tr>
								<tr>
									<td>Passive</td>
									<td>{this.state.cardData.passiveAbility.abilityText}</td>
								</tr>
								<tr>
									<td>Triggered</td>
									<td>{this.state.cardData.secondaryActiveAbilityText}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default CardDetails;