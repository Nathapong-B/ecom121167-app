// Removed unused imports: useShallow, useEcomStore, createSearchParams, useNavigate
// We'll use static data as provided for now.

export default function MainFooter() {
    // Removed dynamic category fetching and navigation logic for now

    // Static category list as provided by the user
    const staticCategories = [
        'Monitor Screen', 'Personal Computer / PC', 'Case', 'Laptop / Notebook',
        'Taplet', 'Mobile Phone', 'Gadget', 'Graphic Card', 'Accessories',
        'Storage', 'Memory', 'Mainboard'
    ];

    // Placeholder function for category click (can be adapted later)
    const handleCategoryClick = (categoryName) => {
        console.log(`Clicked category: ${categoryName}`);
        // Add navigation logic here if needed in the future
    };

    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Changed grid to 2 columns on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column: Logo, Name, About */}
                    <div className="space-y-4">
                        {/* Placeholder for Logo */}
                        <div className="text-white text-2xl font-bold">
                            LOGO
                        </div>
                        {/* Placeholder for Website Name */}
                        <div className="text-white text-lg font-semibold">
                            Your Ecom Shop
                        </div>
                        {/* About Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                                About
                            </h3>
                            <p className="text-sm text-gray-400">
                                This website description...
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact, Social, Categories (temporarily placed here) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8"> {/* Sub-grid for right content */} 
                        
                        {/* Contact & Social Sub-column */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Contact Us
                            </h3>
                            <div className="space-y-2 text-sm text-gray-400 mb-6">
                                <p>Office: 123/30 bangkok 1234556</p>
                                <p>E-mail: ecom-shop@mail.com</p>
                            </div>

                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Social Media
                            </h3>
                            <div className="flex space-x-4 text-xl text-gray-400">
                                <a href="#" className="hover:text-white">
                                    <i className="fa-brands fa-line"></i>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                            </div>
                        </div>

                        {/* Categories Sub-column (temporarily placed here) */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Categories
                            </h3>
                            {/* Adjusted columns for sub-grid context */}
                            <ul className="space-y-1 text-sm columns-1 sm:columns-2 gap-x-6">
                                {staticCategories.map((category, index) => (
                                    <li key={index} className="break-inside-avoid-column">
                                        <button
                                            onClick={() => handleCategoryClick(category)}
                                            className="text-gray-400 hover:text-white hover:underline text-left"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        @copyright 2025
                    </p>
                </div>
            </div>
        </footer>
    );
};