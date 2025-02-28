import { useState } from "react";

interface DevisFormProps {
  onSubmit: (demande: string) => Promise<void>;
  isLoading: boolean;
}

export const DevisForm = ({ onSubmit, isLoading }: DevisFormProps) => {
  const [demande, setDemande] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(demande);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={demande}
        onChange={(e) => setDemande(e.target.value)}
        placeholder="Décrivez votre demande de devis ici..."
        rows={5}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Génération en cours..." : "Générer le devis"}
      </button>
    </form>
  );
};
