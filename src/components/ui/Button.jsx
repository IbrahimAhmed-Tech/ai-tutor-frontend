import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReusableButton = ({
  text,
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  loading = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`group relative w-full flex justify-center items-center gap-2 py-3 px-4 font-poppins border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default ReusableButton;
