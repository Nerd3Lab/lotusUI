import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  label: string;
  exact?: boolean;
  isExternal?: string;
}

const NavLinkItem = ({
  to,
  label,
  exact = false,
  isExternal,
}: NavLinkItemProps) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  if (isExternal) {
    return (
      <a
        href={isExternal}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'py-2 px-3 text-sm font-semibold transition-colors cursor-pointer',
          isActive ? 'text-cyan-300' : 'text-white hover:text-cyan-300',
        )}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={clsx(
        'py-2 px-3 text-sm font-semibold transition-colors',
        isActive ? 'text-cyan-300' : 'text-white hover:text-cyan-300',
      )}
    >
      {label}
    </Link>
  );
};

export default NavLinkItem;
