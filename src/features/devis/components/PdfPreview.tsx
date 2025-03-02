import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Définition des styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: { margin: 10, padding: 10, border: "1 solid black" },
  title: { fontSize: 20, marginBottom: 10, textAlign: "center" },
});

// Création du document PDF
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Mon PDF en React</Text>
        <Text>
          Ceci est un exemple de document généré avec react-pdf/renderer.
        </Text>
      </View>
    </Page>
  </Document>
);

// Composant avec un bouton pour télécharger le PDF
const PdfPreview = () => (
  <div>
    <PDFDownloadLink document={<MyDocument />} fileName="mon-document.pdf">
      {({ loading }) =>
        loading ? "Génération en cours..." : "Télécharger le PDF"
      }
    </PDFDownloadLink>
  </div>
);

export default PdfPreview;
