<script lang="ts">
	import type { Rating as RatingType } from "./ratingReader";
	import Rating from "./Rating.svelte";
	import { SEARCH_PRIORITIES, filterByString, filterMap } from "albtc";

	let { data } = $props();

	let search = $state("");
	let settledData = $state<Array<RatingType>>();
	let searchResults = $derived(
		filterByString(search, settledData ?? [], (item) => [
			{
				bias: 20,
				value: item.meta.rating.toString(),
				minPriority: SEARCH_PRIORITIES.EXACT_MATCH
			},
			{
				bias: 10,
				value: item.meta.name
			},
			{
				bias: 5,
				value: item.meta.subtitle ?? "",
				minPriority: SEARCH_PRIORITIES.INCLUDES
			},
			{
				bias: 2,
				value: item.content,
				minPriority: SEARCH_PRIORITIES.INCLUDES
			},
			{
				bias: 5,
				value: item.meta.tags.join(" "),
				minPriority: SEARCH_PRIORITIES.STARTS_WITH_AFTER_SPACE
			},
			{
				bias: 10,
				value: item.id,
				minPriority: SEARCH_PRIORITIES.STARTS_WITH
			}
		])
	);

	data.ratings.then((d) => {
		settledData = filterMap(d, (item) => {
			if (item.status === "rejected") return null;
			return item.value;
		}).sort((a, b) => b.meta.rating - a.meta.rating);
	});
</script>

<svelte:head>
	<title>da best games eva</title>
</svelte:head>

<div class="min-h-dvh bg-slate-200 px-4 pt-16 pb-80 text-xl text-slate-900">
	<div class="mx-auto max-2xl:max-w-2xl 2xl:w-[1400px]">
		<h1 class="w-full scale-x-110 px-8 text-center text-5xl font-extrabold">
			Games that are good.
		</h1>
		<h2 class="mt-2 text-center text-2xl">My list of game ratings.</h2>

		<main class="mt-12 flex w-full flex-col gap-24 2xl:-ml-32 2xl:flex-row">
			<div class="w-full max-w-xl max-2xl:self-center">
				<div class="grid w-fit grid-cols-[auto_auto_auto] gap-x-2">
					<b class="text-right">10</b><span> -</span>
					<span>Perfect & Life changing</span>
					<b class="text-right">9</b><span> -</span> <span>Perfect</span>
					<b class="text-right">8</b><span> -</span> <span>Amazing</span>
					<b class="text-right">7</b><span> -</span> <span>Great</span>
					<b class="text-right">6</b><span> -</span> <span>Good</span>
					<b class="text-right">5</b><span> -</span> <span>Meh</span>
					<b class="text-right">4</b><span> -</span>
					<span>Nahh this aint for me</span>
					<b class="text-right">3</b><span> -</span> <span>Bad</span>
					<b class="text-right">2</b><span> -</span>
					<span>i did not enjoy a second of this</span>
					<b class="text-right">1</b><span> -</span>
					<span>Does <em>anyone</em> enjoy a second of this?</span>
					<b class="text-right">0</b><span> -</span> <span>Refund</span>
				</div>

				<p class="mx-auto mt-8 max-w-prose">
					Games are in no particular order in their categories. This is not a
					ranking of <em>favourite</em> games, just the games I had the most fun
					with. Favourite games would be ranked by how much the game means to me.
					Fun games is ranked by how much I would steal from it to make my dream
					game. For example, Minecraft is my favourite game because it means so much
					to me, but nowhere near the top of this list because there are much better
					games.
				</p>

				<p class="mt-8 mb-2 font-bold">General rules</p>
				<ol class="ml-6 list-disc space-y-2">
					<li>
						i dont like games where there is a time limit of any kind (Majoras
						Mask, Pikmin, Outer Wilds but i still like that one)
					</li>
					<li>
						i dont like games where i can lose what feels like a lot of progress
						(Hollow Knight, TUNIC, Minecraft without keepinv/gravestones)
					</li>
					<li>
						i like games that allow me to express creativity (anything with a
						level editor, Minecraft, TotK)
					</li>
					<li>i dont like horror (Outer Wilds, Lethal Company)</li>
					<li>i dont like hard games (ULTRAKILL, Hollow Knight, TUNIC)</li>
					<li>
						i like puzzles that make me feel smart (Portal 2, Outer Wilds, TotK,
						FEZ)
					</li>
					<li>i like indie games</li>
					<li>i like open-world</li>
					<li>
						i like being able to play as an animal (specifically feral canid it
						gives me species euphoria) (TUNIC, Chicory, VRChat, Twilight
						Princess)
					</li>
				</ol>
			</div>

			<div class="w-full">
				<input
					class="w-full rounded-xl border border-slate-400 bg-transparent px-8 py-2 text-2xl font-bold transition-all placeholder:font-normal placeholder:text-slate-400 focus:bg-slate-100 focus:outline focus:outline-amber-500"
					placeholder="Search&hellip;"
					type="text"
					autocomplete="off"
					bind:value={search}
				/>
				<p class="mt-1 ml-4 text-base text-slate-700">
					Try search a title, series, or rating.
				</p>

				{#if settledData === undefined}
					<div class="mt-8 text-center text-2xl text-slate-700">
						Loading&hellip;
					</div>
				{:else if searchResults.length === 0}
					<div class="mt-8 text-center text-2xl text-slate-700">
						No results found.
					</div>
				{:else}
					{#if search === ""}
						<p class="mt-1 ml-4 text-base text-slate-700">
							Showing all <span class="font-bold">{settledData.length}</span> ratings.
						</p>
					{:else}
						<p class="mt-1 ml-4 text-base text-slate-700">
							Search matched <span class="font-bold"
								>{searchResults.length}</span
							>
							of {settledData.length} ratings.
						</p>
					{/if}

					<div class="mt-8 flex flex-col gap-4 max-md:-mx-2">
						{#each searchResults as rating (rating.id)}
							<Rating {rating} />
						{/each}
					</div>
				{/if}
			</div>
		</main>
	</div>
</div>
