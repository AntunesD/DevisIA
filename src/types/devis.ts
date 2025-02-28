export interface DevisItem {
  article: string;
  description?: string;
  quantité: number;
  prix: number;
}

export interface DevisResponse {
  erreur?: string;
  items?: DevisItem[];
  conseil?: string;
}

export interface Article {
  article: string;
  description: string;
  quantité: number;
  prix: number;
}

interface Conseil {
  conseil: string;
}

interface Erreur {
  erreur: string;
}

export type Donnée = Article | Conseil | Erreur;
