import {
  ENTERTAINMENT_APPLIANCES_DATA,
  ESSENTIAL_APPLIANCES_DATA,
  KITCHEN_APPLIANCES_DATA,
  LAUNDRY_APPLIANCES_DATA,
  OTHER_APPLIANCES_DATA,
} from "@/data/appliancesData";
import React, { useState } from "react";
import { Button, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { auth } from "@/utils/firebase";
import { addEnergyConsumptionData } from "@/utils/databaseRelated";

const Calculate = () => {
  const [open, setOpen] = useState(false);
  const [finalData, setFinalData] = useState();
  const [appliances, setAppliances] = useState([
    {
      id: Date.now(),
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
    // Calculating Total energy consumed per day here
    const totalEnergy = appliances.reduce(
      (total, appliance) => total + appliance.energyConsumed,
      0
    );
    // Creating a structure of Data that is stored in
    const dataRequired = {
      timestamp: Date.now(),
      date: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      totalEnergyConsumedPerDay: Number(totalEnergy).toFixed(2),
      totalEnergyConsumedPerMonth: Number(totalEnergy * 30).toFixed(2),
      totalEnergyConsumedPerYear: Number(totalEnergy * 365).toFixed(2),
      energyConsumedData: appliances,
    };
    setFinalData(dataRequired);
    setOpen(true);
    addEnergyConsumptionData(auth.currentUser.uid, dataRequired);
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
      <Form
        onSubmit={handleSubmit}
        onFocus={() => setOpen(false)}
        className="m-4"
      >
        <Row className="fw-bold">
          <Col>Appliance Name</Col>
          <Col>Quantity</Col>
          <Col>Watts</Col>
          <Col>Hours Used Per Day</Col>
          <Col>Action</Col>
          <Col>Consumption Per Day</Col>
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
                        <React.Fragment key={categoryItem}>
                          <option className="categoryOption" disabled>
                            {categoryItem}
                          </option>
                          {dropdownData.map((item, index) =>
                            categoryItem === item.category ? (
                              <option key={index}>{item.applianceName}</option>
                            ) : null
                          )}
                        </React.Fragment>
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
                    min={0.25}
                    max={24}
                    step={0.25}
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
      <div className="m-4 p-3">
        <Collapse in={open}>
          <div className="p-3 border rounded">
            <div className="mb-3">
              <span className="fw-bold">
                Total Energy Consumed Per Day : &emsp;
              </span>
              <span>{finalData?.totalEnergyConsumedPerDay}&nbsp;kWh/day</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">
                Projected Total Energy Consumed Per Month : &emsp;
              </span>
              <span>
                {finalData?.totalEnergyConsumedPerMonth}&nbsp;kWh/month
              </span>
            </div>
            <div>
              <span className="fw-bold">
                Projected Total Energy Consumed Per Year : &emsp;
              </span>
              <span>{finalData?.totalEnergyConsumedPerYear}&nbsp;kWh/year</span>
            </div>
          </div>
        </Collapse>
      </div>
      <Container className="m-4 p-3 w-100">
        <h2>Energy Saving Tips</h2>
        <Row className="m-4 p-2 g-2">
          <Col>
            <p>
              1. Monitor your energy using habits. Many of us may not think much
              about how we are using energy. Consciously tracking some of your
              energy habits over a period of time can help to give you an idea
              of how you are using your electricity. Changes such as turning off
              lights or appliances that aren&apos;t being used, using a standing fan
              instead of the air conditioning when possible, putting on more
              clothing and using less heating, hand drying or washing smaller
              loads of laundry/dishes, and more, can have a significant effect
              on your savings.
            </p>
            <p>
              2. Replace older light bulbs, particularly incandescent light
              bulbs, with more efficient LED light bulbs. A typical incandescent
              light bulb requires 75 W while an LED only requires 9 W. LEDs cost
              more in the short term, but if you have the opportunity to replace
              any incandescent light bulbs you may have, it will lead to
              significant future savings.
            </p>
            <p>
              3. If possible, install a programmable thermostat. A large
              proportion of energy cost is typically due to heating/cooling.
              Programming a thermostat to adjust the temperature to suit your
              usage needs can lead to significant savings. It is also not
              necessary to buy a smart thermostat. If you have access to the
              thermostat, you can develop a habit of manually adjusting the
              thermostat to best suit your needs throughout the day.
            </p>
            <p>
              4. Pay attention to energy efficiency when shopping for
              appliances. Purchasing appliances with energy efficiency in mind
              can lead to significant savings. Factor this into the cost of the
              appliance in the long run, not just the initial cost to purchase
              the appliance.
            </p>
            <p>
              5. Check your windows. Heat loss through windows is common,
              especially in colder regions. If possible, replace your windows
              with more energy efficient windows that result in less heat loss.
              Similarly, if you live in hotter climates, look for windows that
              can reflect more light and reduce the amount of heat that comes in
              through your windows. Make use of curtains, blinds, or anything
              that can obstruct the sunlight during the brighter periods of the
              day to save on cooling costs.
            </p>
            <p>
              6. Insulate your home as best as possible. Windows, doors, vents,
              the attic, walls, floors, basement, and crawlspace of your home,
              if not well-insulated, can lead to higher heating and cooling
              bills.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Calculate;
