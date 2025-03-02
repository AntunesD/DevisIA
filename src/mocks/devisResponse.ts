import { Donnée } from "../interface/devis";

export const mockDevisResponse: Donnée[] = [
  {
    article: "Prise électrique",
    description: "Installation de trois prises dans une chambre",
    quantité: 3,
    prix: 20,
  },
  {
    article: "Interrupteur",
    description: "Installation d'un interrupteur dans le salon",
    quantité: 1,
    prix: 15,
  },
  {
    article: "Câble électrique",
    description: "Fourniture et pose de 100 mètres de câble dans le jardin",
    quantité: 100,
    prix: 2,
  },
  {
    article: "Spot encastrable",
    description: "Installation de 10 spots au plafond",
    quantité: 10,
    prix: 30,
  },
  {
    conseil:
      "Assurez-vous de vérifier la puissance des spots pour une bonne répartition de la lumière. Pensez également à protéger le câblage extérieur contre les intempéries.",
  },
];
