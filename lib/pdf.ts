export function buildSimplePdf(lines: string[]) {
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
