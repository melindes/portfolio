import { readStored, writeStored } from './theme';

export const INTRO_KEY = 'intro-vue';

/** L'animation d'accueil se joue une fois par session, jamais avec « réduire les animations ». */
export function shouldPlayIntro(storage: Pick<Storage, 'getItem'> | undefined, reducedMotion: boolean): boolean {
  if (reducedMotion) return false;
  return readStored(storage, INTRO_KEY) !== '1';
}

export function markIntroSeen(storage: Pick<Storage, 'setItem'> | undefined): void {
  writeStored(storage, INTRO_KEY, '1');
}
