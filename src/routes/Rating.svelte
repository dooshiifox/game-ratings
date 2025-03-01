<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import type { Rating } from "./ratingReader";
	import { createDisclosure } from "@/disclosure.svelte";
	import { slide } from "svelte/transition";

	let {
		rating
	}: {
		rating: Rating;
	} = $props();

	const disclosure = createDisclosure({
		label: "Rating for " + rating.meta.name,
		expanded: false
	});

	const COLORS = {
		[10]: "bg-gradient-to-br from-green-200 via-blue-200 to-fuchsia-200 text-black",
		[9.5]: "bg-purple-200 text-purple-950",
		[9]: "bg-violet-200 text-violet-950",
		[8.5]: "bg-indigo-200 text-indigo-950",
		[8]: "bg-blue-200 text-blue-950",
		[7.5]: "bg-sky-200 text-sky-950",
		[7]: "bg-cyan-300 text-cyan-950",
		[6.5]: "bg-teal-200 text-teal-950",
		[6]: "bg-emerald-200 text-emerald-950",
		[5.5]: "bg-green-200 text-green-950",
		[5]: "bg-lime-300 text-lime-950",
		[4.5]: "bg-yellow-300 text-yellow-950",
		[4]: "bg-amber-300 text-amber-950",
		[3.5]: "bg-orange-300 text-orange-950",
		[3]: "bg-pink-300 text-pink-950",
		[2.5]: "bg-rose-300 text-rose-950",
		[2]: "bg-red-300 text-red-950",
		[1]: "bg-red-800 text-red-100",
		[0]: "bg-black text-white"
	} as const;
</script>

<button
	use:disclosure.button
	class="block w-full rounded-xl bg-slate-100 px-4 pt-2 pb-3 text-left shadow transition-all duration-100 focus-visible:outline focus-visible:outline-amber-500 active:opacity-80 md:px-8 md:py-4"
>
	{#snippet finished()}
		{#if rating.meta.finished === null}{:else if rating.meta.finished}
			<span
				class="mt-1 h-fit rounded-xl bg-blue-200 px-2 text-sm font-bold text-blue-900"
				>Finished</span
			>
		{:else}
			<span
				class="mt-1 h-fit rounded-xl bg-amber-200 px-2 text-sm font-bold text-amber-900"
				>Unfinished</span
			>
		{/if}
	{/snippet}

	{#snippet rating_chip()}
		<div
			class="rounded-full px-3 font-bold shadow-sm {COLORS[rating.meta.rating]}"
		>
			<p class="w-[3ch] text-center">{rating.meta.rating}</p>
		</div>
	{/snippet}

	<div
		class="hidden w-full grid-cols-[auto,1fr,auto] grid-rows-[auto,auto] flex-row items-center gap-x-4 xl:grid"
	>
		<div class="text-2xl">
			{@render rating_chip()}
		</div>

		<h3 class="text-3xl font-bold">
			{rating.meta.name}
		</h3>

		{@render finished()}

		{#if rating.meta.subtitle}
			<p class="col-start-2 text-lg text-slate-700">
				{rating.meta.subtitle}
			</p>
		{/if}
	</div>

	<div class="flex flex-col xl:hidden">
		<div class="mb-2 flex flex-row items-center justify-between">
			{@render rating_chip()}

			{@render finished()}
		</div>

		<h3 class="text-2xl font-bold md:text-3xl">
			{rating.meta.name}
		</h3>
		{#if rating.meta.subtitle}
			<p class="text-lg text-slate-700">
				{rating.meta.subtitle}
			</p>
		{/if}
	</div>

	{#if disclosure.expanded}
		<div
			class="markdown -mx-4 flex flex-col gap-2 px-4 text-lg"
			transition:slide={{ duration: 200 }}
		>
			<div class="-mx-4 mt-4 mb-6 h-px bg-slate-300"></div>

			<SvelteMarkdown source={rating.content} />

			<div class="h-2"></div>
		</div>
	{/if}
</button>

<style lang="postcss">
	@reference "tailwindcss/theme";

	:global(.markdown h1) {
		@apply text-3xl font-bold;
	}
	:global(.markdown h2) {
		@apply text-2xl font-bold;
	}
	:global(.markdown h3) {
		@apply text-2xl font-bold text-gray-700;
	}
	:global(.markdown h4) {
		@apply text-xl font-bold text-gray-700 underline;
	}
	:global(.markdown h5) {
		@apply text-xl font-bold text-gray-700;
	}
	:global(.markdown h6) {
		@apply text-lg font-bold text-gray-700;
	}
	:global(.markdown a) {
		@apply text-blue-700 underline;
	}
	:global(.markdown a:hover) {
		@apply cursor-pointer text-blue-500;
	}
</style>
