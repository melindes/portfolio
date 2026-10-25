import fr from '../i18n/ui.fr.json';
import en from '../i18n/ui.en.json';

export type Lang = 'fr' | 'en';
export type RouteKey = 'home' | 'code' | 'projet' | 'ecriture' | 'roman' | 'contact' | 'merci';

export const LANGS: Lang[] = ['fr', 'en'];

const SEGMENT_ECRITURE: Record<Lang, string> = { fr: 'ecriture', en: 'writing' };

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

export function localizedPath(key: RouteKey, lang: Lang, slug?: string): string {
  const base = `/${lang}`;
  switch (key) {
    case 'home': return `${base}/`;
    case 'code': return `${base}/code`;
    case 'projet': return `${base}/code/${slug}`;
    case 'ecriture': return `${base}/${SEGMENT_ECRITURE[lang]}`;
    case 'roman': return `${base}/${SEGMENT_ECRITURE[lang]}/${slug}`;
    case 'contact': return `${base}/contact`;
    case 'merci': return `${base}/contact/merci`;
  }
}

/** Même page dans l'autre langue ; un chemin hors /fr|/en renvoie vers l'accueil FR. */
export function alternatePath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  const lang = parts[0];
  if (lang !== 'fr' && lang !== 'en') return '/fr/';
  const cible = otherLang(lang);
  const reste = parts.slice(1);
  if (reste.length === 0) return `/${cible}/`;
  if (reste[0] === SEGMENT_ECRITURE[lang]) reste[0] = SEGMENT_ECRITURE[cible];
  return `/${cible}/${reste.join('/')}`;
}

const DICTS: Record<Lang, Record<string, string>> = { fr, en };

/** Clé absente en anglais ⇒ texte français ; absente partout ⇒ la clé elle-même. */
export function useTranslations(lang: Lang): (key: string) => string {
  return (key) => DICTS[lang][key] ?? DICTS.fr[key] ?? key;
}
