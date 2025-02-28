import { useEffect, useState } from "react";
import {  Donnée } from "../../../types/devis";
import { generateurDevis } from "../../../api/devisApi";
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

  console.log(devis);

  return (
    <div className="container">
      <h1>Générateur de Devis IA</h1>
      <DevisForm onSubmit={handleSubmit} isLoading={isLoading} />
      {devis && <DevisResult devis={devis} />}
    </div>
  );
};
