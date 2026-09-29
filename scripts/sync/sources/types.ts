import type { Listing } from '../../../src/lib/stock-schema.ts';
import type { HttpClient } from '../http.ts';

export interface ParsedListing {
  listing: Listing;
  warnings: string[];
}

export interface SourceResult {
  source: 'luxauto' | 'autoscout24';
  /** gültige, geprüfte Inserate */
  listings: Listing[];
  /** Anzahl der gefundenen Inserats-Links */
  found: number;
  /** Inserate, die übersprungen wurden (Parser oder Zod) */
  invalid: { url: string; reason: string }[];
  warnings: string[];
}

export interface SourceAdapter {
  readonly name: 'luxauto' | 'autoscout24';
  readonly origin: string;
  fetchAll(client: HttpClient, log: (msg: string) => void): Promise<SourceResult>;
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}
