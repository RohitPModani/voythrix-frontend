import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Itinerary, Activity } from '../types/index';

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
  doc.text(`Budget Range: ${itinerary.total_budget_estimate.currency} ${itinerary.total_budget_estimate.low} - ${itinerary.total_budget_estimate.high}`, 15, 87);

  let yPos = 100;

  // Daily Itinerary section with consistent styling
  doc.setFontSize(18);
  doc.setTextColor(41, 98, 255);
  doc.text('Daily Itinerary', 15, yPos);
  yPos += 10;

  const renderActivity = (activity: Activity, doc: jsPDF, yPos: number): number => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Activity header
    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text(activity.activity, 15, yPos);
    yPos += 8;

    // Activity details
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    
    const details = [
      ['Time', activity.time],
      ['Description', activity.description]
    ];

    if (activity.location) {
      details.push(['Location', activity.location.name]);
      details.push(['Address', activity.location.address]);
    }

    if (activity.cost) {
      details.push(['Cost', `${activity.cost.amount} ${activity.cost.currency}`]);
    }

    if (activity.booking_info?.required) {
      details.push(['Booking', activity.booking_info.instructions]);
    }

    autoTable(doc, {
      startY: yPos,
      body: details,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 140 } },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Notes if present
    if (activity.notes && activity.notes.length > 0) {
      const notesData = activity.notes.map(note => ['•', note]);
      autoTable(doc, {
        startY: yPos,
        body: notesData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    return yPos;
  };

  // Process each day
  itinerary.days.forEach((day, index) => {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    // Day header
    doc.setFontSize(16);
    doc.setTextColor(41, 98, 255);
    doc.text(`Day ${day.day_number}: ${day.date}`, 15, yPos);
    yPos += 10;

    // Themes if present
    if (day.themes && day.themes.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(`Themes: ${day.themes.join(", ")}`, 15, yPos);
      yPos += 10;
    }

    // Morning activities
    if (day.morning && day.morning.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Morning', 15, yPos);
      yPos += 8;

      day.morning.forEach(activity => {
        yPos = renderActivity(activity, doc, yPos);
      });
    }

    // Afternoon activities
    if (day.afternoon && day.afternoon.length > 0) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Afternoon', 15, yPos);
      yPos += 8;

      day.afternoon.forEach(activity => {
        yPos = renderActivity(activity, doc, yPos);
      });
    }

    // Evening activities
    if (day.evening && day.evening.length > 0) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Evening', 15, yPos);
      yPos += 8;

      day.evening.forEach(activity => {
        yPos = renderActivity(activity, doc, yPos);
      });
    }

    // Dining options
    if (day.dining) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Dining Options', 15, yPos);
      yPos += 8;

      const renderDiningSection = (title: string, options: any[]) => {
        if (!options || options.length === 0) return;
        
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        doc.text(title, 20, yPos);
        yPos += 6;

        options.forEach(option => {
          const diningData = [
            ['Name', option.name],
            ['Cuisine', option.cuisine],
            ['Cost Range', option.cost_range]
          ];
          
          if (option.recommended_dishes && option.recommended_dishes.length > 0) {
            diningData.push(['Recommended', option.recommended_dishes.join(", ")]);
          }

          autoTable(doc, {
            startY: yPos,
            body: diningData,
            theme: 'grid',
            styles: { fontSize: 11, cellPadding: 3 },
            columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 140 } },
          });
          yPos = (doc as any).lastAutoTable.finalY + 10;
        });
      };

      renderDiningSection('Breakfast:', day.dining.breakfast);
      renderDiningSection('Lunch:', day.dining.lunch);
      renderDiningSection('Dinner:', day.dining.dinner);
    }

    // Important notes
    if (day.important_notes && day.important_notes.length > 0) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Important Notes', 15, yPos);
      yPos += 8;

      const notesData = day.important_notes.map(note => ['•', note]);
      autoTable(doc, {
        startY: yPos,
        body: notesData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Add page break between days if not last day
    if (index < itinerary.days.length - 1) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Accommodation section
  if (itinerary.accommodation && itinerary.accommodation.length > 0) {
    doc.addPage();
    yPos = 20;
    
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
        rec.type,
        `${rec.price_range.low}-${rec.price_range.high} ${rec.price_range.currency}`
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Name', 'Type', 'Price Range']],
        body: accData,
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

  // Essential Information section
  if (itinerary.essential_information) {
    doc.addPage();
    yPos = 20;

    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text('Essential Information', 15, yPos);
    yPos += 10;

    // Emergency Contacts
    if (itinerary.essential_information.emergency_contacts) {
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Emergency Contacts', 15, yPos);
      yPos += 8;

      const emergencyData = Object.entries(itinerary.essential_information.emergency_contacts)
        .map(([key, value]) => [key, value]);

      autoTable(doc, {
        startY: yPos,
        head: [['Service', 'Number']],
        body: emergencyData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        headStyles: { fillColor: [41, 98, 255], textColor: 255 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 100 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Packing List
    if (itinerary.essential_information.packing_list) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Packing List', 15, yPos);
      yPos += 8;

      const packingData = itinerary.essential_information.packing_list.map(item => ['•', item]);
      autoTable(doc, {
        startY: yPos,
        body: packingData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Cultural Tips
    if (itinerary.essential_information.cultural_tips) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Cultural Tips', 15, yPos);
      yPos += 8;

      const tipsData = itinerary.essential_information.cultural_tips.map(tip => ['•', tip]);
      autoTable(doc, {
        startY: yPos,
        body: tipsData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Weather Expectations
    if (itinerary.essential_information.weather_expectations) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Weather Expectations', 15, yPos);
      yPos += 8;

      const weather = itinerary.essential_information.weather_expectations;
      const weatherData = [
        ['Temperature', weather.temperature_range],
        ['Precipitation', weather.precipitation],
        ['Seasonal Notes', weather.seasonal_notes]
      ];

      autoTable(doc, {
        startY: yPos,
        body: weatherData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Safety Considerations
    if (itinerary.essential_information.safety_considerations) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Safety Considerations', 15, yPos);
      yPos += 8;

      const safetyData = itinerary.essential_information.safety_considerations.map(item => ['•', item]);
      autoTable(doc, {
        startY: yPos,
        body: safetyData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Local Transportation
    if (itinerary.essential_information.local_transportation) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Local Transportation', 15, yPos);
      yPos += 8;

      const transport = itinerary.essential_information.local_transportation;
      const transportData = [
        ['Options', transport.options.join('\n')],
        ['Tips', transport.tips.join('\n')],
        ['Apps', transport.apps.join('\n')]
      ];

      autoTable(doc, {
        startY: yPos,
        body: transportData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Hidden Gems
    if (itinerary.essential_information.hidden_gems) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Hidden Gems', 15, yPos);
      yPos += 8;

      const hiddenGemsData = itinerary.essential_information.hidden_gems.map(gem => ['•', gem]);
      autoTable(doc, {
        startY: yPos,
        body: hiddenGemsData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Photo Worthy Locations
    if (itinerary.essential_information.photo_worthy_locations) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(41, 98, 255);
      doc.text('Photo Worthy Locations', 15, yPos);
      yPos += 8;

      const photoData = itinerary.essential_information.photo_worthy_locations.map(location => ['•', location]);
      autoTable(doc, {
        startY: yPos,
        body: photoData,
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 170 } },
      });
    }
  }

  // Save the PDF with consistent naming convention
  const timestamp = Math.floor(Date.now() / 1000);
  const firstDestination = itinerary.destinations[0].replace(/,/g, '_');
  const fileName = `${firstDestination}_itinerary_${timestamp}.pdf`;
  doc.save(fileName);
};

export default generateItineraryPDF;