import {
    Document,
    Page,
    PDFDownloadLink,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { useEffect } from "react";
import { Article } from "../../../interface/devis";

interface PdfPreviewProps {
  entreprise: {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    siret: string;
  };
  client: {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
  };
  articles: Article[];
  tva: number;
}

// Définition des styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoSection: { width: "48%" },
  infoTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
  infoText: { fontSize: 10, marginBottom: 3 },
  table: { width: "100%", marginTop: 20 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
    fontSize: 10,
  },
  description: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#666666",
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  articleCol: { width: "50%" },
  quantityCol: { width: "15%" },
  priceCol: { width: "15%" },
  totalCol: { width: "20%" },
  total: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
  },
  totalSection: {
    marginTop: 20,
    padding: 8,
    fontSize: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  totalValue: {
    width: "20%",
  },
});

// Création du document PDF
const MyDocument = ({ entreprise, client, articles, tva }: PdfPreviewProps) => {
  const totalHT = articles.reduce(
    (sum, item) => sum + item.prix * item.quantité,
    0
  );
  const montantTVA = totalHT * (tva / 100);
  const totalTTC = totalHT * (1 + tva / 100);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Informations de l'entreprise</Text>
            <Text style={styles.infoText}>{entreprise.nom}</Text>
            <Text style={styles.infoText}>{entreprise.adresse}</Text>
            <Text style={styles.infoText}>Tél: {entreprise.telephone}</Text>
            <Text style={styles.infoText}>Email: {entreprise.email}</Text>
            <Text style={styles.infoText}>SIRET: {entreprise.siret}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Informations du client</Text>
            <Text style={styles.infoText}>{client.nom}</Text>
            <Text style={styles.infoText}>{client.adresse}</Text>
            <Text style={styles.infoText}>Tél: {client.telephone}</Text>
            <Text style={styles.infoText}>Email: {client.email}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.articleCol}>Article</Text>
            <Text style={styles.quantityCol}>Quantité</Text>
            <Text style={styles.priceCol}>Prix UHT</Text>
            <Text style={styles.totalCol}>Total HT</Text>
          </View>

          {articles.map((item, index) => (
            <View key={index}>
              <View style={styles.tableRow}>
                <Text style={styles.articleCol}>{item.article}</Text>
                <Text style={styles.quantityCol}>{item.quantité}</Text>
                <Text style={styles.priceCol}>{item.prix}</Text>
                <Text style={styles.totalCol}>
                  {(item.prix * item.quantité).toFixed(2)}
                </Text>
              </View>
              {item.description && (
                <View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT:</Text>
            <Text style={styles.totalValue}>{totalHT.toFixed(2)}€</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA ({tva}%):</Text>
            <Text style={styles.totalValue}>{montantTVA.toFixed(2)}€</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC:</Text>
            <Text style={styles.totalValue}>{totalTTC.toFixed(2)}€</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Composant avec un bouton pour télécharger le PDF
const PdfPreview = ({ entreprise, client, articles, tva }: PdfPreviewProps) => {
    useEffect(() => {
      const button = document.getElementById("pdf-download-button");
      if (button) {
        button.click();
      }
    }, []);
  
    return (
      <div className="mt-6">
        <PDFDownloadLink
          document={<MyDocument {...{ entreprise, client, articles, tva }} />}
          fileName="devis.pdf"
        >
          {({ loading }) => (
            <button
              id="pdf-download-button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? "Génération en cours..." : "Clicker si le PDF ne s'est pas telecharger"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    );
  };

export default PdfPreview;
