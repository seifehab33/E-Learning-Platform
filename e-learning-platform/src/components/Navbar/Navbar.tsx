import React, { useEffect, useMemo, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { signOut } from "../../features/Auth/authSlice";
import { FiShoppingCart } from "react-icons/fi";
import {
  removeFromCart,
  selectTotalItemsInCart,
  setCartItems,
} from "../../features/Cart/CartSlice";

interface NavItem {
  name: string;
  path: string;
}

const NavList: React.FC<{
  isAuthenticated: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}> = React.memo(({ isAuthenticated, mobile = false, onNavigate }) => {
  const navItems: NavItem[] = isAuthenticated
    ? [
        { name: "Home", path: "/" },
        { name: "Instructor", path: "/instructor" },
        { name: "Courses", path: "/courses" },
        { name: "Blog", path: "/blogs" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Instructor", path: "/instructor" },
        { name: "Courses", path: "/courses" },
        { name: "Blog", path: "/blogs" },
      ];

  return (
    <ul
      className={`flex ${
        mobile
          ? "flex-col gap-2"
          : "items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md"
      }`}
    >
      {navItems.map(({ name, path }) => (
        <li key={name}>
          <NavLink
            to={path}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                mobile
                  ? "w-full border border-white/8 bg-white/[0.03] text-white hover:border-[var(--purple-color)] hover:bg-white/[0.08]"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
                isActive
                  ? "bg-[var(--peach-color)] text-white shadow-lg shadow-[var(--peach-color)]/25"
                  : "",
              ].join(" ")
            }
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
});

const CartDropdown: React.FC<{
  isOpen: boolean;
  cartItems: RootState["cart"]["items"];
  onItemClick: (id: string, price: string) => void;
  onRemoveItem: (id: string) => void;
  mobile?: boolean;
}> = ({ isOpen, cartItems, onItemClick, onRemoveItem, mobile = false }) => (
  <div
    className={`${
      mobile
        ? "left-0 mt-3 w-full"
        : "right-0 top-[calc(100%+14px)] min-w-[320px]"
    } absolute z-20 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(16,13,28,0.95)] text-[var(--text-color)] shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 ${
      isOpen
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-2 opacity-0"
    }`}
  >
    {cartItems.length > 0 ? (
      <ul className="p-2">
        {cartItems.map((item) => (
          <li
            key={item.id}
            role="menuitem"
            onClick={() => onItemClick(item.id, item.price)}
            className="mb-2 flex cursor-pointer items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.03] p-3 transition-all hover:bg-white/[0.07]"
          >
            <img
              alt={item.course}
              src={item.img_course}
              className="h-14 w-14 rounded-2xl object-cover object-center"
            />
            <div className="min-w-0 flex-grow">
              <p className="truncate text-sm font-semibold text-white">
                {item.course}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-white/60">
                <span>{item.price}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Qty {item.quantity}</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(item.id);
              }}
              className="rounded-full border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-300 transition-colors hover:bg-red-400/10"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <div className="p-5 text-center text-sm text-white/60">
        Your cart is empty
      </div>
    )}
  </div>
);

export const NavbarWithMegaMenu: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCartItems = useSelector(selectTotalItemsInCart);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (!storedCartItems) return;

    const parsedCartItems = JSON.parse(storedCartItems);
    if (Array.isArray(parsedCartItems)) {
      dispatch(setCartItems(parsedCartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    setOpenNav(false);
    setIsOpen(false);
  }, [location.pathname]);

  const navShellClass = useMemo(
    () => "fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-6",
    []
  );

  const authButtonBase =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out";
  const loginButtonClass = `${authButtonBase} border border-white/10 bg-white/5 text-white hover:border-[var(--purple-color)] hover:bg-white/10`;
  const signupButtonClass = `${authButtonBase} bg-[var(--peach-color)] text-white shadow-lg shadow-[var(--peach-color)]/25 hover:-translate-y-0.5 hover:bg-[#ff7d66]`;
  const signOutButtonClass = `${authButtonBase} border border-white/10 bg-white/5 text-white hover:border-[var(--peach-color)] hover:bg-white/10`;
  const iconButtonClass =
    "relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-[var(--purple-color)] hover:bg-white/10";

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleItemClick = (id: string, price: string) => {
    navigate(`/cart/${id}`, { state: { price } });
  };

  return (
    <nav className={navShellClass}>
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[28px] border border-white/10 bg-[rgba(20,17,34,0.82)] px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl lg:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-36" loading="lazy" />
            </Link>

            <div className="hidden lg:block">
              <NavList isAuthenticated={isAuthenticated} />
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {isAuthenticated ? (
                <>
                  <div className="relative">
                    <button
                      className={iconButtonClass}
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      <FiShoppingCart className="h-5 w-5" />
                      {totalCartItems > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--peach-color)] px-1 text-xs font-bold text-white">
                          {totalCartItems}
                        </span>
                      )}
                    </button>
                    <CartDropdown
                      isOpen={isOpen}
                      cartItems={cartItems}
                      onItemClick={handleItemClick}
                      onRemoveItem={handleRemoveItem}
                    />
                  </div>
                  <button className={signOutButtonClass} onClick={handleSignOut}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className={loginButtonClass}>
                    Log In
                  </Link>
                  <Link to="/signup" className={signupButtonClass}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
              onClick={() => setOpenNav((prev) => !prev)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              openNav ? "max-h-[520px] pt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-[26px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
              <NavList
                isAuthenticated={isAuthenticated}
                mobile
                onNavigate={() => setOpenNav(false)}
              />

              <div className="mt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="relative">
                      <button
                        className={`${iconButtonClass} w-full justify-center gap-2`}
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        <FiShoppingCart className="h-5 w-5" />
                        <span>Cart</span>
                        {totalCartItems > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--peach-color)] px-2 py-1 text-xs font-bold text-white">
                            {totalCartItems}
                          </span>
                        )}
                      </button>
                      <CartDropdown
                        isOpen={isOpen}
                        cartItems={cartItems}
                        onItemClick={handleItemClick}
                        onRemoveItem={handleRemoveItem}
                        mobile
                      />
                    </div>
                    <button
                      className={signOutButtonClass}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className={loginButtonClass}
                      onClick={() => setOpenNav(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className={signupButtonClass}
                      onClick={() => setOpenNav(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithMegaMenu;
