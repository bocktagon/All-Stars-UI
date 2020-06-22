import React from 'react';

class Home extends React.Component {

	render() {
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
}

export default Home;