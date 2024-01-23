const Footer = () => {
  const currentYear = new Date().getFullYear();
  const developer_link = "https://shakhlyn.vercel.app/";

  return (
    <footer className="mt-auto">
      <div className="flex justify-center bg-darkGray text-slate-100 py-4 ">
        <p>
          {/* &copy; Agora 2023. All rights reserved. */}
          &copy; {currentYear} Agora 2023. All rights reserved | Designed and
          developed by <span>&nbsp;</span>
          <a href={developer_link}>
            <span className="hover:text-yellow-500 ">Shakhlyn</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
