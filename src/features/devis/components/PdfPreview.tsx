import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
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
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
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
  },
});

// Création du document PDF
const MyDocument = ({ entreprise, client, articles }: PdfPreviewProps) => (
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
          <View key={index} style={styles.tableRow}>
            <Text style={styles.articleCol}>{item.article}</Text>
            <Text style={styles.quantityCol}>{item.quantité}</Text>
            <Text style={styles.priceCol}>{item.prix}</Text>
            <Text style={styles.totalCol}>
              {(item.prix * item.quantité).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text style={styles.totalCol}>
          Total HT:{" "}
          {articles
            .reduce((sum, item) => sum + item.prix * item.quantité, 0)
            .toFixed(2)}
          €
        </Text>
      </View>
    </Page>
  </Document>
);

// Composant avec un bouton pour télécharger le PDF
const PdfPreview = (props: PdfPreviewProps) => (
  <div className="mt-6">
    <PDFDownloadLink document={<MyDocument {...props} />} fileName="devis.pdf">
      {({ loading }) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? "Génération en cours..." : "Télécharger le PDF"}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);

export default PdfPreview;
