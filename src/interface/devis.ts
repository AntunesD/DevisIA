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

export interface EntrepriseInfo {
  nom: string;
  adresse: string;
  telephone?: string;
  email?: string;
  siret?: string;
}

export interface ClientInfo {
  nom: string;
  adresse: string;
  telephone?: string;
  email?: string;
}
