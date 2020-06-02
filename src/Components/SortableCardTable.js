import React from 'react'
import CONSTANTS from '../Constants.js'
import CardTableEntry from './CardTableEntry'

import './SortableCardTable.css'

import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

class SortableCardTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			dataReady: false,
			cardList: null,
			selectedLB: "0",
			currentSortType: null
		}

		this.handleLBChanged = this.handleLBChanged.bind(this)
		this.handleSortChanged = this.handleSortChanged.bind(this)
		this.sortDescending = this.sortDescending.bind(this)
	}

	componentDidMount() {
		fetch(CONSTANTS.API_URL + '/cards/rarity/UR')
			.then(res => res.json())
			.then((data) => {
				this.setState({dataReady: true, cardList: data})
			})
			.catch(console.log)
	}

	handleLBChanged(event) {
		this.setState({selectedLB: event.target.getAttribute("lb")})
	}

	handleSortChanged(event) {

		let sortedCards = [...this.state.cardList];

		sortedCards.sort((a, b) => this.sortDescending(a, b, event.target.getAttribute('sorttype')));

		this.setState({cardList: sortedCards, currentSortType: event.target.getAttribute('sorttype')});
	}

	sortDescending(a, b, sortType) {
		return b[sortType]['lb' + this.state.selectedLB] 
				- a[sortType]['lb' + this.state.selectedLB];
	}

	render() {
		if(!this.state.dataReady) {
			return <div>Loading...</div>
		}

		let tableEntries = this.state.cardList.map((card, key) =>
			<CardTableEntry key={card.id} cardData={card} selectedLB={this.state.selectedLB} />);

		return (
			<Table variant="dark" bordered size="sm" id="cardTable">
				<thead>
					<tr>
						<th colSpan="5" className="info-header">Click a stat to sort on it. Click the drop-down to choose an LB.</th>
						<th colSpan="3">
							<Dropdown>
								<Dropdown.Toggle block>
									Displaying LB {this.state.selectedLB}
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
						</th>
					</tr>
					<tr>
						<th colSpan="5">Card Info</th>
						<th><Button variant={this.state.currentSortType === "appeal" ? "light" : "outline-light"} onClick={this.handleSortChanged} sorttype="appeal">Appeal</Button></th>
						<th><Button variant={this.state.currentSortType === "stamina" ? "light" : "outline-light"} onClick={this.handleSortChanged} sorttype="stamina">Stamina</Button></th>
						<th><Button variant={this.state.currentSortType === "technique" ? "light" : "outline-light"} onClick={this.handleSortChanged} sorttype="technique">Technique</Button></th>
					</tr>
				</thead>
				<tbody>
					{tableEntries}
				</tbody>
			</Table>
		)
	}
}

export default SortableCardTable;