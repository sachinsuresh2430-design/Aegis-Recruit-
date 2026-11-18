"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FileDown, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ResumePdf = dynamic(() => import("@/components/ResumePdf"), { ssr: false });

type PdfComponents = {
  PDFDownloadLink: any;
  PDFViewer: any;
};

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);
  const [pdfComponents, setPdfComponents] = useState<PdfComponents | null>(null);

  useEffect(() => {
    setMounted(true);
    import("@react-pdf/renderer")
      .then((mod) => setPdfComponents({ PDFDownloadLink: mod.PDFDownloadLink, PDFViewer: mod.PDFViewer }))
      .catch((error) => console.error("Could not load PDF renderer:", error));
  }, []);

  const PDFDownloadLink = pdfComponents?.PDFDownloadLink;
  const PDFViewer = pdfComponents?.PDFViewer;

  return (
    <main className="resume-page-shell">
      <div className="resume-page-heading">
        <div>
          <p className="resume-page-kicker">PRD / PROFESSIONAL PROFILE</p>
          <h1>Résumé</h1>
          <p>Experience, projects, education, and technical skills — kept in sync with this portfolio.</p>
        </div>
        {mounted && PDFDownloadLink ? (
          <PDFDownloadLink document={<ResumePdf />} fileName="Pradeepkumar_R_Resume.pdf">
            {({ loading }: { loading: boolean }) => (
              <Button variant="secondary" disabled={loading}>
                {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
                {loading ? "Preparing PDF…" : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        ) : (
          <Button variant="secondary" disabled><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Preparing résumé…</Button>
        )}
      </div>
      <div className="resume-viewer-frame">
        {PDFViewer ? (
          <PDFViewer showToolbar={false} style={{ width: "100%", height: "min(78vh, 1100px)", border: 0 }}>
            <ResumePdf />
          </PDFViewer>
        ) : (
          <div className="resume-viewer-loading">{mounted ? "Loading résumé preview…" : "Preparing résumé preview…"}</div>
        )}
      </div>
    </main>
  );
}
