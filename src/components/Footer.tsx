export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0F19] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 text-center transition-colors duration-300">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              AmorSoftLabs
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            Crafting state-of-the-art tools, utilities, and core libraries for the open-source community.
          </p>
          <div className="w-full border-t border-gray-200 dark:border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AmorSoftLabs. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
