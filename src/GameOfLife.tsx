import { Component, onCleanup, onMount, createEffect, Index, For } from "solid-js";
import { createStore } from "solid-js/store";
import init, { Universe } from "../wasm/pkg/game_of_life";

await init();

const GameOfLife: Component = () => {
	const [state, setState] = createStore({
		UniverseString: "",
		UniverseByteArray: new Uint8Array(0),
		width: 50,
		height: 50,
		speed: 100
	});
    
	createEffect(() => {
		const universe = Universe.new(state.height, state.width);
		let frame = requestAnimationFrame(renderLoop);
		let frameTimeout: NodeJS.Timeout;
		function renderLoop() {
			frameTimeout = setTimeout(() => {
				setState({
					UniverseString: universe.render(),
					UniverseByteArray: universe.to_byte_array()
				});
				universe.tick();
				frame = requestAnimationFrame(renderLoop);
			}, state.speed);
		}
        
		onCleanup(() => {
			clearTimeout(frameTimeout);
			cancelAnimationFrame(frame);
			universe.free();
		});
	});
    
	const SizeInput = (props: { property: string }) => <label class="p-2">
		{`${props.property[0].toUpperCase()}${props.property.slice(1, props.property.length)}` }:
		<input class="m-2" type="number"
			value={state[props.property] as number}
			onChange={(e) => {
				const input = e.target as HTMLInputElement;
				const value = parseInt(input.value);
				if (value > 0) {
					setState({ [props.property]: value });
				}
			}}
		/>
	</label>;


	return <div>
		<div class="bg-slate-500 p-2">
			<SizeInput property="width" />
			<SizeInput property="height" />
			<SizeInput property="speed" />
		</div>
		<div class="grid w-full h-screen" 
			style={
				`grid-template-columns: repeat(${state.width}, 1fr);` 
			}>
			<For each={Array.from(state.UniverseByteArray)}>
				{cell => <div class={
					`${cell ? "bg-black" : "bg-white"} h-full w-full`}></div>}
			</For>
		</div>
	</div>;
};

export default GameOfLife;
