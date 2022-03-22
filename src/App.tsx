import type { Component } from "solid-js";

import GameOfLife from "./GameOfLife";

const App: Component = () => {
	return (
		<div class="min-h-screen">
			<GameOfLife />
		</div>
	);
};

export default App;
