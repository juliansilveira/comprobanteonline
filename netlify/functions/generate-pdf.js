const PDFDocument = require("pdfkit");

exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const {
      nombre,
      apellido,
      categoria,
      numeroSocio,
      monto,
      fecha,
      observacion,
      tipo,
    } = JSON.parse(event.body);

    // Validar datos requeridos
    if (!nombre || !apellido || !monto || !fecha) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos requeridos" }),
      };
    }

    // Crear documento PDF
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Buffer para almacenar el PDF
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    // Promesa para esperar a que termine el PDF
    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    // --- ENCABEZADO ---
    doc
      .fontSize(24)
      .fillColor("#2563eb")
      .text("COMPROBANTE DE PAGO", { align: "center" });

    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .fillColor("#6b7280")
      .text(tipo === "socio" ? "Socio" : "Alumno", { align: "center" });

    // Línea separadora
    doc.moveDown(1);
    doc
      .strokeColor("#e5e7eb")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();

    doc.moveDown(1.5);

    // --- DATOS DEL COMPROBANTE ---
    doc.fillColor("#000000");

    // Nombre completo
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Datos del Pagador", { underline: true });

    doc.moveDown(0.5);
    doc.fontSize(12).font("Helvetica");

    doc
      .text(`Nombre: `, { continued: true })
      .font("Helvetica-Bold")
      .text(`${nombre} ${apellido}`);

    doc.font("Helvetica");

    // Categoría o Número de Socio
    if (tipo === "socio" && numeroSocio) {
      doc
        .text(`Número de Socio: `, { continued: true })
        .font("Helvetica-Bold")
        .text(numeroSocio);
    } else if (categoria) {
      doc
        .text(`Categoría: `, { continued: true })
        .font("Helvetica-Bold")
        .text(categoria);
    }

    doc.moveDown(1.5);

    // --- DETALLES DEL PAGO ---
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Detalles del Pago", { underline: true });

    doc.moveDown(0.5);
    doc.fontSize(12).font("Helvetica");

    // Monto destacado
    doc
      .fontSize(16)
      .fillColor("#16a34a")
      .text(`Monto: `, { continued: true })
      .font("Helvetica-Bold")
      .text(`$${monto}`);

    doc.fillColor("#000000").fontSize(12).font("Helvetica");

    // Fecha
    doc.text(`Fecha: `, { continued: true }).font("Helvetica-Bold").text(fecha);

    // Observación (si existe)
    if (observacion) {
      doc.moveDown(1);
      doc.font("Helvetica-Bold").text("Observación:");
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#4b5563")
        .text(observacion, {
          width: 495,
          align: "left",
        });
    }

    // --- PIE DE PÁGINA ---
    doc.moveDown(3);

    // Línea separadora
    doc
      .strokeColor("#e5e7eb")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();

    doc.moveDown(1);

    doc
      .fontSize(10)
      .fillColor("#6b7280")
      .text("✅ Gracias por su pago", { align: "center" });

    doc.moveDown(0.3);
    doc
      .fontSize(8)
      .text(
        `Generado el ${new Date().toLocaleDateString(
          "es-AR"
        )} a las ${new Date().toLocaleTimeString("es-AR")}`,
        {
          align: "center",
        }
      );

    // Finalizar PDF
    doc.end();

    // Esperar a que termine el PDF
    const pdfBuffer = await pdfPromise;

    // Retornar PDF como base64
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=comprobante-${nombre}-${apellido}.pdf`,
      },
      body: pdfBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error generando PDF:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al generar el PDF",
        details: error.message,
      }),
    };
  }
};
