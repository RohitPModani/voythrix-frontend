import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Itinerary } from '../types/index';

const generateItineraryPDF = (itinerary: Itinerary) => {
  // Initialize PDF with same settings as pdfGenerator
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add title with same style
  doc.setFontSize(24);
  doc.setTextColor(41, 98, 255);
  doc.text('Your Perfect Trip Itinerary', 105, 20, { align: 'center' });

  // Add summary with same formatting
  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);
  const splitSummary = doc.splitTextToSize(itinerary.summary, 180);
  doc.text(splitSummary, 15, 35);

  // Add search criteria
  doc.setFontSize(16);
  doc.setTextColor(41, 98, 255);
  doc.text('Trip Details', 15, 65);

  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);
  doc.text(`Destinations: ${itinerary.destinations.join(", ")}`, 15, 73);
  doc.text(`Duration: ${itinerary.trip_duration.total_days} days (${itinerary.trip_duration.start_date} to ${itinerary.trip_duration.end_date})`, 15, 80);
  doc.text(`Budget Range: ${itinerary.estimated_costs.currency} ${itinerary.estimated_costs.minimum_total} - ${itinerary.estimated_costs.maximum_total}`, 15, 87);

  let yPos = 100;

  // Daily Itinerary section with consistent styling
  doc.setFontSize(18);
  doc.setTextColor(41, 98, 255);
  doc.text('Daily Itinerary', 15, yPos);
  yPos += 10;

  // Process each day
  itinerary.daily_itinerary.forEach((day, index) => {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    // Day header
    doc.setFontSize(16);
    doc.setTextColor(41, 98, 255);
    doc.text(`Day ${day.day_number}: ${day.date}`, 15, yPos);
    yPos += 10;

    // Title if present
    if (day.title && day.title.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(`Title: ${day.title}`, 15, yPos);
      yPos += 10;
    }

    // Description if present
    if (day.description && day.description.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      const splitDescription = doc.splitTextToSize(day.description, 180);
      doc.text(splitDescription, 15, yPos);
      yPos += 40;
    }

    if (yPos > 230 || index === itinerary.daily_itinerary.length - 1) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Dining section
  if (itinerary.dining && itinerary.dining.length > 0) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text('Dining', 15, yPos);
    yPos += 10;

    itinerary.dining.forEach(dining => {
      doc.setFontSize(14);  
      doc.setTextColor(41, 98, 255);
      doc.text(dining.city, 15, yPos);
      yPos += 8;

      const diningData = dining.recommendations.map(recommendation => [
        recommendation.name,  
        recommendation.address
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Name', 'Address']],
        body: diningData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        headStyles: { fillColor: [41, 98, 255], textColor: 255 },
        columnStyles: { 
          0: { cellWidth: 70 },
          1: { cellWidth: 50 },
          2: { cellWidth: 60 }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    });
  }

  // Accommodation section
  if (itinerary.accommodation && itinerary.accommodation.length > 0) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text('Accommodation', 15, yPos);
    yPos += 10;

    itinerary.accommodation.forEach(acc => {
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text(acc.city, 15, yPos);
      yPos += 8;

      const accData = acc.recommendations.map(rec => [
        rec.name,
        rec.address
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Name', 'Address']],
        body: accData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 
          0: { cellWidth: 70 },
          1: { cellWidth: 170 }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    });
  }

  // Hidden Gems section
  if (itinerary.hidden_gems && itinerary.hidden_gems.length > 0) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text('Hidden Gems', 15, yPos);
    yPos += 10;

    // Hidden Gems
    if (itinerary.hidden_gems) {
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);  
      doc.text('Hidden Gems', 15, yPos);
      yPos += 8;

      const hiddenGemsData = itinerary.hidden_gems.map(gem => ['•', gem]);

      autoTable(doc, {
        startY: yPos,
        body: hiddenGemsData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }
  }

  // Save the PDF with consistent naming convention
  const timestamp = Math.floor(Date.now() / 1000);
  const firstDestination = itinerary.destinations[0].replace(/,/g, '_');
  const fileName = `${firstDestination}_itinerary_${timestamp}.pdf`;
  doc.save(fileName);
};

export default generateItineraryPDF;