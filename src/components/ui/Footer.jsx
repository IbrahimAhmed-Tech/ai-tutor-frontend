
import Logo from '../../assets/footerLogo.svg'
export default function Footer() {
    return (
       

<footer class="bg-[#131B2A]  shadow-sm dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>                <span class="text-white font-poppins self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AI Tutor</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 text-white font-poppins">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 text-white font-poppins">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 text-white font-poppins">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline text-white font-poppins">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 text-white font-poppins">© 2023 <a  class="hover:underline">AI Tutor™</a>. All Rights Reserved.</span>
    </div>
</footer>


    )
}
  