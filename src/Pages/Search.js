import React from 'react';

import SearchBox from '../Components/SearchBox.js'

class Search extends React.Component {

	render() {
		const header = 	<div style={{padding: "10px", borderBottom: "solid black 1px", marginBottom: "10px"}}>
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

		return (
			<div>
				{header}
				<SearchBox/>
			</div>
		)
	}
}

export default Search;