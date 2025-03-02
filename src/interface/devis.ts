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


export interface Donnée {
  article?: string;
  quantité?: number;
  prix?: number;
  description?: string;
  conseil?: string;
  erreur?: string;
}

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
