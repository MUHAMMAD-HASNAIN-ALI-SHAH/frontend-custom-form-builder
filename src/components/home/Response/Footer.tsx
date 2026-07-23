const Footer = () => {
  return (
    <div className="w-full text-center py-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Custom Form Builder. All rights
        reserved.
      </p>
      <p className="text-xs text-gray-500 mt-1">Built with ❤️ by Hasnain</p>
    </div>
  );
};

export default Footer;
