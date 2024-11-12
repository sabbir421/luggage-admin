import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./utils/privateRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/AdminList";
import NotFound from "./components/NotFound";
import AdminUpdate from "./pages/AdminUpdate";
import VendorRequestList from "./pages/VendorRequestList";
import VendorRequestDetailsPage from "./pages/VendorRequestDetailsPage";
import UserView from "./pages/userView";
import Facility from "./pages/Facility";
import WithrawRequest from "./pages/WithrawRequest";
import ActiveOrder from "./pages/ActiveOrder";
import Country from "./pages/Country";
import VendorList from "./pages/VendorList";
import UserDeleteForm from "./pages/UserDeleteForm";
import CreateEmploye from "./pages/CreateEmploye";
import Profile from "./pages/Profile";
import CreateStorePricing from "./pages/CreateStorePricing";
import StorePriceList from "./pages/StorePriceList";
import StoreList from "./pages/StoreList";
import PartnerStoreList from "./pages/PartnerStoreList";
import PromoCode from "./pages/PromoCode";
import BagDiscount from "./pages/BagDiscount";
import ManageOffer from "./pages/ManageOffer";
import CreateCategory from "./pages/CreateCategory";
import CreateSubCategory from "./pages/CreateSubCategory";
import PendingCompany from "./pages/PendingCompany";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/update" element={<AdminUpdate />} />
        <Route path="/pending/company" element={<PendingCompany />} />
        <Route path="/vendor/request" element={<VendorRequestList />} />
        <Route path="/create/employee" element={<CreateEmploye />} />
        <Route path="/create/store/price" element={<CreateStorePricing />} />
        <Route path="/store/price/list" element={<StorePriceList />} />
        <Route path="/offer/promo" element={<PromoCode />} />
        <Route path="/offer/bag" element={<BagDiscount />} />
        <Route path="/manage/offer" element={<ManageOffer />} />
        <Route path="/create/category" element={<CreateCategory />} />

        <Route
          path="/vendor/request/details"
          element={<VendorRequestDetailsPage />}
        />
        <Route path="/vendor/list" element={<VendorList />} />
        <Route path="/store/list" element={<StoreList />} />
        <Route path="/partner/store/list" element={<PartnerStoreList />} />
        <Route path="/facility" element={<Facility />} />
        <Route path="/users" element={<UserView />} />
        <Route path="/withraw/request" element={<WithrawRequest />} />
        <Route path="/active/order" element={<ActiveOrder />} />
        <Route path="/country" element={<Country />} />
        <Route path="/sub-category" element={<CreateSubCategory />} />
        <Route path="/Profile" element={<Profile />} />
      </Route>
      <Route path="*" element={NotFound} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/delete" element={<UserDeleteForm />} />
    </Routes>
  );
};
export default App;
