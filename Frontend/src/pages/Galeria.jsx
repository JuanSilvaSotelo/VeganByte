import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Galeria.css';

// Import images
import img1 from '../assets/galeria/287211119_459517689457054_7728815850003765981_n.jpg';
import img2 from '../assets/galeria/290581371_737765044093009_6379696420592193604_n.jpg';
import img3 from '../assets/galeria/290769761_585321669625575_1665863980449774742_n.jpg';
import img4 from '../assets/galeria/290798766_605781777415307_3958096755138378342_n.jpg';
import img5 from '../assets/galeria/290878605_1225648108262187_1402859279639007232_n.jpg';
import img6 from '../assets/galeria/290907125_181516810904998_5234474744130610649_n.jpg';
import img7 from '../assets/galeria/290949750_596688608484410_7908222869254588914_n.jpg';
import img8 from '../assets/galeria/290985463_166976952524190_6893807376965964659_n.jpg';
import img9 from '../assets/galeria/290998957_598809234905555_822376124313149353_n.jpg';
import img10 from '../assets/galeria/291006810_3235043353430305_7715664215046297253_n.jpg';
import img11 from '../assets/galeria/291146328_401776998577118_866798058139611707_n.jpg';
import img12 from '../assets/galeria/291180762_176629788160966_945336706454868051_n.jpg';
import img13 from '../assets/galeria/291368037_1062347348033703_4974540026476962448_n.jpg';
import img14 from '../assets/galeria/291434252_3318333618396198_2950550750499218037_n.jpg';
import img15 from '../assets/galeria/291470716_1735805593440436_9026281728466977411_n.jpg';
import img16 from '../assets/galeria/291650323_5253685064723551_3857787111772481104_n.jpg';
import img17 from '../assets/galeria/292750637_590535245805400_3255950909645917822_n.jpg';
import img18 from '../assets/galeria/292752314_747018943169842_7044723108209419973_n.jpg';
import img19 from '../assets/galeria/293107003_184394310613789_6117642676202324734_n.jpg';
import img20 from '../assets/galeria/294464517_2067772846753407_2908694590613696801_n.jpg';
import img21 from '../assets/galeria/295708226_427856005959928_1053434183924035123_n.jpg';
import img22 from '../assets/galeria/296451794_1086229718965335_4059240380382672293_n.jpg';
import img23 from '../assets/galeria/300735133_746906689940105_1024349053879475190_n.jpg';
import img24 from '../assets/galeria/300786739_155273800446303_6886139802616957900_n.jpg';
import img25 from '../assets/galeria/300951510_1168706300374977_3778072683639000872_n.jpg';
import img26 from '../assets/galeria/301233269_1520528955050558_8210038299726005347_n.jpg';
import img27 from '../assets/galeria/302415081_5763180907107626_5293367651658726887_n.jpg';
import img28 from '../assets/galeria/307156269_1068569637169370_2292103679698798744_n.jpg';
import img29 from '../assets/galeria/307968380_1758655504503344_3874285787410856886_n.jpg';
import img30 from '../assets/galeria/308633910_1222389234973137_2436970278920896856_n.jpg';
import img31 from '../assets/galeria/312070920_1832267807110410_2164770569416849624_n.jpg';
import img32 from '../assets/galeria/312668646_449604007278505_8548673028343302881_n.jpg';
import img33 from '../assets/galeria/312728134_415360944137090_3503423339622454835_n.jpg';
import img34 from '../assets/galeria/316488351_1099866107388748_3370292562967568939_n.jpg';
import img35 from '../assets/galeria/317408779_672368614532751_542219541297112850_n.jpg';
import img36 from '../assets/galeria/317664035_3024564991169984_6007632985932712136_n.jpg';
import img37 from '../assets/galeria/321862499_547131870716648_206350089312867089_n.jpg';
import img38 from '../assets/galeria/322977678_696097645570133_8016587929218876784_n.jpg';
import img39 from '../assets/galeria/325623101_1707076853023221_6425589741555034791_n.jpg';
import img40 from '../assets/galeria/334370233_1303540456895802_1553380661993962605_n.jpg';
import img41 from '../assets/galeria/334853070_2449982251834503_2163165797097684794_n.jpg';
import img42 from '../assets/galeria/340487178_549571560616109_2824875161564844632_n.jpg';
import img43 from '../assets/galeria/343419899_2418133221697558_1202445449110550937_n.jpg';
import img44 from '../assets/galeria/345218082_965723791234482_7972012145758923869_n.jpg';
import img45 from '../assets/galeria/351715128_960495178432650_8546438492190842180_n.jpg';
import img46 from '../assets/galeria/358490103_17916111968772044_4955026508404928872_n.jpg';
import img47 from '../assets/galeria/367739417_17921393102772044_8563820338520038877_n.jpg';
import img48 from '../assets/galeria/384153385_200276279744035_7961095203918573849_n.jpg';
import img49 from '../assets/galeria/386523800_18387045133011284_4312732846935186179_n.jpg';
import img50 from '../assets/galeria/396232246_17933248595772044_2949961725918089426_n.jpg';
import img51 from '../assets/galeria/416076848_857314106191507_7697367658203162826_n.jpg';
import img52 from '../assets/galeria/417607940_1065465081363427_2654722207077718541_n.jpg';
import img53 from '../assets/galeria/419713147_18416858857016823_1893703761344526634_n.jpg';
import img54 from '../assets/galeria/419836840_2026663227708991_6631344704710515970_n.jpg';
import img55 from '../assets/galeria/419914863_911224967392686_2900622674869794362_n.jpg';
import img56 from '../assets/galeria/422080427_257456047371783_3303582409564643867_n.jpg';
import img57 from '../assets/galeria/425589557_763568945217005_4929214841113770417_n.jpg';
import img58 from '../assets/galeria/425723409_18413819515035844_228841366991598422_n.jpg';
import img59 from '../assets/galeria/Mejores-8-aplicaciones-gratuitas-para-hacer-senderismo-y-planificar-rutas-2.jpeg';

const Galeria = () => {
  const thumbnails = [
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12,
    img13, img14, img15, img16, img17, img18,
    img19, img20, img21, img22, img23, img24,
    img25, img26, img27, img28, img29, img30,
    img31, img32, img33, img34, img35, img36,
    img37, img38, img39, img40, img41, img42,
    img43, img44, img45, img46, img47, img48,
    img49, img50, img51, img52, img53, img54,
    img55, img56, img57, img58, img59,
  ];

  const [mainImage, setMainImage] = useState(thumbnails[0]);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="galeria-page">
      <Header />
      <div className="galeria-content">
        <h1 className="galeria-title">Galería</h1>
        <div className="main-gallery-container">
          <img src={mainImage} alt="Main Gallery" className="main-gallery-image" />
        </div>
        <div className="thumbnail-carousel" ref={carouselRef}>
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
          <div className="thumbnail-carousel-inner">
            {thumbnails.map((thumb, index) => (
              <div
                className="thumbnail-item"
                key={index}
                onClick={() => handleThumbnailClick(thumb)}
              >
                <img src={thumb} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Galeria;