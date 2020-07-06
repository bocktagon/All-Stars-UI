import React from 'react';
import CONSTANTS from '../Constants.js'
import {cleanIdolGroupName} from './Utils.js'
import {parseBuffTarget} from './Utils.js'
import {parsePassiveBuffLevel} from './Utils.js'
import './CardDetails.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'

class CardDetails extends React.Component {

	constructor(props) {
		super(props);

		var dataReady;
		var cardData;

		if(props.cardData === undefined || props.cardData === null) {
			dataReady = false
			cardData = null
		} else {
			dataReady = true
			cardData = props.cardData
		}

		this.state = {
			dataReady: dataReady,
			cardData: cardData,
			XSselectedLB: "0"
		}; 

		this.handleLBChanged = this.handleLBChanged.bind(this)
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

	handleLBChanged(event) {
		this.props.lbChangedCallback(event.target.getAttribute("lb"))
		this.setState({XSselectedLB: event.target.getAttribute("lb")})
	}

	render() {
		if(!this.state.dataReady) {
			return <div>Loading...</div>
		}

		let normalCardIcon = 
			<Image fluid rounded src=
				{CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.state.cardData.id + CONSTANTS.ICON_NORMAL}
				alt="IconN" />;
		let idolizedCardIcon =
			<Image fluid rounded src=
				{CONSTANTS.API_URL + CONSTANTS.CARD_ICON_PATH + this.state.cardData.id + CONSTANTS.ICON_IDOLIZED}
				alt="IconI" />

		let idolIconUrl = CONSTANTS.API_URL + CONSTANTS.IDOL_ICON_PATH + this.state.cardData.idol.firstName + ".png"

		let nameInfo = 
			<div>
				<h1><Image fluid src={idolIconUrl} /> {this.state.cardData.idol.firstName} {this.state.cardData.idol.lastName}</h1>
				<ul>
					<li>{this.state.cardData.title}</li>
					<li>{this.state.cardData.idolizedTitle}</li>
				</ul>
			</div>

		let statsTable = 
			<Table bordered size="sm">
				<thead>
					<tr>
						<td>LB</td>
						<td>Appeal</td>
						<td>Stamina</td>
						<td>Technique</td>
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

		let infoTable = 
			<Table bordered size="sm">
				<thead>
					<tr colSpan="2">
						<td colSpan="2">Info</td>
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

		let abilityTable =
			<Table bordered size="sm">
				<thead>
					<tr colSpan="2">
						<td colSpan="2">Primary Skill</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colSpan="2">{this.state.cardData.primaryActiveAbilityText}</td>
					</tr>
				</tbody>
				<thead>
					<tr colSpan="2">
						<td colSpan="2">Abilities</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Passive</td>
						<td>{this.state.cardData.passiveAbility.abilityText}</td>
					</tr>
					<tr>
						<td>Active</td>
						<td>{this.state.cardData.secondaryActiveAbilityText}</td>
					</tr>
				</tbody>
			</Table>

		if(this.props.size === "extra-small") {
			return (
				<div className='extra-small-container'>
					<Container id='card-content-container'>
						<Col className='content-nopad'>
							<Row>
								{idolizedCardIcon}
							</Row>
							<Row className="pad-top">
								<Dropdown>
									<Dropdown.Toggle className="xs-lb-dropdown">
										LB {this.state.XSselectedLB}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={this.handleLBChanged} lb="0">Display LB 0</Dropdown.Item>
										<Dropdown.Item onClick={this.handleLBChanged} lb="1">Display LB 1</Dropdown.Item>
										<Dropdown.Item onClick={this.handleLBChanged} lb="2">Display LB 2</Dropdown.Item>
										<Dropdown.Item onClick={this.handleLBChanged} lb="3">Display LB 3</Dropdown.Item>
										<Dropdown.Item onClick={this.handleLBChanged} lb="4">Display LB 4</Dropdown.Item>
										<Dropdown.Item onClick={this.handleLBChanged} lb="5">Display LB 5</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Row>
							<Row className="pad-top">
								<Table bordered size="sm" className="stats-table">
									<tbody>
										<tr>
											<td className="tight-cell"><Image src={CONSTANTS.API_URL + CONSTANTS.ICON_PATH + "/appeal.png"} /></td>
											<td className="centered-content">{this.state.cardData.appeal['lb' + this.state.XSselectedLB]}</td>
										</tr>
										<tr>
											<td className="tight-cell"><Image src={CONSTANTS.API_URL + CONSTANTS.ICON_PATH + "/stamina.png"} /></td>
											<td className="centered-content">{this.state.cardData.stamina['lb' + this.state.XSselectedLB]}</td>
										</tr>
										<tr>
											<td className="tight-cell"><Image src={CONSTANTS.API_URL + CONSTANTS.ICON_PATH + "/technique.png"} /></td>
											<td className="centered-content">{this.state.cardData.technique['lb' + this.state.XSselectedLB]}</td>
										</tr>
									</tbody>
								</Table>
							</Row>
							<Row className="pad-top">
								<Table bordered size="sm">
									<thead>
										<tr>
											<th>
												Passive Buff
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{parseBuffTarget(this.state.cardData)} by {this.state.cardData.passiveAbility['buffLvl' + parsePassiveBuffLevel(this.state.XSselectedLB)]}%</td>
										</tr>
									</tbody>
								</Table>
							</Row>
						</Col>
					</Container>
				</div>
			)
		}

		if(this.props.size === "small") {
			return (
				<div className='small-container'>
					<Container id='card-content-container'>
						<Col className="content-nopad">
							<Row>
								<div>
									{normalCardIcon}
									{idolizedCardIcon} 
								</div>
							</Row>
							<Row>
								{statsTable}
							</Row>
							<Row>
								{abilityTable}
							</Row>
						</Col>
					</Container>
				</div>
			)
		}

		return (
			<Container id='card-content-container'>
				<Row>
					<Col xs={12} md={12} lg={6} className="icon-images content-nopad">
						<div>
							{normalCardIcon}
							{idolizedCardIcon} 
						</div>
					</Col>
					<Col xs={12} md={12} lg={6} className="name-container content-nopad">
						{nameInfo}
					</Col>
				</Row>
				<Row className="stats-info-row">
					<Col xs={12} md={7} lg={6} className="stats-container content-nopad">
						{statsTable}
					</Col>
					<Col xs={12} md={5} lg={6} className="info-container content-nopad">
						{infoTable}
					</Col>
				</Row>
				<Row>
					<Col className="content-nopad">
						{abilityTable}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default CardDetails;