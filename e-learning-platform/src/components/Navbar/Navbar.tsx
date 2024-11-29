import React, { useState, useEffect, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { signOut } from "../../features/Auth/authSlice";
import { FiShoppingCart } from "react-icons/fi";
import { removeFromCart, setCartItems } from "../../features/Cart/CartSlice";

interface NavItem {
  name: string;
  path: string;
}

const NavList: React.FC<{ isAuthenticated: boolean }> = React.memo(
  ({ isAuthenticated }) => {
    const navItems: NavItem[] = isAuthenticated
      ? [
          { name: "Home", path: "/" },
          { name: "Instructor", path: "/instructor" },
          { name: "Courses", path: "/courses" },
          { name: "Blog", path: "/blogs" },
          { name: "Dashboard", path: "/dashboard" }, // Extra link for authenticated users
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Instructor", path: "/instructor" },
          { name: "Courses", path: "/courses" },
          { name: "Blog", path: "/blogs" },
        ];

    return (
      <ul className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 flex flex-col lg:flex-row lg:p-1">
        {navItems.map(({ name, path }) => (
          <li key={name} className="flex items-center gap-2 py-2 pr-4">
            <NavLink to={path} className="font-medium text-[17px] text-white">
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
);

export const NavbarWithMegaMenu: React.FC = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown visibility

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSignOut = () => {
    dispatch(signOut()); // Clear the user from Redux
    navigate("/"); // Navigate to the home page
  };
  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoized toggle function
  const toggleNav = useCallback(() => setOpenNav((prev) => !prev), []);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);

      // Ensure parsedCartItems is not null or undefined before dispatching
      if (Array.isArray(parsedCartItems)) {
        dispatch(setCartItems(parsedCartItems)); // Dispatch the action to update the Redux store
      }
    }
  }, [dispatch]);
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  const handleItemClick = (id: string, price: string) => {
    // Navigate to the Payment page, passing the id and price via query parameters or as state
    navigate(`/cart/${id}`, { state: { price } });
  };

  return (
    <nav className="max-w-full w-full px-8 py-2 rounded-none shadow-none bg-[var(--nav-color)] fixed top-0 z-10">
      <div className="container-main flex items-center justify-between text-black ">
        <a href="#" className="mr-4 cursor-pointer flex items-center">
          <img src={logo} alt="Logo" className="w-36 h-10" loading="lazy" />
        </a>
        <div className="hidden lg:block">
          <NavList isAuthenticated={isAuthenticated} />
        </div>
        <div className="hidden gap-2 lg:flex lg:items-center">
          {isAuthenticated ? (
            <>
              <div className="relative">
                {/* Cart button */}
                <button
                  className="border rounded-full p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none border-solid border-[var(--purple-color)]"
                  onClick={toggleDropdown} // Toggle dropdown on button click
                >
                  <FiShoppingCart className="w-6 h-6" />
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute z-10 top-14 left-1/2 transform -translate-x-1/2 min-w-[300px] overflow-hidden rounded-lg border border-slate-200 bg-black text-[var(--text-color)] shadow-lg focus:outline-none 
        transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
                >
                  {/* Show cart items */}
                  {isOpen && cartItems.length > 0 && (
                    <ul>
                      {cartItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <li
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex items-center w-full text-sm rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-200 active:bg-slate-300"
                            onClick={() => handleItemClick(item.id, item.price)} // Handle click
                          >
                            <img
                              alt={item.course}
                              src={item.img_course}
                              className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
                            />
                            <div className="flex flex-col gap-1 ml-4 flex-grow text-nowrap">
                              <p className="text-slate-800 text-[10px] font-medium ">
                                {item.course}
                              </p>
                              <p className="text-slate-500 text-sm flex items-center justify-between">
                                <span>{item.price}</span>
                                <span>X{item.quantity}</span>
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering onClick of li
                                  handleRemoveItem(item.id);
                                }}
                                className=" ml-1 text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                              >
                                <span className="text-sm font-medium">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </li>

                          {/* Add separation between items */}
                          {index < cartItems.length - 1 && (
                            <hr className="border-t border-gray-700" />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  )}

                  {/* Show message when cart is empty */}
                  {cartItems.length === 0 && (
                    <div className="p-3 text-center text-slate-600">
                      Your cart is empty
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  className={`w-28 h-16 rounded-full ${
                    scrolled
                      ? "bg-[var(--peach-color)] text-white" // Change background when scrolled
                      : "bg-[var(--secondary-color)] text-black"
                  } hover:bg-[var(--peach-color)] hover:text-white transition-colors duration-300 ease-in-out text-[14px] font-semibold`}
                  onClick={handleSignOut}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  className={`w-28 h-16 rounded-full ${
                    scrolled
                      ? "bg-[var(--peach-color)] text-white" // Change background when scrolled
                      : "bg-[var(--secondary-color)] text-black"
                  } hover:bg-[var(--peach-color)] hover:text-white transition-colors duration-300 ease-in-out text-[14px] font-semibold`}
                >
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-28 h-16 rounded-full border-[5px] text-white border-[var(--purple-color)] hover:border-none hover:bg-[var(--peach-color)] hover:text-gray-600 transition-colors duration-300 ease-in-out text-[14px]">
                  {" "}
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
        <button
          className="lg:hidden flex items-center justify-center h-12 w-12"
          onClick={toggleNav}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      <div
        className={`transition-all  duration-300 ease-in-out ${
          openNav ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <NavList isAuthenticated={isAuthenticated} />
        <div className="flex w-full flex-nowrap   items-center gap-2 lg:hidden">
          {isAuthenticated ? (
            <>
              <div className="">
                {/* Cart button */}
                <button
                  className="border rounded-full p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none border-solid border-[var(--purple-color)]"
                  onClick={toggleDropdown} // Toggle dropdown on button click
                >
                  <FiShoppingCart className="w-6 h-6" />
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute z-10  left-48 transform -translate-x-1/2 max-w-[350px] w-full overflow-hidden rounded-lg border border-slate-200 bg-black text-[var(--text-color)] shadow-lg focus:outline-none 
                     transition-all duration-300 ease-in-out ${
                       isOpen
                         ? "opacity-100 translate-y-0"
                         : "opacity-0 translate-y-2 pointer-events-none"
                     }`}
                >
                  {/* Show cart items */}
                  {isOpen && cartItems.length > 0 && (
                    <ul>
                      {cartItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <li
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex items-center w-full text-sm rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-200 active:bg-slate-300"
                            onClick={() => handleItemClick(item.id, item.price)} // Handle click
                          >
                            <img
                              alt={item.course}
                              src={item.img_course}
                              className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
                            />
                            <div className="flex flex-col gap-1 ml-4 flex-grow text-nowrap">
                              <p className="text-slate-800 text-sm font-medium ">
                                {item.course}
                              </p>
                              <p className="text-slate-500 text-sm flex items-center">
                                {item.price}
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering onClick of li
                                  handleRemoveItem(item.id);
                                }}
                                className=" ml-1 text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                              >
                                <span className="text-sm font-medium">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </li>

                          {/* Add separation between items */}
                          {index < cartItems.length - 1 && (
                            <hr className="border-t border-gray-700" />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  )}

                  {/* Show message when cart is empty */}
                  {isOpen &&
                    cartItems.length === 0 &&
                    location.pathname === "/" && (
                      <div className="p-3 text-center text-slate-600">
                        Your cart is empty
                      </div>
                    )}

                  {isOpen &&
                    cartItems.length === 0 &&
                    location.pathname !== "/" && (
                      <div className="p-3 text-center text-slate-600">
                        Your cart is empty, redirecting to home...
                      </div>
                    )}
                </div>
              </div>
              <div>
                <button
                  className={`w-28 h-16 rounded-full ${
                    scrolled
                      ? "bg-[var(--peach-color)] text-white" // Change background when scrolled
                      : "bg-[var(--secondary-color)] text-black"
                  } hover:bg-[var(--peach-color)] hover:text-white transition-colors duration-300 ease-in-out text-[14px] font-semibold`}
                  onClick={handleSignOut}
                >
                  {" "}
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  className={`w-28 h-16 rounded-full ${
                    scrolled
                      ? "bg-[var(--peach-color)] text-white" // Change background when scrolled
                      : "bg-[var(--secondary-color)] text-black"
                  } hover:bg-[var(--peach-color)] hover:text-white transition-colors duration-300 ease-in-out text-[14px] font-semibold`}
                >
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-28 h-16 rounded-full border-[5px] text-white border-[var(--purple-color)] hover:border-none hover:bg-[var(--peach-color)] hover:text-gray-600 transition-colors duration-300 ease-in-out text-[14px]">
                  {" "}
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Debounce function with TypeScript support
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
