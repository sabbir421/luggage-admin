import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import NoLuggageOutlinedIcon from "@mui/icons-material/NoLuggageOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./sidebar.css";
import { useState } from "react";
const Sidebar = () => {
  const [offerSub, setOfferSub] = useState(false);
  const handleClick = () => {
    if (offerSub === false) {
      setOfferSub(true);
    } else {
      setOfferSub(false);
    }
  };
  return (
    <ProSidebar
      style={{ backgroundColor: "white", width: "100%", minWidth: "100%" }}
    >
      <Menu>
        <MenuItem component={<Link to="/admin" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <FormatListBulletedOutlinedIcon />
            </div>
            <div>Admin List</div>
          </div>
        </MenuItem>
        {/* <MenuItem component={<Link to="/vendor/request" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <GroupAddOutlinedIcon />
            </div>
            <div>Vendor request</div>
          </div>
        </MenuItem> */}
        <MenuItem component={<Link to="/vendor/list" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <ChecklistOutlinedIcon />
            </div>
            <div>Vendor list</div>
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/users" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <AccountBoxIcon />
            </div>
            <div>User list</div>
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/store/list" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <StoreMallDirectoryOutlinedIcon />
            </div>
            <div>Store list</div>
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/pending/company" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <PendingActionsOutlinedIcon />
            </div>
            <div>Pending company</div>
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/active/order" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <ShoppingBasketIcon />
            </div>
            <div>Active Order</div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/facility" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <AddBoxOutlinedIcon />
            </div>
            <div>Facility</div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/create/employee" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <PersonAddAltOutlinedIcon />
            </div>
            <div>Create Employee</div>
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/create/store/price" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <InventoryIcon />
            </div>
            <div>Create Store Price </div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/store/price/list" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <FormatListBulletedOutlinedIcon />
            </div>
            <div>Store Price List </div>
          </div>
        </MenuItem>

        <MenuItem>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <LocalOfferOutlinedIcon />
            </div>
            <div onClick={handleClick}>Offer</div>
          </div>
        </MenuItem>

        {offerSub && (
          <div style={{ marginTop: "-10px", marginLeft: "10%" }}>
            <MenuItem component={<Link to="/manage/offer" />}>
              <div
                style={{ display: "flex", alignItems: "center", flexGrow: 2 }}
              >
                <Brightness5OutlinedIcon style={{ marginRight: "10px" }} />
                Manage Offer
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/offer/promo" />}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CardGiftcardOutlinedIcon style={{ marginRight: "10px" }} />
                Promo code
              </div>
            </MenuItem>
            <MenuItem component={<Link to="/offer/bag" />}>
              <div
                style={{ display: "flex", alignItems: "center", flexGrow: 2 }}
              >
                <NoLuggageOutlinedIcon style={{ marginRight: "10px" }} />
                Bag discount
              </div>
            </MenuItem>
          </div>
        )}
        <MenuItem component={<Link to="/create/category" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <InventoryIcon />
            </div>
            <div>Create category </div>
          </div>
        </MenuItem>

        {/* <MenuItem component={<Link to="/country" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <LanguageOutlinedIcon />
            </div>
            <div>Country List</div>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/withraw/request" />}>
          <div className="menu">
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <LocationCityOutlinedIcon />
            </div>
            <div>City List</div>
          </div>
        </MenuItem> */}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
