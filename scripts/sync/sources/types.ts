import type { Listing } from '../../../src/lib/stock-schema.ts';
import type { HttpClient } from '../http.ts';

export interface ParsedListing {
  listing: Listing;
  warnings: string[];
}

export interface SourceResult {
  source: 'movingcar' | 'luxauto' | 'autoscout24';
  /** gültige, geprüfte Inserate */
  listings: Listing[];
  /** Anzahl der gefundenen Inserats-Links */
  found: number;
  /** Inserate, die übersprungen wurden (Parser oder Zod) */
  invalid: { url: string; reason: string }[];
  warnings: string[];
}

export interface SourceAdapter {
  readonly name: 'movingcar' | 'luxauto' | 'autoscout24';
  readonly origin: string;
  /** robots.txt laden? (nein bei einer offiziellen API mit Zugangsschlüssel) */
  readonly robots?: boolean;
  fetchAll(client: HttpClient, log: (msg: string) => void): Promise<SourceResult>;
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}
