import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import { RootState } from "../../Store/store";

interface LinkItem {
  title: string;
  items: { name: string; path: string }[];
}

const FooterLinkSection = React.memo(({ title, items }: LinkItem) => (
  <div className="flex-1">
    <h2 className="text-lg font-semibold mb-4 opacity-70">{title}</h2>
    <ul className="space-y-2">
      {items.map(({ name, path }) => (
        <li key={name}>
          <Link
            to={path}
            className="text-sm transition-colors hover:text-gray-400"
            aria-label={`Navigate to ${name}`}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

const FooterWithSocialLinks: React.FC = React.memo(() => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isStudent = true; // Adjust based on your app's role-checking logic

  const LINKS = useMemo((): LinkItem[] => {
    const baseLinks: LinkItem[] = [
      {
        title: "For Student",
        items:
          isAuthenticated && isStudent
            ? [
                { name: "Home", path: "/" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "Shopping Cart", path: "/cart" },
                { name: "Blogs", path: "/blog" },
              ]
            : [
                { name: "Profile", path: "/profile" },
                { name: "Login", path: "/login" },
                { name: "Register", path: "/register" },
              ],
      },
      {
        title: "Company",
        items: [
          { name: "About Us", path: "/about" },
          { name: "Privacy", path: "/privacy" },
          { name: "Terms", path: "/terms" },
          { name: "Accessibility", path: "/accessibility" },
        ],
      },
    ];

    if (!isAuthenticated) {
      baseLinks.unshift({
        title: "For Instructor",
        items: [
          { name: "Profile", path: "/instructor/profile" },
          { name: "Login", path: "/instructor/login" },
          { name: "Register", path: "/instructor/register" },
        ],
      });
    }
    return baseLinks;
  }, [isAuthenticated, isStudent]);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="text-white py-16 w-full px-5">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <NavLink to="/" className="text-2xl font-bold mb-6 block w-full">
              <img src={logo} alt="Logo" className="mr-2 w-44" />
            </NavLink>
            <p className="text-sm opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              consequat mauris Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut consequat mauris.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row md:justify-between gap-8 col-span-2">
            {LINKS.map(({ title, items }) => (
              <FooterLinkSection key={title} title={title} items={items} />
            ))}
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 opacity-70">
              Newsletter
            </h2>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-3 rounded-md text-gray-800 bg-gray-100 mb-4"
              aria-label="Enter your email for newsletter subscription"
            />
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="mr-3">
                  <svg
                    className="h-5 w-5 text-[#7D51F1]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                    <path d="M11 11h2v5h-2zm0-4h2v2h-2z" />
                  </svg>
                </span>
                3556 Beech Street, San Francisco, California, CA 94108
              </div>
              <div className="flex items-center text-[12px] lg:text-[15px] ">
                <span className="mr-3">
                  <svg
                    className="h-5 w-5 text-[#F14451]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 12.713l-11.999-9.713h24zm-.02 2.287c-4.498 0-7.98-.992-7.98-2.219v-2.978l7.98 4.237 7.979-4.236v2.978c0 1.228-3.482 2.218-7.979 2.218z" />
                  </svg>
                </span>
                dreamslms@example.com
              </div>
              <div className="flex items-center">
                <span className="mr-3">
                  <svg
                    className="h-5 w-5 text-[#F19144]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.707 12.293a1 1 0 00-1.414 0l-4.293 4.293V5a1 1 0 10-2 0v11.586l-4.293-4.293a1 1 0 10-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                  </svg>
                </span>
                +19 123-456-7890
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-8 text-sm opacity-70 mb-4 md:mb-0">
            <Link to="/" className="hover:text-gray-400">
              Terms
            </Link>
            <Link to="/" className="hover:text-gray-400">
              Privacy
            </Link>
          </div>
          <div className="text-center text-sm">
            &copy; {currentYear} Dreams LMS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
});

export default FooterWithSocialLinks;
