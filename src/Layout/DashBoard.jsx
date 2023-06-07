import React, { useState } from 'react';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow"
        onClick={toggleDrawer}
      >
        {isOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
          <h2 className="text-white text-lg font-bold">Drawer Title</h2>
          <button
            className="text-white focus:outline-none"
            onClick={toggleDrawer}
            aria-label="Close Drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6">
          <p>This is some content inside the drawer.</p>
          <ul className="mt-4">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>

          {/* Additional Content */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Additional Content</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;