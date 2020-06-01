import React from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import SearchBox from './Components/SearchBox'
import SortableCardTable from './Components/SortableCardTable'

class HomePage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			currentHeader: null,
			currentContent: null
		}

		this.handleChangePage = this.handleChangePage.bind(this)

	}

	handleChangePage(page) {
		switch (page) {
			case "home":
				this.setState({currentHeader: this.homeHeader(), currentContent: null})
				break;
			case "search":
				this.setState({currentHeader: this.searchHeader(), currentContent: <SearchBox/>});
				break;
			case "stats":
				this.setState({currentHeader: this.statsHeader(), currentContent: <SortableCardTable/>});
				break;
			default:
				this.setState({currentHeader: this.homeHeader(), currentContent: null});
		}

		this.homeHeader = this.homeHeader.bind(this);
		this.searchHeader = this.searchHeader.bind(this);
		this.statsHeader = this.statsHeader.bind(this);
	}

	homeHeader() {
		return (
			<div style={{padding: "10px", marginBottom: "10px"}}>
				<h1>Bocktagon's All Stars Database</h1>
				<p>
					Welcome! This is the site I've been making for the past few weeks to try and do something productive during quarantine.
					This mainly came about as a way for me to get better at Spring and learn React, but hopefully it will evolve into a set of 
					tools that people can use to help build better teams. Eventually I would like to build a full blown team builder that will
					calculate stats when you give it 9 cards, but I'm tackling smaller ideas first to get better at front end design.
				</p>
				<p>
					I'll write more here eventually. In the mean time check out the githubs for  
					<a href="https://github.com/bocktagon/All-Stars-UI"> this project</a> and the  
					<a href="https://github.com/bocktagon/LLAS_API"> back-end API project.</a>
				</p>
			</div>
		)
	}

	searchHeader() {
		return (
			<div style={{padding: "10px", borderBottom: "solid black 1px", marginBottom: "10px"}}>
				<h1>Card Search</h1>
				<p>
					Search for cards to check stats quickly. Pin cards to the top of the list to make it easy to compare stats and abilities. 
					Sometimes if the site hasn't been poked in a while it'll take a minute to load while the Google instance spins back up. 
					I'll fix that ~eventually~.
				</p>
				<p>
					You can check out the search documentation on 
					<a href="https://github.com/bocktagon/LLAS_API#text-search-support"> The API's github page.</a> If you find a bug,
					yell at Bocktagon on Discord or <a href="https://twitter.com/Bocktagon37">Twitter</a>
				</p>
			</div>
		)
	}

	statsHeader() {
		return (
			<div style={{padding: "10px", borderBottom: "solid black 1px", marginBottom: "10px"}}>
				<h1>Sortable Stats Table </h1>
				<p>
					Sort cards by their stats for quick comparisons. Mainly useful when new cards come out or when you need to get a sense for 
					how strong a card you pulled is. Sometimes if the site hasn't been poked in a while it'll take a minute to load while the 
					Google instance spins back up. I'll fix that ~eventually~.
				</p>
				<p>
					Right now the page only works with URs <s>because they're the only cards that matter</s> to save on resources. Eventually I'll
					add more ways to control which cards are fetched (I'd like to at least have a button to get SRs too).
				</p>
				<p>
					If you find a bug, yell at Bocktagon on Discord or <a href="https://twitter.com/Bocktagon37">Twitter</a>
				</p>
			</div>
		)
	}

	render() {

		//let content = this.state.currentContent === null ? defaultContent : this.state.currentContent;
		let header = this.state.currentHeader === null ? this.homeHeader() : this.state.currentHeader;
			

		return(
			<Container>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand onClick={() => this.handleChangePage("home")}>All Stars UI</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link onClick={() => this.handleChangePage("search")}>Search</Nav.Link>
						<Nav.Link onClick={() => this.handleChangePage("stats")}>Stats</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="https://github.com/bocktagon/All-Stars-UI">Project GitHub</Nav.Link>
						<Nav.Link href="https://twitter.com/Bocktagon37">My Twitter</Nav.Link>
					</Nav>
				</Navbar>
				{header}
				{this.state.currentContent}
			</Container>
		)
	}
}

export default HomePage;