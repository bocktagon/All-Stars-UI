import React from 'react';

import SortableCardTable from '../Components/SortableCardTable'


class StatsTable extends React.Component {

	render() {
		const header = <div style={{padding: "10px", borderBottom: "solid black 1px", marginBottom: "10px"}}>
				<h1>Sortable Stats Table </h1>
				<p>
					Sort cards by their stats for quick comparisons. Mainly useful when new cards come out or when you need to get a sense for 
					how strong a card you pulled is. Sometimes if the site hasn't been poked in a while it'll take a minute to load while the 
					Google instance spins back up. I'll fix that ~eventually~.
				</p>
				<p>
					Right now the page only loads URs <s>because they're the only cards that matter</s> to save on resources. Eventually I'll
					add more ways to control which cards are fetched (I'd like to at least have a button to get SRs too).
				</p>
				<p>
					If you find a bug, yell at Bocktagon on Discord or <a href="https://twitter.com/Bocktagon37">Twitter</a>
				</p>
			</div>

		return (
			<div>
				{header}
				<SortableCardTable/>
			</div>
		)
	}
}

export default StatsTable;