'use client';

import { useState, useEffect } from 'react';
import { Info, Keyboard, ListChecks, Play, HelpCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';

// Type definitions
interface ItemType {
  text: string;
  tip: string;
}

interface SectionType {
  title: string;
  icon: string;
  bgColor: string;
  items: ItemType[];
}

interface ExpandedDetailType {
  shortcut: string[];
  steps: string[];
  videourl?: string;
  what: string;
  when: string;
}

interface SectionsType {
  [key: string]: SectionType;
}

interface ExpandedDetailsType {
  [key: string]: ExpandedDetailType;
}

const EpicQuickTips = () => {
  // Consolidated state declarations with proper typing
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleItemClick = (itemText: string) => {
    if (selectedItem === itemText) return;
    setPendingSelection(itemText);
    setSelectedItem(null);
  };

  const handleItemSelection = (sectionKey: string, itemText: string) => {
    setIsTransitioning(true);
    setSelectedSection(sectionKey);
    setSelectedItem(itemText);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setSelectedItem(null);
    setSelectedSection(null);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    if (pendingSelection) {
      const timer = setTimeout(() => {
        setSelectedItem(pendingSelection);
        setPendingSelection(null);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pendingSelection]);

  const sections: SectionsType = {
    searchNav: {
      title: "Search & Navigation",
      icon: "🔍",
      bgColor: "bg-blue-50",
      items: [
        { text: "Enhanced Assistant Bar", tip: "Centralizes chart search with enhanced capabilities for trending and calculations" },
        { text: "Quick Search", tip: "Provides system-wide search capabilities outside of patient charts" },
        { text: "Chart Search", tip: "Enables comprehensive search within patient charts" },
        { text: "Patient lookup", tip: "Provides quick access to patient charts" },
        { text: "Trending labs and vitals", tip: "Creates visual representations of patient data trends" }
      ]
    },
    workspaceCustomization: {
      title: "Workspace Customization",
      icon: "⚙️",
      bgColor: "bg-green-50",
      items: [
        { text: "Default workspace settings", tip: "Sets preferred initial workspace upon login" },
        { text: "Chart review tab customization", tip: "Allows personalization of chart review tab layout" },
        { text: "Report pane organization", tip: "Enables rearrangement of report information blocks" },
        { text: "Moving tools and buttons", tip: "Enables drag-and-drop customization of Epic interface elements" }
      ]
    },
    medicationManagement: {
      title: "Medication Management",
      icon: "💊",
      bgColor: "bg-blue-50",
      items: [
        { text: "Medication holds with duration", tip: "Allows setting specific durations for medication holds" },
        { text: "Order panels creation and modification", tip: "Enables creation and customization of order panels" }
      ]
    },
    infusionPlans: {
      title: "Infusion Plans",
      icon: "💉",
      bgColor: "bg-purple-50",
      items: [
        { text: "Creating Therapy Plans", tip: "Streamlines creation of infusion therapy protocols" },
        { text: "Managing Plans", tip: "Provides tools for organizing and editing therapy plans" },
        { text: "Treatment Timing", tip: "Manages start times for infusion orders" },
        { text: "Protocol Names", tip: "Enables customization of therapy plan names" }
      ]
    },
    communication: {
      title: "Communication & Handoffs",
      icon: "📱",
      bgColor: "bg-yellow-50",
      items: [
        { text: "Sticky Notes", tip: "Enables personal and team communication about patients" },
        { text: "Advanced Sticky Notes Features", tip: "Adds smart phrases and auto-launch options to notes" },
        { text: "Patient reminder lists", tip: "Creates organized lists of patient-specific reminders" },
        { text: "Notification center", tip: "Centralizes all system notifications and messages" }
      ]
    },
    clinicalResources: {
      title: "Clinical Resources",
      icon: "📚",
      bgColor: "bg-red-50",
      items: [
        { text: "EMMI patient education resources", tip: "Provides access to patient education materials" },
        { text: "External records access (Connie HIE)", tip: "Enables view of external facility records" }
      ]
    }
  };

    interface ExpandedDetailsType {
        [key: string]: {
            shortcut: string[];
            steps: string[];
            videourl?: string;
            what: string;
            when: string;
        }
    }

    const expandedDetails: ExpandedDetailsType = {
        "Enhanced Assistant Bar": {
            shortcut: ["Ctrl + Space"],
            steps: [
                "Open patient chart",
                "Press Ctrl + Space (or click center bar)",
                "Type search term",
                "→ Use 'trend' or 'graph' for visuals",
                "→ Use calculations directly",
                "✓ Review results in right panel"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Nov+10%2C+2024+Upgrade+-+Meet+the+new+Chart+Search%2C+The+Assistant+Bar.mp4",
            what: "Centralizes chart search with enhanced capabilities for trending and calculations",
            when: "Whenever you need to search within a patient's chart or perform quick calculations"
        },
        "Quick Search": {
            shortcut: ["Alt key"],
            steps: [
                "Press Alt key",
                "Type search term",
                "Select from results",
                "→ Recent searches shown below",
                "✓ Launch selected item"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Changes+to+the+Quick+Search+in+Epic.mp4",
            what: "Provides system-wide search capabilities outside of patient charts",
            when: "For accessing Epic tools, activities, or sending messages"
        },
        "Chart Search": {
            shortcut: ["Ctrl + Space"],
            steps: [
                "Access chart search",
                "Enter search terms",
                "View results",
                "→ Use calculations/conversions",
                "✓ Select desired info"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Trend+Vitals+and+Labs+in+Chart+Search.mp4",
            what: "Enables comprehensive search within patient charts",
            when: "To find specific patient information or perform calculations"
        },
        "Patient lookup": {
            shortcut: ["Alt + C"],
            steps: [
                "Press Alt + C",
                "Enter patient info",
                "Verify patient",
                "✓ Click Accept"
            ],
            what: "Provides quick access to patient charts",
            when: "When you need to find and open a patient's chart"
        },
        "Trending labs and vitals": {
            shortcut: ["Ctrl + Space (then type \"trend\")"],
            steps: [
                "Open chart search",
                "Type \"trend\" + metric",
                "Select timeframe",
                "✓ Review graph"
            ],
            what: "Creates visual representations of patient data trends",
            when: "To analyze patterns in patient labs and vitals over time"
        },
        "Default workspace settings": {
            shortcut: ["None noted"],
            steps: [
                "Open desired workspace",
                "Click star icon",
                "✓ Confirm selection"
            ],
            what: "Sets preferred initial workspace upon login",
            when: "To streamline workflow by starting in most-used area"
        },
        "Chart review tab customization": {
            shortcut: ["None noted"],
            steps: [
                "Right-click any tab",
                "Choose options:",
                "→ Assign colors",
                "→ Manage tab order",
                "✓ Save changes"
            ],
            what: "Allows personalization of chart review tab layout",
            when: "To optimize chart review workflow"
        },
        "Report pane organization": {
            shortcut: ["None noted"],
            steps: [
                "Click Wrench icon",
                "Select Modify Layout",
                "Drag blocks",
                "✓ Click Accept"
            ],
            what: "Enables rearrangement of report information blocks",
            when: "To prioritize most-referenced information"
        },
        "Medication holds with duration": {
            shortcut: ["None noted"],
            steps: [
                "Open Manage Orders",
                "Select medication(s)",
                "Choose Hold",
                "→ Specify duration/end time",
                "→ Or select \"until manually unhold\"",
                "✓ Sign the hold"
            ],
            what: "Allows setting specific durations for medication holds",
            when: "When temporarily suspending medications for a known period"
        },
        "Order panels creation and modification": {
            shortcut: ["None noted"],
            steps: [
                "Fill shopping cart",
                "Options → Create Panel",
                "Name panel",
                "→ Adjust order details",
                "✓ Save panel"
            ],
            what: "Enables creation and customization of order panels",
            when: "When frequently ordering the same set of medications together"
        },
        "Creating Therapy Plans": {
            shortcut: ["None noted"],
            steps: [
                "Select episode type",
                "Choose protocol",
                "→ Preview displays on right",
                "Adjust details",
                "✓ Accept protocol"
            ],
            what: "Streamlines creation of infusion therapy protocols",
            when: "When initiating new infusion therapy regimens"
        },
        "Managing Plans": {
            shortcut: ["None noted"],
            steps: [
                "Access therapy plan",
                "Drag/drop orders",
                "Toggle calendar view",
                "✓ Release lock when done"
            ],
            what: "Provides tools for organizing and editing therapy plans",
            when: "During ongoing management of infusion therapies"
        },
        "Treatment Timing": {
            shortcut: ["None noted"],
            steps: [
                "Click Actions",
                "Select start times",
                "Adjust schedule",
                "✓ Complete treatment"
            ],
            what: "Manages start times for infusion orders",
            when: "When coordinating multiple infusions for a patient"
        },
        "Protocol Names": {
            shortcut: ["None noted"],
            steps: [
                "Edit plan properties",
                "Modify plan name",
                "✓ Save changes"
            ],
            what: "Enables customization of therapy plan names",
            when: "For clearer identification of specific protocols"
        },
        "Sticky Notes": {
            shortcut: ["None noted"],
            steps: [
                "Click note icon",
                "→ Yellow: personal",
                "→ Blue: specialty",
                "Add/edit note",
                "✓ Save"
            ],
            what: "Enables personal and team communication about patients",
            when: "For important non-medical record reminders"
        },
        "Advanced Sticky Notes Features": {
            shortcut: ["None noted"],
            steps: [
                "Click star dropdown",
                "Select smart phrase",
                "Set auto-launch",
                "✓ Save note"
            ],
            what: "Adds smart phrases and auto-launch options to notes",
            when: "To standardize communication and improve efficiency"
        },
        "Patient reminder lists": {
            shortcut: ["None noted"],
            steps: [
                "Right-click patient",
                "Add to reminder list",
                "Set due date",
                "✓ Monitor in basket"
            ],
            what: "Creates organized lists of patient-specific reminders",
            when: "To track multiple patient-related tasks"
        },
        "Notification center": {
            shortcut: ["None noted"],
            steps: [
                "Check toolbar badges",
                "Click relevant badge",
                "✓ Handle notifications"
            ],
            what: "Centralizes all system notifications and messages",
            when: "To monitor and manage all communications"
        },
        "EMMI patient education resources": {
            shortcut: ["None noted"],
            steps: [
                "Open Plan tab",
                "Click Clinical References",
                "Select content",
                "→ Print now",
                "→ Send to MyChart",
                "✓ Star favorites"
            ],
            what: "Provides access to patient education materials",
            when: "When providing patient education or discharge instructions"
        },
        "External records access (Connie HIE)": {
            shortcut: ["None noted"],
            steps: [
                "Find circle icon",
                "Access Connie portal",
                "Select category",
                "✓ Review records"
            ],
            what: "Enables view of external facility records",
            when: "When reviewing patient's external care history"
        },
        "Moving tools and buttons": {
            shortcut: ["None noted"],
            steps: [
                "Click and hold item",
                "Drag to new location",
                "→ Works for toolbar buttons",
                "→ Works for activity tabs",
                "→ Works for navigator buttons",
                "✓ Release to place"
            ],
            what: "Enables drag-and-drop customization of Epic interface elements",
            when: "When optimizing your workspace layout"
        },
        "Plan Properties": {
            shortcut: ["None noted"],
            steps: [
                "Click wrench icon",
                "Set speed buttons:",
                "→ Start dates",
                "→ Plan providers",
                "→ Departments",
                "Add problem/diagnosis",
                "✓ Create plan"
            ],
            what: "Enables customization of therapy plan settings and speed buttons",
            when: "When setting up or modifying infusion therapy plans"
        },
        "Sticky Notes Visibility and Integration": {
            shortcut: ["None noted"],
            steps: [
                "Add to patient lists",
                "View in messages",
                "Check in-basket details",
                "✓ Update as needed"
            ],
            what: "Expands sticky note visibility across Epic modules",
            when: "To access patient notes in various workflows"
        }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <Card className="max-w-[1400px] mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="text-3xl font-bold text-center">
              Epic Quick Tips for Healthcare Staff
            </CardTitle>
            <p className="text-center text-blue-100 mt-2">
              Essential Epic Features & Updates - November 2024
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className={`transition-all duration-300 ease-in-out ${selectedItem ? 'flex flex-col md:flex-row gap-6' : ''}`}>
              <div className={`
                transition-all duration-300 ease-in-out
                ${selectedItem ? 'w-1/3' : 'w-full'}
              `}>
                <div className={`
                  grid
                  ${!selectedItem ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-2'}
                `}>
                  {Object.entries(sections).map(([key, section]) => (
                    <div key={key} className={`
                      ${selectedSection && selectedSection !== key ? 'hidden' : ''}
                    `}>
                      <Card className={`
                        h-full border-t-4 border-t-blue-500 shadow-md transition-all duration-300
                        ${!selectedItem ? 'hover:shadow-lg transform hover:-translate-y-1' : ''}
                        ${selectedSection === key ? 'cursor-pointer hover:bg-blue-50' : ''}
                      `}>
                        <CardHeader className="pb-2">
                          {selectedSection === key && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBack();
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-100 rounded-full transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                              </svg>
                            </button>
                          )}
                          <CardTitle className={`
                            text-lg font-semibold flex items-center gap-2
                            ${selectedSection === key ? 'ml-12' : ''}
                          `}>
                            <span className="text-2xl">{section.icon}</span>
                            <span>{section.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {(!selectedSection || selectedSection === key) && (
                            <div className="space-y-3">
                              {section.items.map((item, index) => (
                                <div key={index}>
                                  <Tooltip content={item.tip}>
                                    <div
                                      className={`
                                        flex items-center justify-between p-2 rounded-lg 
                                        hover:bg-blue-50 cursor-pointer transition-colors duration-150
                                        ${selectedItem === item.text ? 'bg-blue-100' : ''}
                                      `}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemSelection(key, item.text);
                                      }}
                                    >
                                      <span className="text-sm flex-1">{item.text}</span>
                                      <Info size={16} className="text-blue-500 flex-shrink-0 ml-2"/>
                                    </div>
                                  </Tooltip>

                                    {/* Inline Expanded Details */}
                                    {selectedItem === item.text && expandedDetails[selectedItem] && (
                                      <div className="mt-2 p-4 bg-blue-50 rounded-lg space-y-4">
                                        {/* What section */}
                                        <div className="flex items-start space-x-2">
                                          <HelpCircle size={18} className="text-blue-600 flex-shrink-0 mt-1"/>
                                          <div className="space-y-1">
                                            <span className="font-medium">What it does:</span>
                                            <p className="text-sm text-gray-700">
                                              {expandedDetails[selectedItem].what}
                                            </p>
                                          </div>
                                        </div>

                                        {/* When section */}
                                        <div className="flex items-start space-x-2">
                                          <Clock size={18} className="text-blue-600 flex-shrink-0 mt-1"/>
                                          <div className="space-y-1">
                                            <span className="font-medium">When to use:</span>
                                            <p className="text-sm text-gray-700">
                                              {expandedDetails[selectedItem].when}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Only show shortcut section if it's not "None noted" */}
                                        {expandedDetails[selectedItem].shortcut[0] !== "None noted" && (
                                          <div className="flex items-center space-x-2">
                                            <Keyboard size={18} className="text-blue-600"/>
                                            <span className="font-medium">Shortcut:</span>
                                            <span className="bg-white px-2 py-1 rounded text-sm">
                                              {expandedDetails[selectedItem].shortcut.join(", ")}
                                            </span>
                                          </div>
                                        )}

                                          <div className="space-y-2">
                                              <div className="flex items-center space-x-2">
                                                  <ListChecks size={18} className="text-blue-600"/>
                                                  <span className="font-medium">Steps:</span>
                                              </div>
                                              <ul className="ml-6 space-y-2">
                                                  {expandedDetails[selectedItem].steps.map((step, index) => {
                                                      // Keep track of main step number
                                                      let stepNumber = expandedDetails[selectedItem].steps
                                                          .slice(0, index)
                                                          .filter(s => !s.startsWith('→') && !s.startsWith('✓'))
                                                          .length + 1;

                                                      return (
                                                          <li
                                                              key={index}
                                                              className={`flex items-start ${
                                                                  step.startsWith('→')
                                                                      ? 'text-gray-600 ml-4'
                                                                      : step.startsWith('✓')
                                                                          ? 'text-green-600 font-medium'
                                                                          : ''
                                                              }`}
                                                          >
                                                              {!step.startsWith('→') && !step.startsWith('✓') && (
                                                                  <span className="text-blue-600 w-6 flex-shrink-0">
                                                        {stepNumber}.
                                                      </span>
                                                              )}
                                                              <span className={step.startsWith('→') ? 'ml-6' : ''}>
                                                      {step}
                                                    </span>
                                                          </li>
                                                      );
                                                  })}
                                              </ul>
                                          </div>
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

                {/* Right side - Video section remains the same... */}
                {selectedItem && expandedDetails[selectedItem]?.videourl && (
                    <div className={`
                  w-2/3 flex-shrink-0 bg-white rounded-lg shadow-md p-6
                  transition-all duration-300 ease-in-out
                  ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}
                `}>
                        <div className="flex items-center space-x-2 mb-4">
                            <Play size={18} className="text-blue-600"/>
                            <span className="font-medium">Tutorial Video:</span>
                        </div>
                        <div className="video-container rounded-lg overflow-hidden border border-gray-200">
                    <video key={selectedItem} width="100%" controls autoPlay>
                      <source src={expandedDetails[selectedItem].videourl} type="video/mp4"/>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

export default EpicQuickTips;