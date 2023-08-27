import {
  ENTERTAINMENT_APPLIANCES_DATA,
  ESSENTIAL_APPLIANCES_DATA,
  KITCHEN_APPLIANCES_DATA,
  LAUNDRY_APPLIANCES_DATA,
  OTHER_APPLIANCES_DATA,
} from "@/data/appliancesData";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Calculate = () => {
  const [appliances, setAppliances] = useState([
    {
      id: 1,
      category: "",
      applianceName: "",
      quantity: "",
      watts: "",
      hoursUsed: "",
      energyConsumed: "",
    },
  ]);
  const categoryDropData = [
    "ESSENTIAL",
    "KITCHEN",
    "LAUNDRY",
    "ENTERTAINMENT",
    "OTHER",
  ];
  const dropdownData = [
    ...ESSENTIAL_APPLIANCES_DATA,
    ...KITCHEN_APPLIANCES_DATA,
    ...LAUNDRY_APPLIANCES_DATA,
    ...ENTERTAINMENT_APPLIANCES_DATA,
    ...OTHER_APPLIANCES_DATA,
  ];

  const addAppliance = () => {
    const newAppliance = {
      id: Date.now(),
      category: "",
      applianceName: "",
      quantity: "",
      watts: "",
      hoursUsed: "",
      energyConsumed: "",
    };
    setAppliances([...appliances, newAppliance]);
  };

  const deleteAppliance = (id) => {
    const updatedAppliances = appliances.filter((item) => item.id !== id);
    setAppliances(updatedAppliances);
  };

  function calculateEnergyConsumption(watts, quantity, hours) {
    const energyInKWh = (watts * quantity * hours) / 1000;
    return energyInKWh;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const dataRequired = {
      timestamp: currentDate,
      date: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      totalEnergyConsumed: energyConsumptionData.reduce(
        (total, appliance) => total + appliance.energyConsumed,
        0
      ),
    };
    // Handle form submission logic here
  };

  return (
    <div className="m-auto mb-4">
      <div className="mb-4">
        <h1 className="m-4">Household Energy Consumption Calculator</h1>
        <h4 className="m-4">Steps to Calculate</h4>
        <ol>
          <li className="mb-3">
            Input the details for each appliance: Appliance Name, Quantity,
            Watts, and Hours Used.
          </li>

          <li className="mb-3">
            The energy consumption for each appliance will be calculated and
            displayed in the &quot;Consumption&quot; column.
          </li>

          <li className="mb-3">
            You can add more appliances by clicking the &quot;Add
            Appliance&quot; button.
          </li>

          <li className="mb-3">
            To delete an appliance, click the &quot;Delete&quot; button next to
            it.
          </li>

          <li className="mb-3">
            Once you&apos;ve entered details for all appliances, click the
            &quot;Calculate Total Consumption&quot; button.
          </li>

          <li className="mb-3">
            The total energy consumed by all appliances will be displayed at the
            bottom of the form after submission.
          </li>
        </ol>
      </div>
      <h3 className="m-4">Calculator</h3>
      <Form onSubmit={handleSubmit} className="m-4">
        <Row className="fw-bold">
          <Col>Appliance Name</Col>
          <Col>Quantity</Col>
          <Col>Watts</Col>
          <Col>Hours Used</Col>
          <Col>Action</Col>
          <Col>Consumption</Col>
        </Row>
        {appliances.map((appliance) => (
          <div key={appliance.id} className="mt-2 mb-2">
            <Row>
              {/* APPLIANCE FIELD */}
              <Col>
                <Form.Group controlId={"applianceName" + appliance.id}>
                  <Form.Control
                    as="select"
                    value={appliance.applianceName}
                    onChange={(e) =>
                      setAppliances((prevState) =>
                        prevState.map((item) =>
                          item.id === appliance.id
                            ? {
                                ...item,
                                applianceName: e.target.value,
                                category: dropdownData.find(
                                  (item) =>
                                    item.applianceName === e.target.value
                                ).category,
                                watts: Number(
                                  dropdownData.find(
                                    (item) =>
                                      item.applianceName === e.target.value
                                  ).watts
                                ),
                              }
                            : item
                        )
                      )
                    }
                  >
                    {/* Creating Dropdown Options */}
                    <>
                      <option>Select Appliance</option>
                      {categoryDropData.map((categoryItem) => (
                        <>
                          <option className="categoryOption" disabled>
                            {categoryItem}
                          </option>
                          {dropdownData.map((item, index) =>
                            categoryItem === item.category ? (
                              <option key={index}>{item.applianceName}</option>
                            ) : null
                          )}
                        </>
                      ))}
                    </>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* QUANTITY FIELD */}
              <Col>
                <Form.Group controlId={"quantity" + appliance.id}>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={appliance.quantity}
                    min={1}
                    onChange={(e) =>
                      setAppliances((prevState) =>
                        prevState.map((item) =>
                          item.id === appliance.id
                            ? { ...item, quantity: Number(e.target.value) }
                            : item
                        )
                      )
                    }
                  />
                </Form.Group>
              </Col>
              {/* WATTS FIELD */}
              <Col>
                <Form.Group controlId={"watts" + appliance.id}>
                  <Form.Control
                    type="number"
                    placeholder="Enter Watts"
                    value={appliance.watts}
                    min={1}
                    onChange={(e) =>
                      setAppliances((prevState) =>
                        prevState.map((item) =>
                          item.id === appliance.id
                            ? {
                                ...item,
                                watts: Number(e.target.value),
                              }
                            : item
                        )
                      )
                    }
                  />
                </Form.Group>
              </Col>
              {/* USED HOURS FIELD */}
              <Col>
                <Form.Group controlId={"hoursUsed" + appliance.id}>
                  <Form.Control
                    type="number"
                    value={appliance.hoursUsed}
                    placeholder="Enter Hours Used"
                    min={0}
                    onChange={(e) =>
                      setAppliances((prevState) =>
                        prevState.map((item) =>
                          item.id === appliance.id
                            ? {
                                ...item,
                                hoursUsed: Number(e.target.value),
                                energyConsumed: calculateEnergyConsumption(
                                  appliance.watts,
                                  appliance.quantity,
                                  e.target.value
                                ),
                              }
                            : item
                        )
                      )
                    }
                  />
                </Form.Group>
              </Col>
              {/* DELETE BUTTON */}
              <Col>
                <Button
                  variant="danger"
                  onClick={() => deleteAppliance(appliance.id)}
                  disabled={appliances.length === 1}
                >
                  Delete
                </Button>
              </Col>
              {/* CONSUMPTION PER APPLIANCE */}
              <Col>
                <Form.Group controlId={"calculatedConsumption" + appliance.id}>
                  <Form.Control
                    disabled
                    type="text"
                    value={`${appliance.energyConsumed} kWh`}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="secondary" onClick={addAppliance}>
          Add Appliance
        </Button>{" "}
        <Button variant="primary" type="submit">
          Calculate Total Consumption
        </Button>
      </Form>
    </div>
  );
};

export default Calculate;
