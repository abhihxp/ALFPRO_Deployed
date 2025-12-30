import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Moon, HelpCircle, Settings, LogOut } from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <div className="flex bg-[#F8F9FB] min-h-screen">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className={`flex-1 p-8 pt-0 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          } min-w-0 overflow-x-hidden`}
        >
          {/* Sticky Header */}
          <header className="sticky top-0 z-50 bg-[#F8F9FB]/95 backdrop-blur-sm -mx-8 px-8 py-4 mb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
              <p className="text-gray-500 text-sm mt-1">
                Track staff activities, stats, and updates.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white hover:shadow-sm transition-all">
                <Moon size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white hover:shadow-sm transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 pl-2 focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        Brooklyn Simmons
                      </p>
                      <p className="text-xs text-gray-500">
                        brooklyn.simmons@gmail.com
                      </p>
                    </div>
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2">
                        <HelpCircle size={16} />
                        Help
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2">
                        <Settings size={16} />
                        Account Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-500 transition-colors flex items-center gap-2">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="">{children}</main>
        </div>
      </div>
    );
};

export default MainLayout;
