'use client';

import { useState } from 'react';
import { Tab, TabPage } from '@/lib/orcaSlicerStructure';
import { Icon, TabPageIcon, GroupHeader } from './Icon';

interface TabViewProps {
  tab: Tab;
  className?: string;
}

/**
 * Main Tab View Component
 * Renders a complete tab with its pages and page navigation
 */
export function TabView({ tab, className = '' }: TabViewProps) {
  const [activePage, setActivePage] = useState(0);
  const currentPage = tab.pages[activePage];

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow ${className}`}>
      {/* Page Navigation */}
      <div className="border-b border-gray-200 bg-gray-50 p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-min">
          {tab.pages.map((page, index) => (
            <TabPageIcon
              key={page.id}
              name={page.iconName}
              label={page.title}
              active={activePage === index}
              onClick={() => setActivePage(index)}
              size={28}
            />
          ))}
        </div>
      </div>

      {/* Page Content */}
      <PageView key={currentPage.id} page={currentPage} />
    </div>
  );
}

interface PageViewProps {
  page: TabPage;
  className?: string;
}

/**
 * Page View Component
 * Renders a single page with its groups
 */
export function PageView({ page, className = '' }: PageViewProps) {
  return (
    <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
      {/* Page Title with Icon */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <Icon name={page.iconName} size={32} alt={page.title} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{page.title}</h2>
          {page.description && (
            <p className="text-sm text-gray-600 mt-1">{page.description}</p>
          )}
        </div>
      </div>

      {/* Option Groups */}
      <div className="grid gap-6">
        {page.groups.map((group) => (
          <GroupViewComponent key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

interface GroupComponent {
  id: string;
  title: string;
  iconName?: string;
  options?: any[];
}

interface GroupViewComponentProps {
  group: GroupComponent;
  className?: string;
}

/**
 * Group View Component
 * Renders an option group with its title, icon, and options
 */
export function GroupViewComponent({ group, className = '' }: GroupViewComponentProps) {
  return (
    <div className={`p-4 border border-gray-200 rounded-lg bg-gray-50 ${className}`}>
      {/* Group Header */}
      <GroupHeader 
        iconName={group.iconName as any} 
        title={group.title}
        size={20}
      />

      {/* Options Placeholder */}
      {group.options && group.options.length > 0 ? (
        <div className="space-y-3">
          {/* Individual options would be rendered here */}
          <div className="text-sm text-gray-500">
            {group.options.length} option(s) configured
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 italic">
          No options configured for this group
        </div>
      )}
    </div>
  );
}

/**
 * Tab Navigation Component
 * Renders tabs for switching between Tab categories
 */
interface TabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTabId, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium rounded
              transition-colors duration-200
              ${activeTabId === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
}
