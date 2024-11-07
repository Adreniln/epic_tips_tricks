import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {Tooltip} from '@/components/ui/tooltip';

const EpicQuickTips = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [pendingSelection, setPendingSelection] = useState(null);

    const handleItemClick = (itemText) => {
    if (selectedItem === itemText) return; // If the same item is clicked, do nothing

    setPendingSelection(itemText); // Set the new selection to be loaded
    setSelectedItem(null); // Clear the current selection to stop the video
  };

      useEffect(() => {
    if (pendingSelection) {
      const timer = setTimeout(() => {
        setSelectedItem(pendingSelection);
        setPendingSelection(null);
      }, 100); // Short delay to unmount the previous video

      return () => clearTimeout(timer);
    }
  }, [pendingSelection]);


  const sections = {
    recentUpdates: {
      title: "November 2024 Updates",
      icon: "🆕",
      bgColor: "bg-blue-100",
      items: [
        { text: "Enhanced Assistant Bar", tip: "Centrally located search bar (Ctrl + Space) with improved search logic" },
        { text: "New Hold Duration Features", tip: "Specify exact timeframes for medication holds" }
      ]
    },
    medicationWorkflow: {
      title: "Medication Management",
      icon: "💊",
      bgColor: "bg-blue-50",
      items: [
        { text: "Order Panel Management", tip: "Create and modify custom order panels directly from inpatient manage orders" }
      ]
    },
    externalRecords: {
      title: "External Records Access",
      icon: "🔄",
      bgColor: "bg-green-50",
      items: [
        { text: "Connie HIE Integration", tip: "Access external medication histories via a one-click interface" }
      ]
    },
    clinicalTools: {
      title: "Clinical Support",
      icon: "🏥",
      bgColor: "bg-blue-50",
      items: [
        { text: "Lab Trending Tools", tip: "Monitor drug levels and lab values with integrated trending tools" },
        { text: "Sticky Notes", tip: "Enhanced sticky notes for pharmacy communications" }
      ]
    },
    shortcuts: {
      title: "Navigation Tips",
      icon: "⌨️",
      bgColor: "bg-blue-50",
      items: [
        { text: "Quick Search Access", tip: "Alt: Epic Menu, Ctrl+Space: Assistant Bar (Chart Search), Alt+C: Patient Lookup" },
        { text: "Medication Reports", tip: "Customize and rearrange medication-related report sections using drag-and-drop interface" },
        { text: "Favorite Searches", tip: "Star and organize frequently used medication and lab searches for quick access" }
      ]
    }
  };

const expandedDetails = {
  "Enhanced Assistant Bar": {
    "shortcut": ["Ctrl + Space"],
    "example": "Press Ctrl + Space to quickly search for medication administration times, records, and lab trends without extra navigation.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Nov+10%2C+2024+Upgrade+-+Meet+the+new+Chart+Search%2C+The+Assistant+Bar.mp4"
  },
  "New Hold Duration Features": {
    "shortcut": ["N/A"],
    "example": "Specify hold duration for meds during surgery to automatically resume post-op, ensuring timely continuation.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Nov+10%2C+2024+Upgrade+-+Hold+Inpatient+Medications+for+a+Specific+Duration.mp4"
  },
  "Chart Search Improvements": {
    "shortcut": ["Ctrl + Space"],
    "example": "Type 'trend scr' to instantly view a graph of levels over time for quick decision-making.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Trend+Vitals+and+Labs+in+Chart+Search.mp4"
  },
  "Order Panel Management": {
    "shortcut": ["N/A"],
    "example": "Create custom order panels for common regimens to reduce entry time and minimize errors.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Create+and+Modify+Order+Panels.mp4"
  },
  "Connie HIE Integration": {
    "shortcut": ["N/A"],
    "example": "Click the double-arrow circle icon to access external records for complete medication history, enabling timely reconciliation.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Connie+HIE+.mp4"
  },
  "Lab Trending Tools": {
    "shortcut": ["Ctrl + Space"],
    "example": "Type 'trend cbc' to instantly view a graph of levels over time for quick decision-making.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Trend+Vitals+and+Labs+in+Chart+Search.mp4"
  },
  "Sticky Notes": {
    "shortcut": ["N/A"],
    "example": "Add standardized notes for team visibility.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Smarter+Sticky+Notes.mp4"
  },
  "Quick Search Access": {
    "shortcut": ["Alt: Epic Menu, Ctrl+Space: Assistant Bar (Chart Search), Alt+C: Patient Lookup"],
    "example": "Use Alt+C for Patient Lookup and Ctrl+Space for quick searches, saving time during busy periods.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Changes+to+the+Quick+Search+in+Epic.mp4"
  },
  "Medication Reports": {
    "shortcut": ["N/A"],
    "example": "Rearrange report sections to prioritize critical data, improving efficiency in medication reviews.",
    "videourl": "https://epicvideos.s3.us-east-2.amazonaws.com/Rearrange+Report+Pane+Blocks+of+Information.mp4"
  },
  "Favorite Searches": {
    "shortcut": ["N/A"],
    "example": "Star frequent searches for quick access, improving efficiency in patient monitoring.",
    "videourl": "March 2024 Epic Updates: Chart Search Improvements"
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-3xl font-bold text-center">
            Epic Quick Tips for Pharmacists
          </CardTitle>
          <p className="text-center text-blue-100 mt-2">
            Essential Willow Inpatient Updates & Features - November 2024
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(sections).map(([key, section]) => (
              <Card key={key} className="border-t-4 border-t-blue-500 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <Tooltip
                        key={index}
                        content={item.tip} // Tooltip content on hover
                        className="tooltip-custom" // Optional: for additional styling
                      >
                        <div
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                          onClick={() => setSelectedItem(item.text)}
                        >
                          <span className="text-sm flex-1">{item.text}</span>
                          <Info size={16} className="text-blue-500 flex-shrink-0 ml-2" />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Expanded Details Section */}
          {selectedItem && expandedDetails[selectedItem] && (
              <div className="expanded-info-section bg-white p-4 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold">{selectedItem}</h3>
                <p><strong>Shortcut:</strong> {expandedDetails[selectedItem].shortcut.join(", ")}</p>
                <p><strong>Example:</strong> {expandedDetails[selectedItem].example}</p>
                {expandedDetails[selectedItem].videourl && (
                    <div className="video-container mt-4">
                      <video key={selectedItem} width="100%" controls autoPlay>
                        <source src={expandedDetails[selectedItem].videourl} type="video/mp4"/>
                        Your browser does not support the video tag.
                      </video>
                    </div>
                )}
                <button onClick={() => setSelectedItem(null)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Close
                </button>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EpicQuickTips;
