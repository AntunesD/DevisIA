import React, { useState, useEffect } from "react";
import { Donnée, Article } from "../../../types/devis";

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

  return (
    <div className=" mx-auto p-6 flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Votre Devis</h2>
      <div className=" rounded-lg p-4 bg-white shadow-lg">
        <table className="w-[1000px] table-auto">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-left  text-xs font-medium  text-gray-500 uppercase w-[85%]">
                Article
              </th>
              <th
                className=" px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase w-[5%]"
              >
                Quantité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  w-[5%]">
                Prix UHT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  w-[5%]">
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
                      className="border-gray-300 text-black   focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.quantité}
                      onChange={(e) =>
                        handleChange(index, "quantité", Number(e.target.value))
                      }
                      className="border-gray-300 text-black w-[50px]"
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
                      className="border-gray-300 text-black w-[50px]"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 w-[50px]">
                    {(item.prix * item.quantité).toFixed(2)}€
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
          </tbody>
          <tfoot className="bg-gray-50">
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
          </tfoot>
        </table>
      </div>
      {conseilItem && (
        <div className="mt-8 p-8 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-black mb-2">Conseil</h3>
          <p className="text-black">{conseilItem.conseil}</p>
        </div>
      )}
    </div>
  );
};
