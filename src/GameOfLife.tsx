import { Component, onCleanup, createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";
import init, { Universe } from "../wasm/pkg/game_of_life";

await init();

const GameOfLife: Component = () => {
	const [state, setState] = createStore({
		UniverseString: "",
		UniverseByteArray: new Uint8Array(0),
		width: 50,
		height: 50,
		speed: 100,
		color1: "#000000",
		color2: "#ffffff",
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
    


	const GameOfLifeInput = (props: { property: string, step?: number, type: string }) => {
		const handleInput = (e: Event) => {
			if (props.type === "number") {
				const input = e.target as HTMLInputElement;
				const value = parseInt(input.value);
				if (value > 0) {
					setState({ [props.property]: value });
				}
			} else {
				setState({ [props.property]: (e.target as HTMLInputElement).value });
			}
			
		};

		let mousePressed = false;
		let mouseTimeOut: NodeJS.Timeout;
		const handleMouseDown = (e: MouseEvent) => {
			mousePressed = true;
			const whileMousePressed = () => {
				if (mousePressed) {
					handleInput(e);
					mouseTimeOut = setTimeout(whileMousePressed, 100);
				}
			};
		};

		const handleMouseUp = (e: MouseEvent) => {
			mousePressed = false;
			clearTimeout(mouseTimeOut);
			handleInput(e);
		};

		return <label class="p-2">
			{`${props.property[0].toUpperCase()}${props.property.slice(1, props.property.length)}`}:
			<input
				class="m-2"
				type={ props.type }
				value={ state[props.property] }
				step={ props.step }
				onChange={handleInput}
				onInput={ handleInput }
				onMouseDown={ handleMouseDown }
				onMouseUp={ handleMouseUp }
			/>
		</label>;
	};


	return <div>
		<div class="bg-slate-500 p-2">
			<GameOfLifeInput property="width" type="number" />
			<GameOfLifeInput property="height" type="number" />
			<GameOfLifeInput property="speed" type="number" step={10} />
			<GameOfLifeInput property="color1" type="color" />
			<GameOfLifeInput property="color2" type="color" />
		</div>
		<div class="grid w-full h-screen" 
			style={
				`grid-template-columns: repeat(${state.width}, 1fr);` 
			}>
			<For each={Array.from(state.UniverseByteArray)}>
				{cell => <div class={"h-full w-full"} style={`background-color:${cell ? state.color1 : state.color2}`}></div>}
			</For>
		</div>
	</div>;
};

export default GameOfLife;
