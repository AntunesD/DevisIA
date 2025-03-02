import { useState } from "react";
import { generateurDevis } from "../../../api/devisApi";
import { Donnée } from "../../../interface/devis";
import { DevisForm } from "../components/DevisForm";
import { DevisResult } from "../components/DevisResult";

export const DevisPage = () => {
  const [devis, setDevis] = useState<Donnée[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setDevis(mockDevisResponse);
  // }, []);

  // useEffect(() => {
  //   setDevis(mockDevisResponseError);
  // }, []);

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

  const hasError = devis?.some((item) => "erreur" in item);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 md:px-4  w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Générateur de Devis IA
      </h1>
      {devis && !hasError ? (
        <div className="mt-6 w-full">
          <DevisResult devis={devis} />
        </div>
      ) : (
        <>
          <DevisForm onSubmit={handleSubmit} isLoading={isLoading} />
          {devis && hasError && (
            <div className="mt-4 bg-red-200 p-4 rounded-lg">
              {devis.find((item) => "erreur" in item)?.erreur}
            </div>
          )}
        </>
      )}
    </div>
  );
};
