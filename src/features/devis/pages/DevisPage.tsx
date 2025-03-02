import { useEffect, useState } from "react";
import { generateurDevis } from "../../../api/devisApi";
import { Donnée } from "../../../types/devis";
import { DevisForm } from "../components/DevisForm";
import { DevisResult } from "../components/DevisResult";
import { mockDevisResponse } from "../../../mocks/devisResponse";

export const DevisPage = () => {
  const [devis, setDevis] = useState<Donnée[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setDevis(mockDevisResponse);
    }, []);

  const handleSubmit = async (demande: string) => {
    setIsLoading(true);
    try {
      const response = await generateurDevis(demande);
      setDevis(response);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Générateur de Devis IA
      </h1>
      {devis ? (
        <div className="mt-6 w-full">
          <DevisResult devis={devis} />
        </div>
      ) : (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <DevisForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
       )}
    </div>
  );
};
