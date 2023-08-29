import CategoryChart from "@/components/charts/CategoryChart";
import DayChart from "@/components/charts/DayChart";
import MonthChart from "@/components/charts/MonthChart";
import { useAuthContext } from "@/context/AuthContext";
import { getEnergyConsumptionData } from "@/utils/databaseRelated";
import { auth } from "@/utils/firebase";
import React, { useEffect, useState } from "react";

const Graphs = () => {
  const [userConsumptionData, setUserConsumptionData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = async () => {
      if (user) {
        const data = await getEnergyConsumptionData(auth.currentUser.uid);
        setUserConsumptionData(data);
      }
    };
    unsubscribe();
  }, [user]);

  return (
    <div className="m-4 d-flex flex-column g-5">
      <div className="mb-4">
        <DayChart userConsumptionData={userConsumptionData} />
      </div>
      <hr />
      <div className="mb-4">
        <MonthChart userConsumptionData={userConsumptionData} />
      </div>
      <hr />
      <div className="mb-4">
        <CategoryChart userConsumptionData={userConsumptionData} />
      </div>
    </div>
  );
};

export default Graphs;
