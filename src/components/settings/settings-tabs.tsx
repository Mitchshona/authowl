'use client'

import React from 'react'

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = ['profile', 'notifications', 'security', 'subscription', 'billing']

  return (
    <div className="max-w-max pt-3 px-5 bg-[#FDFDFD] rounded-t-lg">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              px-4 py-2
              ${
                activeTab === tab
                  ? 'border-b-[3px] border-[#1971C2] typography-label-medium-semibold text-[#1971C2]'
                  : 'text-[#5E6E7A] typography-label-medium-regular hover:text-[#1971C2]'
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}