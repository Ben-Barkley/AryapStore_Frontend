// // components/HeroCarousel.js
// import { Carousel } from "react-bootstrap";
// import Image from "next/image";

// export default function HeroCarousel() {
//   const heroImages = [
//     "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//   ];

//   return (
//     <Carousel className="mb-4">
//       {heroImages.map((image, index) => (
//         <Carousel.Item key={index}>
//           <div style={{ height: "400px", position: "relative" }}>
//             <Image
//               src={image}
//               alt={`Hero Image ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded"
//             />
//           </div>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// components/HeroCarousel.js
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import clothing1 from "../../public/clothing1.jpeg";
import shoe1 from "../../public/shoe1.png";
import watch1 from "../../public/watch1.png";

export default function HeroCarousel() {
  const heroImages = [clothing1, shoe1, watch1];

  return (
    <Carousel className="mb-4">
      {heroImages.map((image, index) => (
        <Carousel.Item key={index}>
          <div style={{ height: "400px", position: "relative" }}>
            <Image
              src={image}
              alt={`Hero Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
