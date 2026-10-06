import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function buildSimplePdf(lines) {
  const escaped = lines.map((line) =>
    line.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)"),
  );
  const stream =
    "BT /F1 12 Tf 56 740 Td 16 TL\n" +
    escaped.map((line) => `(${line}) Tj T*\n`).join("") +
    "ET";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let out = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(out, "utf8"));
    out += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out, "utf8");
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    out += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  out += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, "utf8");
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "public/certificates"), { recursive: true });
writeFileSync(
  join(root, "public/resume.pdf"),
  buildSimplePdf([
    "MUSKAN",
    "Software Engineer",
    "Thapar Institute of Engineering and Technology",
    "B.Tech Computer Science and Engineering, 2024-2028",
    "CGPA 9.47 / 10",
    "",
    "Open to Software Engineering internships",
    "mmuskan_be24@thapar.edu  |  +91-9812463664",
    "github.com/muskan-g72  |  linkedin.com/in/muskan72gulia72",
    "",
    "EXPERIENCE",
    "Software Development Intern, CampusPro Technologies Pvt. Ltd.",
    "Gurugram  |  June 2026 - July 2026",
    "Employee Attendance Module, Integration and Implementation",
    "- Requirement analysis",
    "- Module design and development",
    "- HRMS integration",
    "- Database implementation",
    "- Testing and validation",
    "- Deployment support",
    "- Technical documentation",
    "",
    "SELECTED WORK",
    "VeriGate — verification command centre",
    "Orchestrix — AI gateway with atomic budget reservation",
    "RateShield — API gateway with Redis sliding-window limits",
    "TaskForge — concurrent C++ scheduler",
    "",
    "DISTINCTIONS",
    "Reliance Foundation Scholar 2024",
    "Thapar Merit Scholarship",
    "CBSE XII School Topper — 96.8%",
  ]),
);
writeFileSync(
  join(root, "public/certificates/campuspro.pdf"),
  buildSimplePdf([
    "CAMPUSPRO TECHNOLOGIES",
    "Internship certificate placeholder",
    "",
    "Muskan",
    "Software Development Intern",
    "June 2026 - July 2026",
    "Employee Attendance Module",
    "",
    "Replace this file with the signed certificate.",
  ]),
);
