import React from "react";
import Layout from "../components/layout";
import Dashboard from "./Dashboard";

const Home = () => {
 

  return (
    <Layout>
      <div style={{ marginTop: "80px" }}>
        <Dashboard/>
        
      </div>
    </Layout>
  );
};

export default Home;
