import { Link } from "react-router-dom";
import dashimg from "../../assets/breadcrumb-bar.png";

interface PageHeaderProps {
  text: string;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text, title }) => {
  return (
    <div className="relative text-[var(--text-color)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl tracking-wide font-bold">{title}</p>
        <p className="text-sm">
          <Link to="/" className="text-[#5a5864] font-bold">
            Home
          </Link>
          <span className="mx-2 text-[var(--peach-color)]">/</span>
          <span>{text}</span>
        </p>
      </div>
      <img
        src={dashimg}
        alt="Dashboard Background"
        className="h-52 w-full object-cover"
      />
    </div>
  );
};

export default PageHeader;
