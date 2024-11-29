import PageHeader from "../../components/BreadCrumbHeader/BreadCrumbHeader";
import Profile from "./Profile";
function Dashboard() {
  return (
    <section className="dashboard mt-[80px] ">
      <PageHeader text="Dashboard" title="Dashboard" />
      <Profile />
    </section>
  );
}

export default Dashboard;
