import { useState, useEffect } from "react";

interface DetailsFormProps {
  onEntrepriseUpdate: (details: any) => void;
  onClientUpdate: (details: any) => void;
}

const DetailsForm = ({
  onEntrepriseUpdate,
  onClientUpdate,
}: DetailsFormProps) => {
  const [entreprise, setEntreprise] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
    siret: "",
  });

  const [client, setClient] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    onEntrepriseUpdate(entreprise);
  }, [entreprise, onEntrepriseUpdate]);

  useEffect(() => {
    onClientUpdate(client);
  }, [client, onClientUpdate]);

  return (
    <div className="flex flex-col md:flex-row justify-between mb-8  bg-white rounded-lg p-4">
      <div className="w-full md:w-1/2 p-4">
        <h3 className="font-bold mb-2">Informations de l'entreprise</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nom de l'entreprise"
            value={entreprise.nom}
            onChange={(e) =>
              setEntreprise({ ...entreprise, nom: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Adresse"
            value={entreprise.adresse}
            onChange={(e) =>
              setEntreprise({ ...entreprise, adresse: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={entreprise.telephone}
            onChange={(e) =>
              setEntreprise({ ...entreprise, telephone: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={entreprise.email}
            onChange={(e) =>
              setEntreprise({ ...entreprise, email: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="SIRET"
            value={entreprise.siret}
            onChange={(e) =>
              setEntreprise({ ...entreprise, siret: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4">
        <h3 className="font-bold mb-2">Informations du client</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nom du client"
            value={client.nom}
            onChange={(e) => setClient({ ...client, nom: e.target.value })}
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Adresse"
            value={client.adresse}
            onChange={(e) => setClient({ ...client, adresse: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={client.telephone}
            onChange={(e) =>
              setClient({ ...client, telephone: e.target.value })
            }
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
