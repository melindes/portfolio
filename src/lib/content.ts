import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

type Fiches = 'romans' | 'projets';

export interface Localized<C extends Fiches> {
  entry: CollectionEntry<C>;
  /** true si la version demandée manque et que la version française est affichée à la place. */
  isFallback: boolean;
}

export function slugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}

function estPublie(entry: CollectionEntry<Fiches>): boolean {
  return !('publie' in entry.data) || entry.data.publie !== false;
}

export async function getLocalized<C extends Fiches>(collection: C, slug: string, lang: Lang): Promise<Localized<C> | undefined> {
  const voulu = (await getEntry(collection, `${lang}/${slug}`)) as CollectionEntry<C> | undefined;
  if (voulu) return { entry: voulu, isFallback: false };
  const fr = (await getEntry(collection, `fr/${slug}`)) as CollectionEntry<C> | undefined;
  return fr ? { entry: fr, isFallback: lang !== 'fr' } : undefined;
}

/** Fiches publiées, la version française faisant foi pour la liste ; triées par `ordre`. */
export async function listLocalized<C extends Fiches>(collection: C, lang: Lang): Promise<Localized<C>[]> {
  const sources = (await getCollection(collection, (e: CollectionEntry<Fiches>) => e.id.startsWith('fr/'))) as CollectionEntry<C>[];
  const fiches = await Promise.all(sources.map((e) => getLocalized(collection, slugOf(e.id), lang)));
  return fiches
    .filter((f): f is Localized<C> => !!f && estPublie(f.entry))
    .sort((a, b) => a.entry.data.ordre - b.entry.data.ordre);
}

export async function getAccueil(lang: Lang) {
  const entree = (await getEntry('accueil', `${lang}/accueil`)) ?? (await getEntry('accueil', 'fr/accueil'));
  if (!entree) throw new Error('Contenu manquant : src/content/site/fr/accueil.yml');
  return entree.data;
}

export async function getCompetences() {
  const entree = await getEntry('competences', 'competences');
  if (!entree) throw new Error('Contenu manquant : src/content/site/competences.yml');
  return entree.data;
}
