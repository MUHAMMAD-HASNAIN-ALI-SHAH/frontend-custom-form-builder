const Footer = () => {
  return (
    <footer className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
      <p className="text-sm font-medium text-slate-600">
        © {new Date().getFullYear()} Form Circuit. All rights reserved.
      </p>

      <p className="mt-2 text-xs text-slate-400">
        Built with ❤️ by Hasnain
      </p>
    </footer>
  );
};

export default Footer;