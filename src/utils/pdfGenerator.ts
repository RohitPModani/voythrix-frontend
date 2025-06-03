import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VacationItinerary } from '../types/index';

const generatePDF = (vacationItinerary: VacationItinerary) => {
  // Initialize PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add title
  doc.setFontSize(24);
  doc.setTextColor(41, 98, 255); // Blue color
  doc.text('Your Perfect Getaway', 105, 20, { align: 'center' });

  // Add summary
  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);
  const splitSummary = doc.splitTextToSize(vacationItinerary.summary, 180);
  doc.text(splitSummary, 15, 35);

  // Add search criteria
  doc.setFontSize(16);
  doc.setTextColor(41, 98, 255);
  doc.text('Search Criteria', 15, 65);

  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);
  doc.text(`Vacation Style: ${vacationItinerary.meta.search_criteria.vacation_style}`, 15, 73);
  doc.text(`Travel Dates: ${vacationItinerary.meta.search_criteria.dates}`, 15, 80);
  doc.text(`Budget Range: ${vacationItinerary.meta.search_criteria.budget_range}`, 15, 87);

  let yPos = 100;

  // Add recommendations
  vacationItinerary.recommendations.forEach((rec, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Destination header
    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text(`${index + 1}. ${rec.destination.region}, ${rec.destination.country}`, 15, yPos);
    doc.setFontSize(14);
    doc.text(`Match Score: ${rec.destination.match_score}%`, 15, yPos + 8);

    // Why Perfect Match
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    const splitWhy = doc.splitTextToSize(rec.why_perfect_match, 180);
    doc.text(splitWhy, 15, yPos + 18);

    yPos += 35 + (splitWhy.length * 5);

    // Cost Breakdown Table
    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Cost Breakdown', 15, yPos);

    const costData = [
      ['Total per person', `${rec.costs.currency} ${rec.costs.total_per_person.toLocaleString()}`],
      ...Object.entries(rec.costs.breakdown).map(([category, amount]) => [
        category.charAt(0).toUpperCase() + category.slice(1),
        `${rec.costs.currency} ${amount.toLocaleString()}`
      ])
    ];

    autoTable(doc, {
      startY: yPos + 5,
      head: [['Category', 'Amount']],
      body: costData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      headStyles: { fillColor: [41, 98, 255], textColor: 255 },
      columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 60 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Weather & Season
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Weather & Season', 15, yPos);

    const weatherData = [
      ['Peak Season', rec.best_time_to_visit.peak_season.join(', ')],
      ['Shoulder Season', rec.best_time_to_visit.shoulder_season.join(', ')],
      ['Current Weather', rec.best_time_to_visit.weather]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      body: weatherData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Transportation & Safety
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Transportation
    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Transportation', 15, yPos);

    const transportData = [
      ['Score', `${rec.transportation.score}/10`],
      ['Options', rec.transportation.main_options.join(', ')],
      ['Details', rec.transportation.explanation]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      body: transportData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Safety
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Safety Information', 15, yPos);

    const safetyData = [
      ['Score', `${rec.safety.score}/10`],
      ['Overview', rec.safety.explanation],
      ['Considerations', rec.safety.special_considerations.join('\n')]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      body: safetyData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Must-Do Activities
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Must-Do Activities', 15, yPos);

    const activitiesData = rec.must_do_activities.map(activity => [
      activity.name,
      activity.description,
      activity.estimated_cost
    ]);

    autoTable(doc, {
      startY: yPos + 5,
      head: [['Activity', 'Description', 'Cost']],
      body: activitiesData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      headStyles: { fillColor: [41, 98, 255], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 90 },
        2: { cellWidth: 40 }
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Recommended Duration
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text('Recommended Duration', 15, yPos);

    const durationData = [
      ['Duration', `${rec.recommended_duration.minimum_days} to ${rec.recommended_duration.optimal_days} days`],
      ['Details', rec.recommended_duration.explanation]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      body: durationData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 30;

    // Add page break between destinations
    if (index < vacationItinerary.recommendations.length - 1) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Save the PDF with vacation style and timestamp
  const timestamp = Math.floor(Date.now() / 1000);
  const fileName = `${vacationItinerary.meta.search_criteria.vacation_style.split(', ').map(style => style.trim()).join('_')}_${timestamp}.pdf`;
  doc.save(fileName);
};

export default generatePDF; 