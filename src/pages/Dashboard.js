import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const colors = ["#f9e3fa", "#d6f9ff", "#f5f5c4", "#d3f7d0"];

  // destructuring the vendor list from the redux store
  const { userList } = useSelector((state) => state.userData);
  // counting the total active vendor from the vendorRequestList

  const totalUsers = userList?.length || 0;

  // Initialize arrays to hold data for months and user counts
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const userCounts = new Array(12).fill(0);

  // Loop through userList to count users for each month
  userList?.forEach((user) => {
    const userComingDate = new Date(user?.createdAt);
    const monthIndex = userComingDate?.getMonth();
    userCounts[monthIndex]++;
  });

  // Create an object to store the count of users for each country
  const userCountsByCountry = {};

  // Count the occurrences of each country in the userList
  userList?.forEach((user) => {
    const country = user?.countryCode;
    userCountsByCountry[country] = (userCountsByCountry[country] || 0) + 1;
  });

  // Create data points for each country with their counts
  const countryData = Object.entries(userCountsByCountry).map(
    ([countryCode, count]) => ({
      value: count,
      label:
        countryCode === "+33"
          ? "France"
          : countryCode === "+44"
          ? "UK"
          : "Others",
    })
  );

  const { data } = useSelector((state) => state.activeVendorList);
  const totalActiveVendor = data?.length || 0;

  const { orders } = useSelector((state) => state.orderList);
const activeOrders = orders?.filter(order => order.status !== 'Refund') || [];
const totalActiveOrders = activeOrders?.length||0;

  return (
    <Grid
      container
      spacing={4}
      style={{ marginTop: "20px", width: "90%", marginLeft: "5%" }}
    >
      <Grid xs={12} display={"flex"} flexDirection={"row"} marginTop="15px">
        {/* Total Vendors */}
        <Grid item xs={4}>
          <Paper
            sx={{
              height: "150px",
              width: "90%",
              backgroundColor: colors[0],
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Icon fontSize="large">peopleAlt</Icon>
            <Typography variant="h6" gutterBottom>
              Total Customers
            </Typography>
            <Typography variant="h4" gutterBottom>
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Customers */}
        <Grid item xs={4}>
          <Paper
            sx={{
              height: 150,
              width: "90%",
              backgroundColor: colors[1],
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Icon fontSize="large">group</Icon>
            <Typography variant="h6" gutterBottom>
              Total Vendors
            </Typography>
            <Typography variant="h4" gutterBottom>
              {totalActiveVendor}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Orders */}
        <Grid item xs={4}>
          <Paper
            sx={{
              height: 150,
              width: "90%",
              backgroundColor: colors[2],
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Icon fontSize="large">listAlt</Icon>
            <Typography variant="h6" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h4" gutterBottom>
              {totalActiveOrders}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Revenue */}
        {/* <Grid item xs={3}>
          <Paper
            sx={{
              height: 150,
              width: "90%",
              backgroundColor: colors[3],
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Icon fontSize="large">payments</Icon>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h4" gutterBottom>
              0
            </Typography>
          </Paper>
        </Grid> */}
      </Grid>

      <Grid xs={12} display={"flex"} flexDirection={"row"} marginTop="20px">
        {/* BarChart */}
        <Grid item xs={12} md={6} style={{ marginTop: "20px" }}>
          <Paper
            sx={{
              height: "340px",
              width: "95%",
              backgroundColor: "#fff",
              padding: "20px",
              paddingRight: "10px",
            }}
          >
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: months,
                },
              ]}
              series={[
                {
                  data: userCounts,
                },
              ]}
              style={{ width: "100%", height: "80%" }}
            />
          </Paper>
        </Grid>

        {/* PieChart */}
        <Grid item xs={12} md={6} style={{ marginTop: "20px" }}>
          <Paper
            sx={{
              height: "337px",
              width: "95%",
              backgroundColor: "#fff",
              paddingLeft: "23%",
              paddingTop: "5%",
            }}
          >
            <PieChart
              series={[
                {
                  data: countryData,
                },
              ]}
              width={400}
              height={200}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
