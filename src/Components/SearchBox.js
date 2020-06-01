import React from 'react';
import CONSTANTS from '../Constants.js'

import './SearchBox.css'

import CardTableEntry from './CardTableEntry'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'


class SearchBox extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			query: "",
			searchResults: [],
			pinnedCards: [],
			searchTimeout: null,
			selectedLB: "0"
		}

		this.handleSearch = this.handleSearch.bind(this)
		this.handleLBChanged = this.handleLBChanged.bind(this)
		this.handlePin = this.handlePin.bind(this)
	}

	handleSearch(event) {

		clearTimeout(this.state.searchTimeout)

		let query = event.target.value

		if(query === "") {
			this.setState({searchResults: []})
		} 
		else if(query.length > 1) {
			var newTimeout = setTimeout(() => {
				fetch(CONSTANTS.API_URL + CONSTANTS.SEARCH_PATH + query)
					.then(res => res.json())
					.then((data) => {
						this.setState({searchResults: data})
					})
					.catch(console.log)
			}, 600)

			this.setState({searchTimeout: newTimeout})
		}
	}

	handleLBChanged(event) {
		this.setState({selectedLB: event.target.getAttribute("lb")})
	}

	handlePin(card, add) {
		if(add) {
			if(!this.state.pinnedCards.includes(card)) {
				this.setState({pinnedCards: [...this.state.pinnedCards, card]})
			}
		}

		else {
			this.setState({pinnedCards: this.state.pinnedCards.filter(pinnedCard => pinnedCard.id !== card.id)})
		}
	}

	render() {

		let tableEntries = this.state.searchResults.map((card, key) =>
			<CardTableEntry key={card.id} cardData={card} selectedLB={this.state.selectedLB} extraColumns={
				<td className="button-cell">
					<Button onClick={() => this.handlePin(card, true)}>Pin</Button>
				</td>
			} />);

		let pinnedTableEntries = this.state.pinnedCards.map((card, key) =>
			<CardTableEntry key={card.id} cardData={card} selectedLB={this.state.selectedLB} extraColumns={
				<td className="button-cell">
					<Button onClick={() => this.handlePin(card, false)}>Unpin</Button>
				</td>
			} />);
		
		return(
			<Col>
				<Form.Group>
					<Row>
						<Col>
							<Form.Control size="lg" type="text" id="text-field" placeholder="Type something..." onChange={this.handleSearch} />
						</Col>
					</Row>
				</Form.Group>
				<Row>
					<Table variant="dark" bordered size="sm" id="cardTable">
						<thead>
							<tr>
								<th colSpan="4" className="table-results-header"><h5>Search Results</h5></th>
								<th colSpan="3" className="table-button-header">
									<Dropdown className="size-limited-button">
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
								<th colSpan="1">
								</th>
							</tr>
						</thead>
						<tbody>
							{pinnedTableEntries}
							{tableEntries}
						</tbody>
					</Table>
				</Row>
			</Col>

		)
	}
}

export default SearchBox;