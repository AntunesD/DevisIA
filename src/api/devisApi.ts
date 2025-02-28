import { Donnée } from "../types/devis";

export const generateurDevis = async (
  demande: string
): Promise<Donnée[]> => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA6qewv7bqHb9F0bsX1KBcTByFaCDSqM-c",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Tu es un assistant spécialisé dans la création de devis. 
Tu dois analyser la demande et générer un **devis sous forme de JSON valide**. 
Si la demande ne concerne pas un devis, répond uniquement avec : 
\`\`\`json
{ "erreur": "Je suis uniquement ici pour générer des devis. Merci de me fournir une demande liée à un devis." }
\`\`\`
Sinon, respecte ce format JSON : 
\`\`\`json
[
  { "article": "Nom de l'article", "description": "Description (Phrase courte pour faire comprendre au client)", "quantité": X, "prix": Y },
  { "article": "Autre article", "quantité": X, "prix": Y },
  ...
  { "conseil": "Ajoute ici des conseils pertinents liés au devis. Tout en sachant que le client est un professionnel" }
]
\`\`\`
Ne mets aucun texte en dehors du JSON.

### **Demande du Professionnel :**
"""${demande}"""`,
                },
              ],
            },
          ],
        }),
      }
    );

    const rawResponse = await response.json();

    // Nettoyer la réponse
    const cleanResponse = (text: string) => {
      return text
        .replace(/\\"/g, '"') // Remplacer \" par "
        .replace(/```json\n?|\n?```/g, "") // Enlever les balises ```json et ```
        .trim(); // Enlever les espaces au début et à la fin
    };

    const cleanedText = cleanResponse(
      rawResponse.candidates[0].content.parts[0].text
    );
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
