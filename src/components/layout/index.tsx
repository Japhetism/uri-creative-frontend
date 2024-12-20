import { ILayout } from "@/interfaces/layout";
import Header from "../header";

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div>
      <Header/>
      <div className="p-10">
        {children}
      </div>
    </div>
  )
}

export default Layout;
