"use client"; // Mark this as a Client Component

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/component/ui/sheet";
import { ChevronDown } from "lucide-react";


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const navLinks = [
  { href: "/", label: "Overview", icon: "/images/overview.svg" }, 
  { href: "/deliveries", label: "Deliveries", icon: "/images/deliveries.svg" },
  { href: "/patients", label: "Patients", icon: "/images/patients.svg" },
  { href: "/dispatch-riders", label: "Dispatch Riders", icon: "/images/riders.svg" }, 
  { href: "/admin", label: "Admin", icon: "/images/admin.svg" }, 
];


  return (
    <>
      <nav className="bg-white shadow-lg h-16 w-full fixed z-20 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 h-full">
          {/* Mobile view */}
          <div className="flex justify-between items-center px-2 lg:hidden h-full">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={43}
                  height={43}
                />
              </Link>
            </div>

            {/* Menu button that triggers the sheet */}
            <Sheet open={isNavBarOpen} onOpenChange={setIsNavBarOpen}>
              <SheetTrigger asChild className="bg-white">
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => setIsNavBarOpen(true)}
                >
                  <Image
                    src="/images/menu.svg"
                    alt="Menu"
                    width={43}
                    height={43}
                  />
                </div>
              </SheetTrigger>
              <SheetContent className="p-6 bg-white shadow-lg rounded-lg max-h-screen overflow-y-auto">
                {/* Mobile navigation links */}
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 text-dark_grey hover:text-blue-1 w-full ${
                          pathname === link.href
                            ? "font-bold text-blue-1 rounded-sm py-2 hover:text-blue-1"
                            : ""
                        }`}
                      >
                        {link.icon && (
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={16}
                            height={16}
                          />
                        )}
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href={"/"}
                      className={`flex items-center gap-2 text-dark_grey hover:text-gray-900`}
                    >
                      Logout
                    </Link>
                  </SheetClose>
                </div>

                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
                      Close Menu
                    </button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop view */}
          <div className="flex justify-between items-center h-full max-lg:hidden">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={43}
                  height={43}
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-10 items-center text-base text-dark_grey">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 hover:text-blue-1${
                    pathname === link.href
                      ? "font-bold text-blue-1 border-b-4 rounded-sm py-5 border-blue-1 "
                      : ""
                  }`}
                >
                  {link.icon && (
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={16}
                      height={16}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>

           {/* Dropdown for Emmanuel Adigwe */}
<div className="relative flex items-center gap-2" onClick={toggleDropdown}>
  <img
    src="/images/avatar.png" 
    alt="Adigwe"
    className="w-8 h-8 rounded-full border border-gray-300"
  />
  
  <button
    
    className="text-dark font-bold hover:text-gray-900 focus:outline-none"
  >
                              Adigwe
                              
                          </button>
                          <ChevronDown className=" cursor-pointer w-5 h-5" /> 

  {/* Dropdown Menu */}
  {isDropdownOpen && (
    <div className="absolute right-0 mt-20 w-48 bg-white rounded-lg shadow-lg">
      <Link
        href="/"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Logout
      </Link>
    </div>
  )}
</div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;