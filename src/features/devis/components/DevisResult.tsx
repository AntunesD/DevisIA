import React, { useState, useEffect } from "react";
import { Donnée, Article } from "../../../interface/devis";
import DetailsForm from "./DetailsForm";
import PdfPreview from "./PdfPreview";

interface DevisResultProps {
  devis: Donnée[];
}

export const DevisResult = ({ devis }: DevisResultProps) => {
  const [articles, setArticles] = useState<Article[]>(
    devis.filter(
      (item): item is Article =>
        "article" in item && "quantité" in item && "prix" in item
    )
  );
  const [tva, setTva] = useState<number>(10);

  const calculateTTC = (ht: number, tva: number) => {
    return (ht * (1 + tva / 100)).toFixed(2);
  };

  const [entrepriseDetails, setEntrepriseDetails] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
    siret: "",
  });

  const [clientDetails, setClientDetails] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
  });

  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);

  useEffect(() => {
    const newArticles = devis.filter(
      (item): item is Article =>
        "article" in item && "quantité" in item && "prix" in item
    );
    setArticles(newArticles);
  }, [devis]);

  const conseilItem = devis.find(
    (item): item is Donnée & { conseil: string } => "conseil" in item
  );

  const handleChange = (
    index: number,
    field: keyof Article,
    value: string | number
  ) => {
    setArticles((prevArticles) =>
      prevArticles.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDetailsUpdate = (type: "entreprise" | "client", details: any) => {
    if (type === "entreprise") {
      setEntrepriseDetails(details);
    } else {
      setClientDetails(details);
    }
  };

  const ajouterLigne = () => {
    const nouvelArticle: Article = {
      article: "Entrez le nom de l'article",
      quantité: 1,
      prix: 0,
      description: "Mettez ici la description de l'article",
    };
    setArticles((prevArticles) => [...prevArticles, nouvelArticle]);
  };

  const supprimerLigne = (index: number) => {
    setArticles((prevArticles) => prevArticles.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Voici le devis que vous pouvez ajuster
      </h2>
      <DetailsForm
        onEntrepriseUpdate={(details) =>
          handleDetailsUpdate("entreprise", details)
        }
        onClientUpdate={(details) => handleDetailsUpdate("client", details)}
      />
      <div className="w-full overflow-x-auto rounded-lg p-4 bg-white shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase md:w-[60%] w-[40%]">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                Quantité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                Prix UHT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                Total HT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={item.article}
                      onChange={(e) =>
                        handleChange(index, "article", e.target.value)
                      }
                      className="border-gray-300 text-black focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.quantité}
                      onChange={(e) =>
                        handleChange(index, "quantité", Number(e.target.value))
                      }
                      className="border-gray-300 text-black w-full min-w-[60px]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.prix}
                      step="0.01"
                      onChange={(e) =>
                        handleChange(index, "prix", Number(e.target.value))
                      }
                      className="border-gray-300 text-black w-full min-w-[60px]"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 w-[50px]">
                    {(item.prix * item.quantité).toFixed(2)}€
                    <button
                      onClick={() => supprimerLigne(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                {item.description && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-2 text-sm italic text-gray-500 bg-gray-50"
                    >
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        className="border-gray-300 text-black w-[100%]"
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={4} className="px-6 py-4">
                <button
                  onClick={ajouterLigne}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ajouter une ligne
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-50 border-t border-black">
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-right font-semibold text-gray-700"
              >
                Total Devis HT
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {articles
                  .reduce((sum, item) => sum + item.prix * item.quantité, 0)
                  .toFixed(2)}
                €
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className="px-6 py-4 text-right font-semibold text-gray-700"
              >
                TVA
              </td>
              <td className="px-6 py-4">
                <select
                  value={tva}
                  onChange={(e) => setTva(Number(e.target.value))}
                  className="border-gray-300 text-black"
                >
                  <option value={5.5}>5.5%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                </select>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {(
                  articles.reduce(
                    (sum, item) => sum + item.prix * item.quantité,
                    0
                  ) *
                  (tva / 100)
                ).toFixed(2)}
                €
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-right font-semibold text-gray-700"
              >
                Total TTC
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">
                {calculateTTC(
                  articles.reduce(
                    (sum, item) => sum + item.prix * item.quantité,
                    0
                  ),
                  tva
                )}
                €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {conseilItem && (
        <div className="mt-8 p-8 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-black mb-2">Conseil</h3>
          <p className="text-black">{conseilItem.conseil}</p>
        </div>
      )}

      <button
        onClick={() => setShowPdfPreview(true)}
        className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Générer le PDF
      </button>

      {showPdfPreview && (
        <PdfPreview
          entreprise={entrepriseDetails}
          client={clientDetails}
          articles={articles}
          tva={tva}
        />
      )}
    </div>
  );
};
