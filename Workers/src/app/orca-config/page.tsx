'use client';

import { useState } from 'react';
import { TabView, TabNavigation } from '@/components/TabView';
import { TAB_FILAMENT, TAB_PRINT, TAB_PRINTER_FFF } from '@/lib/orcaSlicerStructure';

const ALL_TABS = [TAB_FILAMENT, TAB_PRINT, TAB_PRINTER_FFF];

export default function OrcaConfigPage() {
  const [activeTabId, setActiveTabId] = useState('filament');
  const activeTab = ALL_TABS.find((tab) => tab.id === activeTabId) || ALL_TABS[0];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">OrcaSlicer Config UI</h1>
              <p className="text-sm text-gray-600 mt-1">
                1:1 UI Replication using verified Tab/Page structure from OrcaSlicer source
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNavigation 
            tabs={ALL_TABS}
            activeTabId={activeTabId}
            onTabChange={setActiveTabId}
          />
        </div>

        {/* Active Tab Content */}
        <TabView tab={activeTab} />

        {/* Documentation Footer */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            ℹ️ About this implementation
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All Tab and Page ordering verified from OrcaSlicer source code (Tab.cpp)</li>
            <li>• Icons downloaded directly from OrcaSlicer GitHub repository</li>
            <li>• This UI is ready to be extended with actual form fields and configuration</li>
            <li>
              • See{' '}
              <a
                href="https://github.com/OrcaSlicer/OrcaSlicer"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                OrcaSlicer repository
              </a>{' '}
              for complete configuration options reference
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
