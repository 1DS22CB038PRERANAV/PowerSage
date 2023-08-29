import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addEnergyConsumptionData = async (uid, energyConsumptionData) => {
  try {
    const userSubcollectionRef = doc(db, "users", uid);

    // Update the subcollection with the new energy consumption data.
    await updateDoc(userSubcollectionRef, {
      energyConsumptionData: arrayUnion(energyConsumptionData),
    });
    console.info("Successfully added to database");
  } catch (error) {
    console.error("Error adding energy consumption data:", error);
  }
};

export const getEnergyConsumptionData = async (uid) => {
  try {
    const userSubcollectionRef = doc(db, "users", uid);
    const userSubcollectionSnapshot = await getDoc(userSubcollectionRef);

    if (userSubcollectionSnapshot.exists()) {
      const userData = userSubcollectionSnapshot.data();
      return userData.energyConsumptionData;
    } else {
      console.log("User data not found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching energy consumption data:", error);
    return [];
  }
};
