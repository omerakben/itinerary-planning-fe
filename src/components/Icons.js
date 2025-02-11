import Image from 'next/image';
import PropTypes from 'prop-types';

export function DashboardIcon({ className = 'w-5 h-5' }) {
  return <Image src="/svg/dashboard.svg" alt="Dashboard" width={20} height={20} className={className} />;
}

export function SearchIcon({ className = 'w-5 h-5' }) {
  return <Image src="/svg/search.svg" alt="Search" width={20} height={20} className={className} />;
}

export function PlusIcon({ className = 'w-5 h-5' }) {
  return <Image src="/svg/plus.svg" alt="Add New" width={20} height={20} className={className} />;
}

export function ItinerariesIcon({ className = 'w-5 h-5' }) {
  return <Image src="/svg/planner.svg" alt="My Itineraries" width={20} height={20} className={className} />;
}

export function MenuIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// PropTypes for all icons
const iconPropTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: 'w-5 h-5',
};

DashboardIcon.propTypes = iconPropTypes;
SearchIcon.propTypes = iconPropTypes;
PlusIcon.propTypes = iconPropTypes;
ItinerariesIcon.propTypes = iconPropTypes;
MenuIcon.propTypes = iconPropTypes;
CloseIcon.propTypes = iconPropTypes;

DashboardIcon.defaultProps = defaultProps;
SearchIcon.defaultProps = defaultProps;
PlusIcon.defaultProps = defaultProps;
ItinerariesIcon.defaultProps = defaultProps;
MenuIcon.defaultProps = defaultProps;
CloseIcon.defaultProps = defaultProps;
