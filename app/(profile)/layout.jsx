import Header from "./Header";
import ProfileMenu from "./ProfileMenu";

export default function HomeLayout({ children }) {
  return (
    <div>
      <Header />
      <ProfileMenu />
      {children}
    </div>
  );
}
