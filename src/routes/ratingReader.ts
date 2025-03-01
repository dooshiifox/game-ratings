import * as yaml from "js-yaml";
import * as fs from "node:fs/promises";
import * as v from "valibot";

const META_STRUCTURE = v.strictObject({
	name: v.string(),
	subtitle: v.optional(v.string()),
	rating: v.picklist([
		10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1, 0
	]),
	finished: v.optional(v.nullable(v.boolean()), null),
	tags: v.optional(v.array(v.string()), [])
});

export type Rating = Awaited<ReturnType<typeof reaRatingFile>>;

export async function readRatingFiles() {
	const files = await fs.readdir("src/data");

	return await Promise.allSettled(
		files.map((file) => {
			return reaRatingFile(`src/data/${file}`);
		})
	);
}

async function reaRatingFile(file: string) {
	const contents = await fs.readFile(file, "utf8");

	// The file is formatted like an astro component,
	// where metadata is at the top of the file surrounded
	// in `---`. The rest is markdown content.
	const [nothingHopefully, metadata, content] = contents.split("---");
	if (nothingHopefully !== "") {
		throw new Error(`Expected nothing before first '---' in '${file}'`);
	}
	if (metadata === undefined || metadata === "") {
		throw new Error(`Expected metadata in '${file}'`);
	}
	if (content === undefined || content === "") {
		throw new Error(`Expected content after metadata in '${file}'`);
	}

	// Parse the metadata into an object
	const metaYaml = yaml.load(metadata.trim());
	const metaParsed = v.safeParse(META_STRUCTURE, metaYaml);
	if (!metaParsed.success) {
		console.warn(`Invalid metadata in '${file}':`, metaParsed.issues);
		throw new Error(`Invalid metadata in '${file}'`);
	}

	return {
		id: file.split("/").pop()!.split(".").shift()!,
		meta: metaParsed.output,
		content: content.trim()
	};
}
