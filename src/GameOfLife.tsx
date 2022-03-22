import { Component, onCleanup, createEffect, For, Show, JSXElement } from "solid-js";
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
		color1: "#b7094c",
		color2: "#0091ad",
		char1: "◻",
		char2: "◼",
		stringDisplay: false,
	});
    
	createEffect(() => {
		const universe = Universe.new(state.width, state.height, state.char1, state.char2);
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
    


	const GameOfLifeLabel = (props: { children: JSXElement, text: string }) => {
		return (
			<label class="p-2">
				{`${props.text[0].toUpperCase()}${props.text.slice(1, props.text.length)}`}:
				{props.children}
			</label>
		);
	};
			

	const GameOfLifeInput = (props: { property: string, step?: number, type: string, class?: string, style?:string, maxLength?: number }) => {
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

		return <GameOfLifeLabel text={props.property}>
			<input
				class={`m-2 ${props.class ? ` ${props.class}` : ""}`}
				style={props.style}
				type={props.type}
				value={state[props.property]}
				step={props.step}
				maxLength={props.maxLength}
				onChange={handleInput}
				onInput={handleInput}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			/>
		</GameOfLifeLabel>;
	};


	return <div class="bg-black">
		<div class="bg-slate-500 p-2">
			<GameOfLifeInput property="width" type="number" />
			<GameOfLifeInput property="height" type="number" />
			<GameOfLifeInput property="speed" type="number" step={10} />
			<GameOfLifeLabel text="String Display">
				<input class="m-2" type="checkbox" checked={state.stringDisplay} onChange={() => setState({ stringDisplay: !state.stringDisplay })} />
			</GameOfLifeLabel>
			<Show when={state.stringDisplay}>
				<GameOfLifeInput style={ `color:${state.color1}; border: 1px solid ${state.color1}` } class="w-6 bg-transparent" property="char1" type="text" maxLength={1}/>
				<GameOfLifeInput style={ `color:${state.color2}; border: 1px solid ${state.color2}` } class="w-6 bg-transparent" property="char2" type="text" maxLength={1}/>
			</Show> 
			<GameOfLifeInput property="color1" type="color" />
			<GameOfLifeInput property="color2" type="color" />
		</div>
		<div class="grid w-full h-screen justify-center justify-items-center" 
			style={ state.stringDisplay ? "" : `grid-template-columns: repeat(${state.width}, 1fr);` }>
			{
				<Show when={state.stringDisplay} fallback={
					<For each={Array.from(state.UniverseByteArray)}>{
						cell => <div class={"h-full w-full"} style={`background-color:${cell ? state.color1 : state.color2}`}></div>}
					</For>
				}>
					<pre class="justify-center align-middle">
						<For each={state.UniverseString.split("")}>{(char) => <span style={`color: ${char === state.char1 ? state.color1 : state.color2}`}>{ char }</span>}</For>
					</pre>
				</Show>
			}

		</div>
	</div>;
};

export default GameOfLife;
