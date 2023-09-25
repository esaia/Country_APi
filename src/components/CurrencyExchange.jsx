import { Tab, Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect } from "react";
import { TabContext } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import Exchange from "./tabs/Exchange";
import Airports from "./tabs/Airports";

const CurrencyExchange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabvalue, setTabValue] = React.useState(
    location.pathname.split("/")[2] === "airports" ? "airports" : "exchange"
  );

  const handleChange = (_, v) => {
    setTabValue(v);
    if (v === "airports") {
      if (!location.pathname.split("/")[1]) return;
      else navigate(`/${location.pathname.split("/")[1]}/airports`);
    } else {
      navigate(`/${location.pathname.split("/")[1]}`);
    }
  };

  useEffect(() => {
    console.log();
    if (location.pathname.split("/")[2] === "airports") {
      setTabValue("airports");
    } else {
      setTabValue("exchange");
    }
  }, [navigate]);

  return (
    <div>
      <TabContext value={tabvalue}>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="exchange" label="CURRENCY EXCHANGE" />
          <Tab value="airports" label="AIRPORTS" />
        </Tabs>

        <div className="shadow-md my-4">
          <TabPanel value="exchange">
            <Exchange />
          </TabPanel>

          <TabPanel value="airports">
            <Airports />
          </TabPanel>
        </div>
      </TabContext>
    </div>
  );
};

export default CurrencyExchange;
