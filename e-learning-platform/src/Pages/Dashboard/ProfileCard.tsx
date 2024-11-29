import studentImg from "../../assets/student1.jpg";
import profileBg from "../../assets/profile-bg.jpg";
import { RiDashboard3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { signOut } from "../../features/Auth/authSlice";
const dashboardTools = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RiDashboard3Line />,
    location: "/dashboard",
  },
  { id: 2, title: "MyProfile", icon: <CgProfile />, location: "" },
  {
    id: 3,
    title: "Enrolled Coureses",
    icon: <FaGraduationCap />,
    location: "",
  },
  {
    id: 4,
    title: "Order History",
    icon: <FaCartShopping />,
    location: "",
  },
];

function ProfileCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    dispatch(signOut()); // Clear the user from Redux
    navigate("/"); // Navigate to the home page
  };
  const navigateToSettings = () => {
    navigate("");
  };
  const accountSettings = [
    {
      id: 1,
      title: "Settings",
      icon: <IoIosSettings />,
      onclick: navigateToSettings,
    },
    { id: 2, title: "Logout", icon: <IoLogOut />, onclick: handleSignOut },
  ];
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <section className="flex justify-between xl:flex-col flex-row xl:justify-normal">
      <div className="relative flex justify-center items-center flex-col bg-[#2b2838] rounded-sm">
        <div className="box-peach  w-full h-20 absolute top-0">
          <img src={profileBg} alt="" />
        </div>

        <div className="py-4 px-2 z-8 relative flex flex-col items-center -mt-1">
          <div className="img-profile mb-2">
            <img
              src={studentImg}
              alt=""
              className="w-36 rounded-full border-[5px] border-solid border-white"
            />
          </div>
          <div className="info-profile text-center text-[var(--text-color)]">
            <p className="text-white font-extrabold">{user?.fullName}</p>
            <p>Student</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#2b2838]  py-2 px-5 text-[var(--text-color)] rounded-sm">
        <div className="mb-8">
          <p className="text-2xl mb-2 font-bold">Dashboard</p>
          <div className="flex flex-col gap-4">
            {dashboardTools.map((tool) => (
              <Link
                to={`${tool.location}`}
                key={tool.id}
                className="flex gap-2 items-center text-[17px]"
              >
                <span>{tool.icon}</span>
                <p>{tool.title}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold mb-2">Account Settings</p>
          {accountSettings.map((setting) => (
            <button
              key={setting.id}
              className="flex items-center gap-2 mb-1 text-[17px]"
              onClick={setting.onclick}
            >
              <span>{setting.icon}</span>
              <p>{setting.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
