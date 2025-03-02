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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        value={demande}
        onChange={(e) => setDemande(e.target.value)}
        placeholder="Décrivez votre demande de devis ici..."
        rows={5}
        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Génération en cours..." : "Générer le devis"}
      </button>
    </form>
  );
};
