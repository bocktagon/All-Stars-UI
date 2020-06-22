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

export default function App() {
	return (
		  <Container>
			  <Router>
					<div>
						<Navbar bg="dark" variant="dark">
							<Navbar.Brand href="/">All Stars UI</Navbar.Brand>
							<Nav className="mr-auto">
								<Nav.Link href="/search">Search</Nav.Link>
								<Nav.Link href="/statsTable">Stats Table</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link href="https://github.com/bocktagon/All-Stars-UI">Project GitHub</Nav.Link>
								<Nav.Link href="https://twitter.com/Bocktagon37">My Twitter</Nav.Link>
							</Nav>
						</Navbar>
						
						<Switch>
							<Route path="/search">
								<Search />
							</Route>
							<Route path="/statsTable">
								<StatsTable />
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

