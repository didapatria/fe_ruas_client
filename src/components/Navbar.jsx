import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  let name = "";
  if (user) {
    name = user.fullName.split(" ")[0];
  }

  return (
    <nav className="bg-slate-600 p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          Ruas (Ruang Pengawas) Ujian - Client
        </div>
        <div className="flex items-center">
          {user && <div className="text-white mr-4">{name}</div>}
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
