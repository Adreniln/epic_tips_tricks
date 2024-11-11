'use client';

import { useState, useEffect } from 'react';
import { Info, Keyboard, ListChecks, Play, HelpCircle, Clock, Sparkles, ChevronRight, ChevronDown, MousePointer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import GuideIntroduction from '@/components/ui/GuideIntroduction';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Type definitions
interface ItemType {
  text: string;
  tip: string;
  isNewFeature?: boolean;
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
  const [showVideo, setShowVideo] = useState(false);
  const [isGuidePanelExpanded, setIsGuidePanelExpanded] = useState(true);

  const handleItemClick = (itemText: string) => {
    if (selectedItem === itemText) return;
    setPendingSelection(itemText);
    setSelectedItem(null);
  };

  const Breadcrumbs = ({ section, item }: { section?: string; item?: string }) => (
  <nav className="flex px-6 py-2 text-sm text-gray-600 items-center space-x-2">
    <span className="hover:text-blue-600 cursor-pointer"
          onClick={() => handleBack()}>
      Home
    </span>
    {section && (
      <>
        <span className="text-gray-400">/</span>
        <span className={!item ? 'text-blue-600' : 'hover:text-blue-600 cursor-pointer'}
              onClick={() => item && handleBack()}>
          {section}
        </span>
      </>
    )}
    {item && (
      <>
        <span className="text-gray-400">/</span>
        <span className="text-blue-600">{item}</span>
      </>
    )}
  </nav>
  );

  const NewFeatureBadge = () => (
    <Badge
      variant="info"
      className="ml-2 flex items-center gap-1 whitespace-nowrap font-medium"
    >
      <Sparkles size={12} className="text-blue-100" />
      <span>Nov 2024</span>
    </Badge>
  );

  const handleItemSelection = (sectionKey: string, itemText: string) => {
    setIsTransitioning(true);
    setShowVideo(false); // Hide video immediately

    // Short delay before changing selection
    setTimeout(() => {
      setSelectedSection(sectionKey);
      setSelectedItem(itemText);

      // Show video after content transition
      setTimeout(() => {
        setShowVideo(true);
        setIsTransitioning(false);
      }, 150); // Match your transition duration
    }, 50);
  };

  const QuickStartGuide = () => (
    <Card className="mb-6 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between cursor-pointer"
             onClick={() => setIsGuidePanelExpanded(!isGuidePanelExpanded)}>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-lg text-blue-700">Quick Start Guide</h3>
          </div>
          {isGuidePanelExpanded ?
            <ChevronDown className="h-5 w-5 text-blue-500" /> :
            <ChevronRight className="h-5 w-5 text-blue-500" />
          }
        </div>

        {isGuidePanelExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Getting Started */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium">Navigation</h4>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Click any category card to explore features</li>
                  <li>• Look for <Badge variant="info" className="ml-1"><Sparkles size={12} className="text-blue-100" /> Nov 2024</Badge> for newest updates</li>
                  <li>• Use breadcrumbs at top to go back</li>
                </ul>
              </div>

              {/* Feature Details */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium">Feature Details</h4>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Each feature shows when to use it</li>
                  <li>• Step-by-step instructions included</li>
                  <li>• Keyboard shortcuts where available</li>
                </ul>
              </div>

              {/* Learning Resources */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium">Video Tutorials</h4>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Watch demo videos for key features</li>
                  <li>• Follow along with examples</li>
                  <li>• Practice in your test environment</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const handleBack = () => {
    setIsTransitioning(true);
    setShowVideo(false);

    setTimeout(() => {
      setSelectedItem(null);
      setSelectedSection(null);
      setIsTransitioning(false);
    }, 150);
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
        { text: "Enhanced Assistant Bar", tip: "Centralizes chart search with enhanced capabilities for trending and calculations", isNewFeature: true },
        { text: "Quick Search", tip: "Provides system-wide search capabilities outside of patient charts" },
        { text: "Patient Lookup", tip: "Provides quick access to patient charts" },
        { text: "Trending Labs and Vitals", tip: "Creates visual representations of patient data trends" }
      ]
    },
    workspaceCustomization: {
      title: "Workspace Customization",
      icon: "⚙️",
      bgColor: "bg-green-50",
      items: [
        { text: "Default Workspace Settings", tip: "Sets preferred initial workspace upon login" },
        { text: "Chart Review Tab Customization", tip: "Allows personalization of chart review tab layout" },
        { text: "Report Pane Organization", tip: "Enables rearrangement of report information blocks" },
        { text: "Moving Tools and Buttons", tip: "Enables drag-and-drop customization of Epic interface elements" }
      ]
    },
    medicationManagement: {
      title: "Medication Management",
      icon: "💊",
      bgColor: "bg-blue-50",
      items: [
        { text: "Medication Holds with Duration", tip: "Allows setting specific durations for medication holds", isNewFeature: true },
        { text: "Order Panels Creation and Modification", tip: "Enables creation and customization of order panels" }
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
        { text: "Sticky Notes", tip: "Enables personal reminders and team communication about patients" },
        { text: "Advanced Sticky Notes Features", tip: "Adds smart phrases and auto-launch options to notes" },
        { text: "Patient Reminder Lists", tip: "Creates organized lists of patient-specific reminders" },
        { text: "Notification Center", tip: "Centralizes all system notifications and messages" }
      ]
    },
    clinicalResources: {
      title: "Clinical Resources",
      icon: "📚",
      bgColor: "bg-red-50",
      items: [
        { text: "EMMI Patient Education Resources", tip: "Provides access to patient education materials" },
        { text: "External Records Access (Connie HIE)", tip: "Enables view of external facility records" }
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
                "★ Click star icon to save frequent searches",
                "✓ Review results"
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
                "→ Last 5 searches shown below",
                "✓ Launch selected item"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Changes+to+the+Quick+Search+in+Epic.mp4",
            what: "Provides system-wide search capabilities outside of patient charts",
            when: "For accessing Epic tools and activities"
        },
        "Patient Lookup": {
            shortcut: ["Alt + C"],
            steps: [
                "Press Alt + C",
                "Enter patient info",
                "Verify patient",
                "✓ Click Accept to open chart"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Patient+Lookup+and+New+Chart+Search.mp4",
            what: "Provides quick access to patient charts",
            when: "When you need to find and open a patient's chart or access recent lookups"
        },
        "Trending Labs and Vitals": {
            shortcut: ["Ctrl + Space (then type \"trend\" or \"graph\")"],
            steps: [
                "Open chart search",
                "Type \"trend\" or \"graph\" + metric",
                "Select timeframe using date range buttons",
                "→ Hover over points for exact values",
                "✓ Review interactive graph"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Trend+Vitals+and+Labs+in+Chart+Search.mp4",
            what: "Creates interactive visual representations of patient data trends",
            when: "To analyze patterns in patient labs and vitals over time"
        },
        "Default Workspace Settings": {
            shortcut: ["None noted"],
            steps: [
                "Open desired workspace",
                "Look for star icon in upper right corner",
                "→ No star = workspace cannot be default",
                "Click star icon if available",
                "✓ Confirm selection"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Set+Your+Default+Workspace.mp4",
            what: "Sets preferred initial workspace upon login",
            when: "To streamline workflow by starting in most-used area"
        },
        "Chart Review Tab Customization": {
            shortcut: ["None noted"],
            steps: [
                "→ Assign colors to important tabs",
                "→ Select 'Manage Tabs' to reorder",
                "→ Use up/down arrows to arrange",
                "✓ Changes save automatically for future use"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Chart+Review+Tabs+Customization.mp4",
            what: "Allows personal customization of chart review tab colors and order",
            when: "To reduce clicks and optimize your chart review workflow by prioritizing frequently used tabs"
        },
        "Report Pane Organization": {
            shortcut: ["None noted"],
            steps: [
                "Click Wrench icon",
                "Select Modify Layout",
                "Drag blocks to preferred positions",
                "✓ Click Accept to save your personal layout"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Rearrange+Report+Pane+Blocks+of+Information.mp4",
            what: "Enables personal rearrangement of report information blocks",
            when: "To prioritize most-referenced information and reduce scrolling in frequently used reports"
        },
        "Medication Holds with Duration": {
            shortcut: ["None noted"],
            steps: [
                "Open Manage Orders",
                "Select medication(s)",
                "Choose Hold",
                "→ Specify duration/end time",
                "→ Or select \"until manually unheld\"",
                "✓ Sign the hold"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Nov+10%2C+2024+Upgrade+-+Hold+Inpatient+Medications+for+a+Specific+Duration.mp4",
            what: "Enables time-limited medication holds with specific end times/durations",
            when: "When medications need to be temporarily suspended for: procedures, brief NPO status, or other time-limited clinical needs"
        },
        "Order Panels Creation and Modification": {
            shortcut: ["None noted"],
            steps: [
                "Open Inpatient Manage Orders",
                "Fill shopping cart",
                "Options → Create Panel",
                "Name panel",
                "→ Adjust order details",
                "✓ Save panel (becomes searchable)",
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Create+and+Modify+Order+Panels.mp4",
            what: "Enables creation and customization of order panels",
            when: "When frequently ordering the same set of medications together"
        },
        "Creating Therapy Plans": {
            shortcut: ["None noted"],
            steps: [
                "Click Therapy Plan Episode Type button",
                "★ View starred protocols below button",
                "Select desired protocol from list",
                "→ Preview displays in split screen",
                "Review default order details",
                "✓ Click Accept to add protocol"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Infusion+Therapy+Plan+Creating+Therapy+Plans.mp4",
            what: "Streamlines creation of infusion therapy protocols, with ability to star favorite protocols for quick access\"",
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
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Infusion+Therapy+Plan+Management.mp4",
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
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Infusion+Therapy+Plan+New+Look+for+Start+Times.mp4",
            what: "Manages start times for infusion orders",
            when: "When coordinating multiple infusions for a patient's therapy plan"
        },
        "Protocol Names": {
            shortcut: ["None noted"],
            steps: [
                "Edit plan properties",
                "Modify plan name",
                "✓ Save changes"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Infusion+Therapy+Plan+Editing+Protocol+Names.mp4",
            what: "Enables customization of therapy plan names",
            when: "For clearer identification of specific protocols"
        },
        "Sticky Notes": {
            shortcut: ["None noted"],
            steps: [
                "Click note icon",
                "→ Yellow: personal (only you)",
                "→ Blue: specialty (shared with your service)",
                "Add/edit note",
                "→ Use SmartPhrases if desired",
                "✓ Save",
                "♦ Pro tip: View/edit specialty notes in patient list columns"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Sticky+Notes.mp4",
            what: "Enables personal reminders and team communication about patients",
            when: "For important non-medical record reminders and team communication"
        },
        "Advanced Sticky Notes Features": {
            shortcut: ["None noted"],
            steps: [
                "Click star dropdown",
                "Select smart phrase",
                "📌 Toggle auto-launch with pushpin",
                "✓ Save note"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Smarter+Sticky+Notes.mp4",
            what: "Adds smart phrases and auto-launch options to all sticky notes",
            when: "To standardize communication and auto-display important patient information"
        },
        "Patient Reminder Lists": {
            shortcut: ["None noted"],
            steps: [
                "Right-click patient",
                "Add to reminder list",
                "→ Select existing list or create new",
                "Set due date & add comments",
                "✓ Monitor in basket or patient lists",
                "Mark done via in-basket or reminder list"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/IP+Patient+Reminders.mp4",
            what: "Creates organized lists of patient-specific reminders with custom comments",
            when: "To track multiple patient-related tasks with specific due dates and notes"
        },
        "Notification Center": {
            shortcut: ["None noted"],
            steps: [
                "Check toolbar badges for:",
                "→ InBasket messages",
                "→ Bell icon for system notifications",
                "Click relevant badge",
                "✓ Handle notifications"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Notification+Center.mp4",
            what: "Centralizes all system notifications and messages",
            when: "To monitor and manage all communications"
        },
        "EMMI Patient Education Resources": {
            shortcut: ["None noted"],
            steps: [
                "Open Plan/Wrap-up tab",
                "Click Clinical References",
                "Review suggested content based on:",
                "→ Problem list",
                "→ Chief complaint",
                "→ Medications",
                "Print",
                "★ Star to favorite (moves to top of list)"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/EMMI+Patient+Education+Resources.mp4",
            what: "Provides access to patient education materials, automatically suggested based on patient's clinical information",
            when: "When providing patient education or discharge instructions"
        },
        "External Records Access (Connie HIE)": {
            shortcut: ["None noted"],
            steps: [
                "Open patient chart",
                "Find double arrow circle icon in storyboard",
                "Access Connie portal",
                "Review by category:",
                "→ Labs: Click row to view results",
                "→ Imaging: Click row + camera icon for diagnostic images",
                "→ Notes: View clinical documentation",
                "✓ Review records"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Connie+HIE+.mp4",
            what: "Enables view of external facility records from Connecticut healthcare providers, including labs, imaging, and clinical notes",
            when: "When reviewing patient's external care history from Connecticut facilities"
        },
        "Moving Tools and Buttons": {
            shortcut: ["None noted"],
            steps: [
                "Click and hold item",
                "Drag to new location",
                "→ Works for toolbar buttons",
                "→ Works for activity tabs",
                "→ Works for navigator buttons",
                "✓ Release to place"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Move+Tools+and+Buttons+Without+the+Wrench.mp4",
            what: "Simplified drag-and-drop customization of Epic interface elements - no wrench icon needed",
            when: "When optimizing your workspace layout"
        },
        "Plan Properties": {
            shortcut: ["None noted"],
            steps: [
                "Click wrench icon",
                "Set speed buttons:",
                "→ Start dates (T=today, W=week)",
                "→ Plan providers (add caption)",
                "→ Departments",
                "Click Accept",
                "Search/Add problem from list",
                "Apply changes",
                "✓ Create plan"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/Infusion+Therapy+Plan+Properties.mp4",
            what: "Enables customization of therapy plan settings with customizable speed buttons",
            when: "When setting up or modifying infusion therapy plans"
        },
        "Sticky Notes Visibility and Integration": {
            shortcut: ["None noted"],
            steps: [
                "Add sticky note column to patient lists",
                "View in message details",
                "Check in-basket messages",
                "✓ Update as needed"
            ],
            videourl: "https://epicvideos.s3.us-east-2.amazonaws.com/View+Sticky+Notes+and+Specialty+Comments+in+More+Places.mp4",
            what: "Expands sticky note visibility across Epic modules",
            when: "To access patient notes in various workflows"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
            <div className="absolute top-4 right-4">
                <GuideIntroduction/>
            </div>
                <Card className="max-w-[1400px] mx-auto shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <div className="relative max-w-[1400px] mx-auto flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-3xl font-bold text-center">
                            Epic Quick Tips for Pharmacy Staff
                          </CardTitle>
                          <p className="text-center text-blue-100 mt-2">
                            Essential Epic Features & Updates - November 2024
                          </p>
                        </div>
                        <div className="ml-4"> {/* This will position the guide button */}
                          <GuideIntroduction />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {/* Place Breadcrumbs here */}
                        <Breadcrumbs
                            section={selectedSection ? sections[selectedSection].title : undefined}
                            item={selectedItem}
                        />
                        <div
                            className={`transition-all duration-300 ease-in-out ${selectedItem ? 'flex flex-col md:flex-row gap-6' : ''}`}>
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
                      relative hover:z-[50]
                    `}>
                                            <Card className={`
                      h-full border-t-4 border-t-blue-500 shadow-md transition-all duration-300 relative
                      ${!selectedItem ? 'hover:shadow-lg transform hover:-translate-y-1' : ''}
                      ${selectedSection === key ? 'bg-white' : ''}
                      overflow-visible 
                        `}>
                                                <CardHeader className="pb-2">
                                                    {selectedSection === key && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleBack();
                                                            }}
                                                            className="absolute left-4 top-4 p-2 hover:bg-blue-100 rounded-full transition-colors border-2 border-blue-200 bg-white shadow-sm text-blue-600 hover:text-blue-800 hover:border-blue-300 hover:shadow-md"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                 height="24" viewBox="0 0 24 24"
                                                                 fill="none" stroke="currentColor" strokeWidth="2"
                                                                 strokeLinecap="round"
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
                                                                <div key={index}
                                                                     className="relative overflow-visible"> {/* Added relative and overflow-visible */}
                                                                    <Tooltip content={item.tip}>
                                                                        <div
                                                                            className={`
                                          flex items-center justify-between p-2 rounded-lg 
                                          hover:bg-blue-50 cursor-pointer transition-colors duration-150 relative
                                          ${selectedItem === item.text ? 'bg-white' : ''}
                                        `}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleItemSelection(key, item.text);
                                                                            }}
                                                                        >
                                                                            <div
                                                                                className="flex items-center flex-1 min-w-0">
                                          <span
                                              className={`text-base truncate ${selectedItem === item.text ? 'font-semibold text-blue-800' : ''}`}>
                                            {item.text}
                                          </span>
                                                                                {item.isNewFeature &&
                                                                                    <NewFeatureBadge/>}
                                                                            </div>
                                                                            <Info size={16}
                                                                                  className="text-blue-500 flex-shrink-0 ml-2"/>
                                                                        </div>
                                                                    </Tooltip>

                                                                    {/* Inline Expanded Details */}
                                                                    {selectedItem === item.text && expandedDetails[selectedItem] && (
                                                                        <div
                                                                            className="mt-2 p-4 bg-blue-100/80 rounded-lg space-y-4 border border-blue-100 shadow-sm">
                                                                            {/* What section */}
                                                                            <div className="flex items-start space-x-2">
                                                                                <HelpCircle size={18}
                                                                                            className="text-blue-600 flex-shrink-0 mt-1"/>
                                                                                <div className="space-y-1">
                                                                                    <span className="font-medium">What it does:</span>
                                                                                    <p className="text-base text-gray-700">
                                                                                        {expandedDetails[selectedItem].what}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {/* When section */}
                                                                            <div className="flex items-start space-x-2">
                                                                                <Clock size={18}
                                                                                       className="text-blue-600 flex-shrink-0 mt-1"/>
                                                                                <div className="space-y-1">
                                                                                    <span className="font-medium">When to use:</span>
                                                                                    <p className="text-base text-gray-700">
                                                                                        {expandedDetails[selectedItem].when}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {/* Only show shortcut section if it's not "None noted" */}
                                                                            {expandedDetails[selectedItem].shortcut[0] !== "None noted" && (
                                                                                <div
                                                                                    className="flex items-center space-x-2">
                                                                                    <Keyboard size={18}
                                                                                              className="text-blue-600"/>
                                                                                    <span
                                                                                        className="font-medium">Shortcut:</span>
                                                                                    <span
                                                                                        className="bg-white px-2 py-1 rounded text-sm">
                                              {expandedDetails[selectedItem].shortcut.join(", ")}
                                            </span>
                                                                                </div>
                                                                            )}

                                                                            <div className="space-y-2">
                                                                                <div
                                                                                    className="flex items-center space-x-2">
                                                                                    <ListChecks size={18}
                                                                                                className="text-blue-600"/>
                                                                                    <span
                                                                                        className="font-medium">Steps:</span>
                                                                                </div>
                                                                                <ul className="ml-6 space-y-2">
                                                                                    {expandedDetails[selectedItem].steps.map((step, index) => {
                                                                                        // Keep track of main step number
                                                                                        let stepNumber = expandedDetails[selectedItem].steps
                                                                                            .slice(0, index)
                                                                                            .filter(s => !s.startsWith('→') && !s.startsWith('✓') && !s.startsWith('♦') )
                                                                                            .length + 1;

                                                                                        return (
                                                                                            <li
                                                                                                key={index}
                                                                                                className={`flex items-start ${
                                                                                                    step.startsWith('→')
                                                                                                        ? 'text-gray-600 ml-4'
                                                                                                        : step.startsWith('✓')
                                                                                                            ? 'text-green-600 font-medium'
                                                                                                            : step.startsWith('♦')
                                                                                                                ? 'text-purple-600 font-medium'
                                                                                                                : ''
                                                                                                }`}
                                                                                            >
                                                                                                {!step.startsWith('→') && !step.startsWith('✓') && !step.startsWith('♦') && (
                                                                                                    <span
                                                                                                        className="text-blue-600 w-6 flex-shrink-0">
                                                                                                        {stepNumber}.
                                                                                                    </span>
                                                                                                )}
                                                                                                <span
                                                                                                    className={step.startsWith('→') ? 'ml-6' : ''}>
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
                    transition-all duration-150 ease-in-out
                    ${isTransitioning
                                    ? 'opacity-0 transform translate-x-4'
                                    : 'opacity-100 transform translate-x-0'}
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