import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogoutDialog({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 b">
      <div className="relative w-[95%] max-w-md bg-white rounded-xl p-2 shadow-xl">
        
        <button
          className="absolute top-3 right-3 text-black hover:text-gray-600"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faCircleXmark} className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold font-robotoCondensed text-center mb-6 text-gray-800">
          Confirm Logout
        </h2>

        {/* Dropdown-style description (to match visual) */}
        <div className="mb-6">
          <div className="w-full text-center font-poppins  rounded-md px-4 py-3 text-gray-700">
            Are you sure you want to logout?
          </div>
        </div>

        {/* Save/Logout Button */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-800 transition-all"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </div>
  );
}
