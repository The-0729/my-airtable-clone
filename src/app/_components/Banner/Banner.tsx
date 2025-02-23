// components/Banner.tsx
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Banner: React.FC = () => {
    
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            padding: '10px 20px',
            borderBottom: '1px solid #ccc',
            fontSize: '16px',
            fontWeight: 'bold'
        }}>
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          Table 1
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-100 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Import datadata
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Rename Table
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Hide Table
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Manage fields
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Duplicate Table
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Configure date and dependencies
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Edit table description
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Edit table permission
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block py-1 text-[#000000] font-bold text-[11px] px-4 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Delete Table
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
        </div>
    );
};

export default Banner;