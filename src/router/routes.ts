import Logining from "@/view/Logining";
import Landing from "@/view/Landing";
import NotFound from "@/view/NotFound";
import Homeing from "@/view/Homeing";
import Datil from "@/view/DatilView";
import OurDetail from "@/view/OurDetail";
import BokeData from "@/view/OurDetail/BokeData";
import Createing from "@/view/OurDetail/Createing";
import OurInformation from "@/view/OurDetail/OurInformation";
import changePhoto from "@/view/ChangePhoto";

const routes: any = [
  { path: "/", redirect: "/land" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  { path: "/login", component: Logining },
  { path: "/land", component: Landing },
  { path: "/home", component: Homeing },
  { path: "/datil", component: Datil },
  {
    path: "/ourDetail",
    component: OurDetail,
    children: [
      { path: "/bokeData", component: BokeData },
      { path: "/createing", component: Createing },
      { path: "/OurInformation", component: OurInformation },
    ],
  },
  { path: "/changePhoto", component: changePhoto },
];
export default routes;
