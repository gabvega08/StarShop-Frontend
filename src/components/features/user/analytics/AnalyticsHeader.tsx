import React, { useState } from 'react';
import { Calendar, Download, RefreshCw, ChevronDown } from 'lucide-react';

interface AnalyticsHeaderProps {
  onPeriodChange?: (period: string) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  onCustomDateChange?: (startDate: string, endDate: string) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  onPeriodChange,
  onExport,
  onRefresh,
  onCustomDateChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const periods = [
    'Last 30 days',
    'Last month',
    'Last year'
  ];

  const handleCustomDateChange = () => {
    if (startDate && endDate && onCustomDateChange) {
      onCustomDateChange(startDate, endDate);
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-white">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-400 text-sm">Track your store's performance and growth</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span className="text-sm text-gray-300">Compare with previous period</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors w-full sm:min-w-[180px]"
              >
                <span className="truncate">{selectedPeriod}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
                  {periods.map((period) => (
                    <button
                      key={period}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsDropdownOpen(false);
                        if (onPeriodChange) onPeriodChange(period);
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors w-full"
              >
                <Calendar className="w-4 h-4" />
                <span>Custom Range</span>
              </button>

              {isDatePickerOpen && (
                <div className="absolute top-full right-0 mt-2 p-4 bg-gray-800 rounded-lg shadow-lg z-10 w-full sm:w-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                        style={{
                          colorScheme: 'dark',
                          backgroundColor: '#374151',
                          color: 'white'
                        }}
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                        style={{
                          colorScheme: 'dark',
                          backgroundColor: '#374151',
                          color: 'white'
                        }}
                      />
                    </div>
                    <button
                      onClick={handleCustomDateChange}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <span>Apply Range</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
              
            <button 
              onClick={onExport}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button
              onClick={onRefresh}
              className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader; 