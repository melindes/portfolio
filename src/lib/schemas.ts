import { z } from 'astro/zod';

/** `image` vient du contexte de schéma d'Astro ; les tests passent un substitut (`() => z.string()`). */
type ImageFn = () => z.ZodType;

const badge = z.enum(['realise', 'en-cours', 'a-venir']);

export function makeRomanSchema(image: ImageFn) {
  const partie = z
    .object({
      titre: z.string(),
      chapitres_ecrits: z.number().int().min(0),
      chapitres_total: z.number().int().min(1),
      pages: z.number().int().positive().optional(),
      en_cours: z.number().int().positive().optional(),
    })
    .refine((p) => p.chapitres_ecrits <= p.chapitres_total, {
      message: 'chapitres_ecrits dépasse chapitres_total',
    });

  return z.object({
    titre: z.string(),
    sous_titre_en: z.string().optional(),
    ordre: z.number(),
    statut: z.enum(['phare', 'a-venir']),
    genres: z.array(z.string()).default([]),
    lieu: z.string().optional(),
    couleur: z.object({ clair: z.string(), sombre: z.string() }).optional(),
    couverture: image().optional(),
    resume: z.string().optional(),
    extrait: z.string().optional(),
    parties: z.array(partie).default([]),
    au_dela: z.array(z.object({ nom: z.string(), badge, texte: z.string() })).default([]),
  });
}

export function makeProjetSchema(image: ImageFn) {
  return z.object({
    titre: z.string(),
    ordre: z.number(),
    statut: z.enum(['realise', 'bientot', 'en-pause', 'disponible']),
    publie: z.boolean().default(true),
    badge_texte: z.string().optional(),
    resume_carte: z.string().optional(),
    slogan: z.string().optional(),
    couleur: z.object({ fond_debut: z.string(), fond_fin: z.string(), accent: z.string() }).optional(),
    capture_principale: image().optional(),
    probleme: z.string(),
    solution: z.string(),
    fonctionnalites: z.array(z.object({ titre: z.string(), texte: z.string(), capture: image() })).default([]),
    technos: z.array(z.string()),
    lien_github: z.string().url().optional(),
    lien_play_store: z.string().url().optional(),
    credits: z.array(z.object({ nom: z.string(), lien: z.string().url().optional() })).optional(),
  });
}

export const accueilSchema = z.object({
  nom: z.string(),
  diplome: z.string(),
  paragraphes: z.array(z.string()),
  sous_titre_melindes: z.string(),
  sous_titre_bindje: z.string(),
});

export const competencesSchema = z.object({
  activites: z.array(
    z.object({
      univers: z.enum(['code', 'ecriture']),
      nom_fr: z.string(),
      nom_en: z.string(),
      badge,
      preuve_fr: z.string(),
      preuve_en: z.string(),
    }),
  ),
  technos: z.array(z.string()),
});
