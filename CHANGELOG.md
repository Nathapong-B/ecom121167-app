# Changelog

All notable changes to this project will be documented in this file.


### Added

-   **Loading Skeletons:** Implemented skeleton loaders for product sections (Recommend, New Arrival, Best Seller) to improve perceived performance while data is loading.
-   **Fallback Placeholders:** Added fallback product cards with placeholder images and "(Fallback)" text for product sections when the backend API request fails.
-   **Development Environment Setup:**
    -   Configured Vite dev server proxy to forward `/api` requests to `http://localhost:3002`, resolving CORS issues during local development.
    -   Created `.env.development` file and set `VITE_URL=""` to integrate with the proxy configuration and `src/api/config.js`.
-   **Responsive Category Layouts:** Applied multi-column layouts to category lists in both the Footer and Navbar dropdown for better display on different screen sizes.
-   **Logo Placeholder:** Added a placeholder "LOGO" element in the Navbar.

### Changed

-   **Footer Redesign:**
    -   Completely redesigned the Footer (`MainFooter.jsx`) with a dark theme, improved layout (2-column structure: Logo/About left, Contact/Social/Categories right), and static category list.
    -   Resolved issues with duplicate footers being rendered.
-   **Navbar Refactoring:**
    -   Applied a fixed white background with shadow for better visibility.
    -   Removed scroll-based background/text color changes.
    -   Rearranged layout into logical left/center/right sections.
    -   Changed dropdown triggers (Categories, Cart, Profile) from hover to click for better usability and mobile compatibility.
    -   Updated Categories dropdown to use a static list.
    -   Improved styling of Categories and Cart dropdowns.
-   **Homepage Cover Animation:** Changed the initial homepage cover (`HomepageCover`) behaviour to slide up smoothly on scroll instead of requiring a click or disappearing instantly.
-   **Hero Section Layout (`Header.jsx`):**
    -   Adjusted vertical alignment of content.
    -   Positioned the main hero image to be vertically centered and shifted towards the right.
-   **Homepage Layout (`MainPage.jsx`):**
    -   Increased vertical spacing between the Hero section and the first product section.
    -   Increased vertical spacing between subsequent product sections (Recommend, New Arrival, Best Seller).
-   **API Calls:** Frontend API calls now use relative paths (`/api/...`) compatible with the Vite proxy setup (via `VITE_URL=""` and `src/api/config.js`).

### Fixed

-   **Navbar Cart Scroll Bug:** Prevented the page from scrolling to the top when clicking the cart icon to open the dropdown.
-   **Navbar Search Autocomplete:** Disabled browser autocomplete on the search input field (`NavSearch.jsx`) which was obscuring the input/button.

### Removed

-   **Duplicate Footer Component:** Deleted the unused `src/pages/homepage/components/footer.jsx` file.
-   **Sticky Sidebar Cart:** Commented out the `StickyBoxCart` component and its related layout elements in `mainPage.jsx` as it was redundant with the Navbar cart dropdown.
-   **Scroll-based Navbar Styling:** Removed logic and elements related to changing Navbar background/text color based on scroll position. 