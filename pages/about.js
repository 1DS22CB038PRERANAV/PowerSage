
import{Container,Row,Col} from 'react-bootstrap'

const About = () => {
  return (
    <Container className="mt-5">
    <h1>About this Project</h1>

    <Row>
      <p>
        Our project, the Energy Consumption Calculator and Data Visualization
        Tool, is built on a robust and modern technical stack to deliver an
        efficient, user-friendly, and data-driven application. We leverage
        cutting-edge technologies to provide accurate calculations, seamless
        user experience, and secure data handling.
      </p>
    </Row>
    <Row>
      <Col md={6}>
        <h2>Front-End Development</h2>
        <p>
          Our application is developed using Next.js, a powerful React
          framework that offers server-side rendering, optimized routing, and
          enhanced performance. Next.js allows us to create dynamic and
          responsive user interfaces, ensuring a smooth browsing experience.
        </p>
        <p>
          For styling and layout, we employ Bootstrap, a popular front-end
          framework that provides a responsive grid system, pre-designed
          components, and a cohesive design language. This ensures that our
          application is visually appealing and consistent across different
          devices.
        </p>
      </Col>
      <Col md={6}>
        <h2>Authentication and Data Storage</h2>
        <p>
          We integrate Firebase Authentication to provide secure user
          registration and login functionalities. Firebase Authentication
          handles user identity and access management, ensuring that only
          authorized users can access and interact with the application.
        </p>
        <p>
          To store user inputted appliance data and calculated energy
          consumption values, we utilize Firebase Firestore cloud database.
          Firestore&apos;s real-time synchronization and scalability ensure
          that data is stored reliably and can be accessed across different
          devices seamlessly.
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <h2>Calculation Formulas and Algorithms:</h2>
        <p>
          Power Consumption Calculation: The energy consumption of each
          appliance is calculated using the formula: Power Consumption (in
          kWh) = (Wattage x Hours of Use x Number of Appliances) / 1000. This formula converts the
          wattage to kilowatts and multiplies it by the hours of use to
          determine the energy consumed by the appliance in kilowatt-hours.
        </p>
        <p>
          Total Energy Consumption: The total energy consumption is derived by
          summing up the energy consumption of all appliances. This is
          achieved by iterating through the list of appliances and summing
          their individual energy consumption values.
        </p>
      </Col>
      <Col md={6}>
        <h2>Data Visualization</h2>
        <p>
          Graphing Libraries: To create dynamic and interactive graphs that
          visualize energy consumption patterns, we utilize JavaScript
          graphing libraries such as Chart.js or Plotly. These libraries
          enable us to generate various types of graphs, such as line charts
          or bar charts, showcasing consumption trends over different time
          intervals.
        </p>
      </Col>
    </Row>
    <Row>
      <p>
        In summary, our Energy Consumption Calculator and Data Visualization
        Tool combine the power of Next.js, Bootstrap, Firebase Authentication,
        and Firestore to create a comprehensive and user-centric application.
        By incorporating accurate calculations, secure authentication,
        real-time data storage, and dynamic visualizations, we empower users
        to make informed decisions about their energy usage while contributing
        to sustainability efforts.
      </p>
    </Row>
  </Container>
    
  )
}

export default About