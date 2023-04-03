const pdfDocument = require('pdfkit');
const fs = require('fs');


async function Invoice(kosar,pfdId) {
const doc = new pdfDocument();

    // pdf létrehozása
    doc.pipe(fs.createWriteStream(`./temp/pdf/${pfdId}.pdf`))

    // Hozzáadott elemek formázása
    doc.fontSize(25)

        .text('GrossKidz számlája!', 120, 120)
        .underline(120, 120, 360, 27, { color: '#000000' })
        
        .moveDown();
    for (let i = 0; i < kosar.length; i++) {
        doc.moveDown();
        doc.scale(0.6)
            .text('Termék megnevezése:', 220 + i, 520,)
            .text(kosar[i].megnevezes,)
            .text('Termék mennyisége:',)
            .text(kosar[i].mennyiseg,)
            .text('Összege:')
            .text(kosar[i].osszeg * kosar[i].mennyiseg + 'Ft')
        doc.restore();
    }
}

module.exports = {Invoice};