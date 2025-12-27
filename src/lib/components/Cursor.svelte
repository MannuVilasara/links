<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let isDesktop = $state(false);
	let container = $state<HTMLElement>();
	let dots: HTMLSpanElement[] = $state([]);

	const amount = 20;
	const width = 26;
	const sineDots = Math.floor(amount * 0.3);
	const idleTimeout = 150;

	let mousePosition = { x: 0, y: 0 };
	let dotsData: any[] = [];
	let idle = false;
	let timeoutID: any;
	let animationFrame: number;

	class Dot {
		index: number;
		anglespeed = 0.05;
		x = 0;
		y = 0;
		scale: number;
		range: number;
		limit: number;
		lockX = 0;
		lockY = 0;
		angleX = 0;
		angleY = 0;

		constructor(index: number) {
			this.index = index;
			this.scale = 1 - 0.05 * index;
			this.range = width / 2 - (width / 2) * this.scale + 2;
			this.limit = width * 0.75 * this.scale;
		}

		lock() {
			this.lockX = this.x;
			this.lockY = this.y;
			this.angleX = Math.PI * 2 * Math.random();
			this.angleY = Math.PI * 2 * Math.random();
		}

		update() {
			if (!idle || this.index <= sineDots) {
				// Follow logic handled in render loop for x/y
			} else {
				this.angleX += this.anglespeed;
				this.angleY += this.anglespeed;
				this.y = this.lockY + Math.sin(this.angleY) * this.range;
				this.x = this.lockX + Math.sin(this.angleX) * this.range;
			}
		}
	}

	function startIdleTimer() {
		timeoutID = setTimeout(goInactive, idleTimeout);
		idle = false;
	}

	function resetIdleTimer() {
		clearTimeout(timeoutID);
		startIdleTimer();
	}

	function goInactive() {
		idle = true;
		for (let dot of dotsData) {
			dot.lock();
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDesktop) return;
		mousePosition.x = e.clientX;
		mousePosition.y = e.clientY;
		resetIdleTimer();
	}

	function render() {
		let x = mousePosition.x;
		let y = mousePosition.y;

		dotsData.forEach((dot, index) => {
			let nextDot = dotsData[index + 1] || dotsData[0];
			
			dot.update();

			if (!idle || index <= sineDots) {
				const dx = (nextDot.x - dot.x) * 0.35;
				const dy = (nextDot.y - dot.y) * 0.35;
				dot.x += dx;
				dot.y += dy;
				// First dot follows mouse directly-ish, effectively handled by the chain?
				// Actually original code sets dot.x = x at start of loop if following?
				// Wait, the original code: 
				// x starts at mousePosition
				// loop: dot.x = x; dot.y = y; dot.draw(); ... x += dx;
				// This implies the dots are drawn AT 'x', and 'x' is updated to pull towards the NEXT dot?
				// Actually the original code says: 
				// dot.x = x; dot.y = y;
				// if (!idle...) { x += (nextDot.x - dot.x) * 0.35 }
				// This means the Current Dot moves to cursor (or previous dot pos), and the NEXT 'x' for the next dot is calculated by trailing.
				
				// Let's mimic exactly:
				dot.x = x;
				dot.y = y;
			}

			// Apply to DOM
			if (dots[index]) {
				dots[index].style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${dot.scale})`;
			}

			if (!idle || index <= sineDots) {
				// Calculate position for NEXT dot in the chain
				// Original: x += (nextDot.x - dot.x) * 0.35
				// But wait, 'dot.x' was just set to 'x'. So it's (nextDot.lastPos - currentPos) * 0.35 ??
				// Actually 'nextDot.x' is the position of the Text dot from the PREVIOUS frame (since we haven't updated it yet in this loop).
				// So yes, it pulls the "draw position" towards the next dot's old position.
				
				const dx = (nextDot.x - x) * 0.35;
				const dy = (nextDot.y - y) * 0.35;
				x += dx;
				y += dy;
			}
		});

		animationFrame = requestAnimationFrame(render);
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(pointer: fine)');
		isDesktop = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			isDesktop = e.matches;
		});

		// Init dots
		for (let i = 0; i < amount; i++) {
			dotsData.push(new Dot(i));
		}
		
		// Initialize positions
		dotsData.forEach(d => { d.x = window.innerWidth/2; d.y = window.innerHeight/2; });

		startIdleTimer();
		render();
	});

	onDestroy(() => {
		if (browser) {
			if (animationFrame) cancelAnimationFrame(animationFrame);
			if (timeoutID) clearTimeout(timeoutID);
		}
	});
</script>

<svelte:window onmousemove={handleMouseMove} />

{#if isDesktop}
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="hidden">
		<defs>
			<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>

	<div
		bind:this={container}
		class="pointer-events-none fixed top-0 left-0 z-9999 h-full w-full mix-blend-difference"
		style="filter: url('#goo');"
	>
		{#each { length: amount } as _, i}
			<span
				bind:this={dots[i]}
				class="absolute block h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white will-change-transform"
			></span>
		{/each}
	</div>
	
	<!-- Hide default cursor -->
{/if}
