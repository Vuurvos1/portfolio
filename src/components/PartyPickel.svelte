<script>
	import { onMount } from 'svelte';

	const drainUpdateTime = 100; // ms
	let vloeistofLevel = 300;
	let drainSpeed = 7; // lager is sneller
	let x = 0; // drain variabele voor bijhouden hoe lang voorbij is
	let refillActive = true;

	let touches = 0;
	let clearTouchTrack = 0;

	let newPosition = ['85px', '83px']; //width, height

	let potOpen = false;

	const etenKleur = ['#585858', '#767676', '#101010', '#b7b7b7', '#dcdcdcx'];
	let etenReset = 1;

	// Animate pickle on click
	function newPos() {
		newPosition[0] = Math.floor(Math.random() * 157) + 'px';
		newPosition[1] = Math.floor(Math.random() * 101) + 'px';
		return newPosition;
	}

	const pickleNew = () => {
		var prevNW = newPosition[0];
		var prevNH = newPosition[1];
		newPos();

		document.querySelector('img.pickle').animate(
			[
				// keyframes
				{
					top: prevNH,
					left: prevNW
				},
				{
					top: newPosition[1],
					left: newPosition[0]
				}
			],
			{
				// timing ms
				duration: 1000,
				easing: 'ease-in-out'
			}
		);
		document.querySelector('img.pickle').style =
			'top:' + newPosition[1] + ';left:' + newPosition[0];
	};

	// Pot kapot maken
	function clearTouches() {
		touches = 0;
		clearTouchTrack = 0;
	}

	function potKapot() {
		touches++;
		if (touches > 25) {
			document.querySelector('img.jar').src = '/img/partyPickle/jarKapot.png';
			drainSpeed = 1;
		}

		if (clearTouchTrack == 0) {
			setTimeout(clearTouches, 2000);
			clearTouchTrack = 1;
		}
	}

	function potRepareren() {
		document.querySelector('img.jar').src = '/img/partyPickle/jar.png';
		drainSpeed = 7;
	}

	// Water Refill mechanic
	function waterTimout() {
		refillActive = true;
	}

	function addWater() {
		if (refillActive) {
			// max vloeistof 300
			if (vloeistofLevel < 275) {
				vloeistofLevel += 25;
				refillActive = false;
				setTimeout(waterTimout, 1000);
			} else if (vloeistofLevel <= 300) {
				vloeistofLevel = 300;
				refillActive = false;
				setTimeout(waterTimout, 1000);
			}
		}
	}

	// pot openen
	function openPot() {
		if (potOpen == true) {
			document.querySelector('div.deksel').classList.add('dekselAnimateClose');
			document.querySelector('div.deksel').classList.remove('dekselAnimate');
			potOpen = false;
		} else {
			document.querySelector('div.deksel').classList.add('dekselAnimate');
			document.querySelector('div.deksel').classList.remove('dekselAnimateClose');
			potOpen = true;
		}
	}

	// eten geven
	function removeEtenAni() {
		const divEten = document.querySelectorAll('.eten');

		for (let i = 0; i < divEten.length; i++) {
			divEten[i].classList.remove('etenAnimate');
		}
		etenReset = 1;
	}

	function geefEten() {
		if (potOpen == true && etenReset == 1) {
			let divEten = document.querySelectorAll('.eten');
			let eetNummer = Math.floor(Math.random() * 3) + 2;

			for (let i = 0; i < eetNummer; i++) {
				const positie = Math.floor(Math.random() * 15) - 7.5 + 50;
				const offset = Math.floor(Math.random() * 50) + 25 + 'px';
				const size = Math.floor(Math.random() * 10) + 10 + 'px';

				let kleur = Math.floor(Math.random() * etenKleur.length);
				divEten[i].style =
					`width:${size};height:${size};` +
					`left:${positie}%;top:-${offset}` +
					`;background-color: ${etenKleur[kleur]}`;
				divEten[i].classList.add('etenAnimate');
			}
			etenReset = 0;

			if (vloeistofLevel >= 275) {
				document.querySelector('img.pickle').src = '/img/partyPickle/pickle.png';
			}
		}
	}

	// animatie klass deksel openen we halen
	function removeOpenPot() {
		document.querySelector('div.deksel').classList.add('dekselOpen');
		document.querySelector('div.deksel').classList.remove('dekselAnimate');
	}

	onMount(() => {
		// vloeistof minder worden
		function vloeistof() {
			x++;
			if (x >= drainSpeed) {
				x = 0;
				if (vloeistofLevel > 1) {
					vloeistofLevel--;
				} else {
					document.querySelector('img.pickle').src = '/img/partyPickle/pickleVies.png';
				}
			}
		}

		const intervalId = setInterval(vloeistof, drainUpdateTime);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<section class="partyPickle">
	<div class="positionMove">
		<div class="moveSpace">
			<img
				class="pickle grabNone select-none"
				src="/img/partyPickle/pickle.png"
				alt="Augurk"
				on:click={pickleNew}
			/>
		</div>
	</div>

	<div style={`height:${Math.max(vloeistofLevel, 0)}px`} class="pickleSaus" />

	<div class="deksel" on:click={openPot} on:animationend={removeOpenPot} />
	<img
		class="jar grabNone select-none"
		src="/img/partyPickle/jar.png"
		alt="Augurken pot"
		on:mouseenter={potKapot}
		on:mouseleave={potKapot}
		on:dblclick={potRepareren}
	/>

	{#each { length: 5 } as n, i (i)}
		<div class="eten" on:animationend={removeEtenAni}></div>
	{/each}

	<div class="flex w-full flex-row justify-center gap-4">
		<button class="button select-none" on:click={addWater}>Give Juice</button>
		<button class="button select-none" on:click={geefEten}>Give Food</button>
	</div>
</section>

<style lang="postcss">
	.partyPickle {
		width: 100vw;
		margin: 3rem calc(50% - 50vw);

		padding-top: 44rem;
		padding-bottom: 6rem;
		background: linear-gradient(#ffcb57 70%, rgba(0, 0, 0, 0) 0 100%);

		@screen lg {
			background: linear-gradient(#ffcb57 65%, rgba(0, 0, 0, 0) 0 100%);

			width: auto;
			margin-left: -12rem;
			margin-right: -12rem;
		}
	}

	.grabNone {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	.partyPickle {
		position: relative;
		min-height: 42rem;
		overflow-x: hidden;

		.pickle {
			position: absolute;
			top: 83px;
			left: 85px;

			width: auto;

			cursor: pointer;

			z-index: 10;
		}

		.moveSpace {
			width: 274px;
			height: 320px;
			position: relative;
			margin: 0 auto;
		}

		.positionMove {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 24vh;
		}

		.pickleSaus {
			position: absolute;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
			height: 300px;
			width: 276px;
			bottom: 24vh;
			background-color: #919b54;
			z-index: 0;

			border-radius: 0 0 22px 22px;
		}

		.jar {
			display: block;
			margin: 0 auto;
			position: absolute;
			width: auto;
			left: 0;
			right: 0;
			bottom: 24vh;
			z-index: 5;
		}
	}

	.deksel {
		width: 210px;
		height: 40px;
		margin: 0 auto;
		background-color: #a5a5a5;
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(24vh + 360px);
		z-index: 1;

		transform-origin: 0% 100%;

		transition: all 0.5s ease-in-out;
		animation-fill-mode: forwards;
	}

	:global(.dekselAnimate) {
		animation-name: dekselAn;
		animation-duration: 2s;
	}

	:global(.dekselAnimateClose) {
		animation-name: dekselAnClose;
		animation-duration: 3s;
	}

	:global(.dekselOpen) {
		transform: rotate(-90deg);
	}

	:global(.eten) {
		border-radius: 50%;
		position: absolute;

		top: -50px;
		left: 50%;

		transition: all 0.3s ease-out;
	}

	:global(.etenAnimate) {
		animation-name: etenDrop;
		animation-duration: 3.2s;
	}

	@keyframes dekselAn {
		0% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(0, -100px);
		}

		100% {
			transform: rotate(-90deg);
		}
	}

	@keyframes dekselAnClose {
		0% {
			transform: rotate(-90deg);
		}

		60% {
			transform: translate(0, -100px);
		}

		100% {
			transform: translate(0, 0);
		}
	}

	@keyframes etenDrop {
		0% {
			transform: translate(0, 0);
		}

		60% {
			opacity: 1;
		}

		100% {
			transform: translateY(70vh);
			opacity: 0;
		}
	}
</style>
