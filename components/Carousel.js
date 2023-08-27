import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function CarouselComponent() {
  return (
    <Carousel style={{width: '75%', margin: 'auto'}}>
      <Carousel.Item>
        <Image
          src="assets/3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg"
          alt="First slide"
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src="assets/bar-concept.jpg"
          alt="Second slide"
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src="assets/beautiful-shot-modern-house-kitchen.jpg"
          alt="Third slide"
          fluid
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
