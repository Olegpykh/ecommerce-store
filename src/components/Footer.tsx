const Footer = () => {
  return (
    <footer className="py-6 bg-gray-100 dark:bg-black/90 dark:text-white">
      <div className="container px-4 mx-auto text-center text-gray-600 dark:text-white">
        <p>© {new Date().getFullYear()} Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
