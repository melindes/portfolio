import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { makeRomanSchema, makeProjetSchema, accueilSchema, competencesSchema } from './lib/schemas';

// Identifiants d'entrée : "{lang}/{slug}" (ex. "fr/les-larmes-du-present").
const romans = defineCollection({
  loader: glob({ base: './src/content/romans', pattern: '**/*.md' }),
  schema: ({ image }) => makeRomanSchema(image),
});

const projets = defineCollection({
  loader: glob({ base: './src/content/projets', pattern: '**/*.md' }),
  schema: ({ image }) => makeProjetSchema(image),
});

const accueil = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '*/accueil.yml' }),
  schema: accueilSchema,
});

const competences = defineCollection({
  loader: glob({ base: './src/content/site', pattern: 'competences.yml' }),
  schema: competencesSchema,
});

export const collections = { romans, projets, accueil, competences };
