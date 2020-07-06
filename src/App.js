import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Home from './Pages/Home.js';
import StatsTable from './Pages/StatsTable.js'
import Search from './Pages/Search.js'
import TeamBuilder from './Pages/TeamBuilder.js'

export default function App() {
	return (
		  <Container className="main-container">
			  <Router>
					<div>
						<Navbar bg="dark" variant="dark">
							<Navbar.Brand href="/">All Stars UI</Navbar.Brand>
							<Nav className="mr-auto">
								<Nav.Link href="/Search">Search</Nav.Link>
								<Nav.Link href="/StatsTable">Stats Table</Nav.Link>
								<Nav.Link href="/TeamBuilder">Team Builder</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link href="https://github.com/bocktagon/All-Stars-UI">Project GitHub</Nav.Link>
								<Nav.Link href="https://twitter.com/Bocktagon37">My Twitter</Nav.Link>
							</Nav>
						</Navbar>
						
						<Switch>
							<Route path="/Search">
								<Search />
							</Route>
							<Route path="/StatsTable">
								<StatsTable />
							</Route>
							<Route path="/TeamBuilder">
								<TeamBuilder />
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</div>
			  </Router>
		  </Container>
	);
}

