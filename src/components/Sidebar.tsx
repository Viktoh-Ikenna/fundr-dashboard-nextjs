'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowUpDown, 
  Receipt, 
  Settings, 
  Globe,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FundRLogo } from './FundRLogo';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CreditCard, label: 'Accounts', path: '/accounts' },
  { icon: ArrowUpDown, label: 'Transfers', path: '/transfers' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}


      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isDesktop || isOpen ? "open" : "closed"}
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >

        <div className={`flex items-center border-b border-gray-200 p-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-0'}`}
          >
            {isCollapsed ? (
              <svg width="32" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.1022 0.139692L3.77345 6.51125C1.06299 7.56896 -0.0860776 10.4202 1.32528 12.7015C3.24287 15.8009 6.99614 17.9065 11.3125 17.9065C17.5782 17.9065 22.6577 13.4693 22.6577 7.99636V1.58749C22.6577 0.672865 21.7992 0 20.8428 0C20.5982 0 20.3469 0.044097 20.1019 0.139692H20.1022Z" fill="#000A4A"/>
                <path d="M0 7.99659C0 13.4699 5.0792 17.907 11.3452 17.907C15.6616 17.907 19.4148 15.8015 21.3324 12.702C22.7438 10.4207 21.5951 7.5695 18.8843 6.51179L2.55549 0.140232C1.35488 -0.328184 0 0.439351 0 1.58803V7.9969L0 7.99659Z" fill="#00C6FB"/>
              </svg>
            ) : (
              <FundRLogo 
                width={100} 
                height={24}
                className="transition-all duration-300"
              />
            )}
          </motion.div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
          

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="absolute top-6 right-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>


        <nav className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
          <motion.ul 
            variants={itemVariants}
            className="space-y-2"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              
              return (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link
                    href={item.path}
                    className={`${
                      isCollapsed 
                        ? `flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`
                        : `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`
                    }`}
                    onClick={() => {
                      // Only close sidebar on mobile when clicking navigation
                      if (!isDesktop && window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon size={isCollapsed ? 18 : 20} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      </motion.aside>


      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 rounded-lg bg-white shadow-md border border-gray-200"
      >
        <Menu size={20} />
      </button>

      
      {isCollapsed && isDesktop && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsCollapsed(false)}
          className="fixed top-1/2 z-40 p-2 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors transform -translate-y-1/2"
          style={{ left: '68px' }}
          title="Expand sidebar"
        >
          <ChevronRight size={16} />
        </motion.button>
      )}
    </>
  );
}; 