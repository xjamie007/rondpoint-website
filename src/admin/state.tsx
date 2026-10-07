/** Zustand des Dashboards: geladene Daten, Entwurf mit Verlauf, Beschriftungen */
import { createContext, useContext } from 'react';
import type { BuildData, Draft } from './model';
import type { Strings, UiLang } from './strings';

export interface AdminCtx {
  data: BuildData;
  orig: Draft;
  draft: Draft;
  /** Entwurf ändern (wird im Verlauf gespeichert) */
  update: (fn: (d: Draft) => void) => void;
  S: Strings;
  ui: UiLang;
  mode: 'demo' | 'live';
  go: (view: View, arg?: string) => void;
}
export type View = 'overview' | 'hours' | 'fleet' | 'photos' | 'texts' | 'seo' | 'reviews' | 'settings';

export const Ctx = createContext<AdminCtx | null>(null);
export function useAdmin(): AdminCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('no admin ctx');
  return c;
}
