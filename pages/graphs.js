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
    return () => unsubscribe();
  }, [user]);

  return <div><pre><code>{JSON.stringify(userConsumptionData, " ", 2)}</code></pre></div>;
};

export default Graphs;
