export type Theme = 'clair' | 'sombre';

export const THEME_KEY = 'theme';

export function resolveTheme(stored: string | null, pageDefault: Theme): Theme {
  return stored === 'clair' || stored === 'sombre' ? stored : pageDefault;
}

export function readStored(storage: Pick<Storage, 'getItem'> | undefined, key: string): string | null {
  try {
    return storage ? storage.getItem(key) : null;
  } catch {
    return null;
  }
}

export function writeStored(storage: Pick<Storage, 'setItem'> | undefined, key: string, value: string): void {
  try {
    storage?.setItem(key, value);
  } catch {
    // stockage indisponible (navigation privée, données bloquées) : on ignore
  }
}
