import ProfileCard from "./ProfileCard";
import ProfileProgress from "./ProfileProgress";

function Profile() {
  return (
    <section className="mt-[50px]  mx-auto max-w-[1280px]">
      <div className="flex gap-6 flex-col p-5 xl:flex-row">
        <ProfileCard />
        <ProfileProgress />
      </div>
    </section>
  );
}

export default Profile;
