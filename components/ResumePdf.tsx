"use client";

import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import resume from "@/data/resumeData";

const ink = "#111827";
const muted = "#526174";
const blue = "#2457D6";

const styles = StyleSheet.create({
  page: { paddingTop: 34, paddingBottom: 38, paddingHorizontal: 42, fontFamily: "Helvetica", color: ink, fontSize: 9, lineHeight: 1.42 },
  header: { borderBottomWidth: 2, borderBottomColor: blue, paddingBottom: 12, marginBottom: 13 },
  name: { fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: ink },
  role: { marginTop: 3, fontSize: 10, color: blue, fontWeight: 700 },
  contactRow: { marginTop: 7, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  contact: { fontSize: 8, color: muted },
  section: { marginTop: 11 },
  sectionTitle: { fontSize: 10, color: blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, borderBottomWidth: 0.7, borderBottomColor: "#CBD5E1", paddingBottom: 3, marginBottom: 6 },
  paragraph: { fontSize: 8.8, color: ink, lineHeight: 1.5 },
  entry: { marginBottom: 6 },
  entryTitle: { fontSize: 9, fontWeight: 700, color: ink },
  entryMeta: { fontSize: 8, color: muted, marginTop: 1 },
  bullet: { marginLeft: 9, paddingLeft: 2, fontSize: 8, color: ink, marginTop: 1 },
  skillsRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { width: 70, fontSize: 8, fontWeight: 700, color: muted },
  skillValue: { flex: 1, fontSize: 8, color: ink },
  compactLine: { fontSize: 8.3, marginBottom: 3 },
  link: { fontSize: 8, color: blue, textDecoration: "none" },
});

export default function ResumePdf() {
  return (
    <Document title="Pradeepkumar R — Resume" author="Pradeepkumar R" subject="Software Developer Resume">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.role}>{resume.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contact}>{resume.contact.email}</Text>
            <Text style={styles.contact}>· {resume.contact.location}</Text>
          </View>
          <View style={styles.contactRow}>
            <Link src={resume.contact.linkedin} style={styles.link}>LinkedIn</Link>
            <Link src={resume.contact.github} style={styles.link}>GitHub</Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.paragraph}>{resume.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((item) => (
            <View key={item.company} style={styles.entry} wrap={false}>
              <Text style={styles.entryTitle}>{item.role} · {item.company}</Text>
              <Text style={styles.entryMeta}>{item.period}</Text>
              {item.highlights.map((highlight) => <Text key={highlight} style={styles.bullet}>• {highlight}</Text>)}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Projects</Text>
          {resume.projects.map((item) => (
            <View key={item.name} style={styles.entry} wrap={false}>
              <Text style={styles.entryTitle}>{item.name}</Text>
              <Text style={styles.paragraph}>{item.description}</Text>
            </View>
          ))}
          <Text style={styles.entryMeta}>Additional projects: {resume.additionalProjects.join(" · ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((item) => (
            <View key={item.degree} style={styles.entry} wrap={false}>
              <Text style={styles.entryTitle}>{item.degree}</Text>
              <Text style={styles.entryMeta}>{item.institution} · {item.period} · {item.result}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {Object.entries(resume.skills).map(([label, values]) => (
            <View key={label} style={styles.skillsRow}>
              <Text style={styles.skillLabel}>{label}</Text>
              <Text style={styles.skillValue}>{values.join(" · ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards & Recognition</Text>
          {resume.awards.map((award) => <Text key={award} style={styles.compactLine}>• {award}</Text>)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications & Workshops</Text>
          {resume.certifications.map((cert) => <Text key={cert} style={styles.compactLine}>• {cert}</Text>)}
        </View>
      </Page>
    </Document>
  );
}
