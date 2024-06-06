import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const ShuffleHero = () => {
  return (
    <div className=" herooo 800px:min-h-[70vh] pt-16 800px:pt-0  flex items-center z-10 justify-center" style={{
        // backgroundImage:
        //   "url(https://images.wallpaperscraft.com/image/single/skyscrapers_buildings_sky_196848_1920x1080.jpg)",
      }}>

    <section className="w-full px-8 md:px-20  md:rounded-2xl  md:py-16 pt-8  grid grid-cols-1  md:grid-cols-2 items-center md:gap-24 gap-12 max-w-8xl mx-auto">
      <div>
        {/* <span className="block mb-4 text-xs md:text-sm text-[#010101] font-medium">
        Your Trusted Marketplace 
        </span> */}
        <h3 className="text-6xl md:text-6xl font-medium multicolor-text">
    Odua Market is online 24/7!
</h3>
<p className="text-xl md:text-lg text-white my-8 md:my-8 font-light">
Experience the convenience and joy of shopping on a decentralized platform that connects you with sellers from around Nigeria.
</p>

        <button className="bg-[#fff]   w-full text-[#010101]  font-bold text-lg mt-8 py-4 px-14 rounded-btn transition-all hover:opacity-90  active:scale-95">
          <span className="multicolor-text">

          Shop Now <BsArrowRight size={20} className=" ml-1 inline" />
          </span>
        </button>
      </div>
      {/* <img src={require("../../../Assests/heroimg.png")} alt="" /> */}
      <ShuffleGrid />
    </section>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://churchlifejournal.nd.edu/assets/319325/1200x/queen_mother_pendant_mask_iyoba_met_dp231460.jpg",
  },
  {
    id: 2,
    src: "https://media.cnn.com/api/v1/images/stellar/prod/161111151825-wodaabe-tribe-gerewol.jpg?q=w_2282,h_1352,x_0,y_0,c_fill",
  },
  {
    id: 3,
    src: "https://i.etsystatic.com/18339637/r/il/22ccd7/2763307076/il_570xN.2763307076_3ui7.jpg",
  },
  {
    id: 4,
    src: "https://d2g6byanrj0o4m.cloudfront.net/images/41292/ndebele_women.jpg",
  },
  {
    id: 5,
    src: "https://www.shutterstock.com/image-photo/africa-kenya-sumburu-november-8portrait-260nw-61219819.jpg",
  },
  {
    id: 6,
    src: "https://static8.depositphotos.com/1377527/936/i/450/depositphotos_9366405-stock-photo-woman-dressed-in-african-costume.jpg",
  },
  {
    id: 7,
    src: "https://www.acts29.com/wp-content/uploads/2021/07/ATR-Image.jpeg",
  },
  {
    id: 8,
    src: "https://www.shutterstock.com/shutterstock/videos/1061861848/thumb/1.jpg?ip=x480",
  },
  {
    id: 9,
    src: "https://miro.medium.com/v2/resize:fit:735/1*RNDYMy2ehsopyS85uSSjhw.jpeg",
  },
  {
    id: 10,
    src: "https://i.pinimg.com/736x/c7/5f/11/c75f118617da021d3510dc4e4c87e52d.jpg",
  },
  {
    id: 11,
    src: "https://designafrika.co.za/wp-content/uploads/2020/07/DA_SECTIONtop_Traditional.jpg",
  },
  {
    id: 12,
    src: "https://i.pinimg.com/originals/a2/92/8c/a2928ce8c517bce867b8c8bb000e19dd.jpg",
  },
  {
    id: 13,
    src: "https://cdn.shopify.com/s/files/1/1492/9060/files/Baba_Tree_TEAM_480x480.png?v=1646310979",
  },
  {
    id: 14,
    src: "https://lirp.cdn-website.com/f8b455ba/dms3rep/multi/opt/most_popular_types_of_traditional_african_jewelry-640w.jpg",
  },
  {
    id: 15,
    src: "https://www.africablooms.com/wp-content/uploads/2019/07/Nigerian-Wedding-Traditional-Dress-Wine-Nigerian-wedding-outfit-Shop-Africa-Blooms-1g-e1562211163857.jpg",
  },
  {
    id: 16,
    src: "https://images.squarespace-cdn.com/content/v1/577bc3e5cd0f68c0f253247c/1509637411519-LHFA5ZXSAMASUKGRT3JJ/A1.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full  "
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 z-0">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;