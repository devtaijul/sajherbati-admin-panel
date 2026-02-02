// *********************
// Role of the component: The footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Footer />
// Input parameters: No input parameters
// Output: The footer component
// *********************

const Footer = () => {
  return (
    <footer className="dark:bg-blackPrimary bg-whiteSecondary">
      <div className="px-6 py-8 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-base leading-5 text-center black:text-whiteSecondary text-blackPrimary dark:text-whiteSecondary max-xl:text-sm">
            &copy; 2023 Sajher Bati. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
