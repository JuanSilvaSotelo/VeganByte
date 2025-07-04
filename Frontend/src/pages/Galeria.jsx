import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Galeria.css';

// Elimina todos los imports de imágenes
const images = [
  '/galeria/287211119_459517689457054_7728815850003765981_n.jpg',
  '/galeria/290581371_737765044093009_6379696420592193604_n.jpg',
  '/galeria/290769761_585321669625575_1665863980449774742_n.jpg',
  '/galeria/290798766_605781777415307_3958096755138378342_n.jpg',
  '/galeria/290878605_1225648108262187_1402859279639007232_n.jpg',
  '/galeria/290907125_181516810904998_5234474744130610649_n.jpg',
  '/galeria/290949750_596688608484410_7908222869254588914_n.jpg',
  '/galeria/290985463_166976952524190_6893807376965964659_n.jpg',
  '/galeria/290998957_598809234905555_822376124313149353_n.jpg',
  '/galeria/291006810_3235043353430305_7715664215046297253_n.jpg',
  '/galeria/291146328_401776998577118_866798058139611707_n.jpg',
  '/galeria/291180762_176629788160966_945336706454868051_n.jpg',
  '/galeria/291368037_1062347348033703_4974540026476962448_n.jpg',
  '/galeria/291434252_3318333618396198_2950550750499218037_n.jpg',
  '/galeria/291470716_1735805593440436_9026281728466977411_n.jpg',
  '/galeria/291650323_5253685064723551_3857787111772481104_n.jpg',
  '/galeria/292750637_590535245805400_3255950909645917822_n.jpg',
  '/galeria/292752314_747018943169842_7044723108209419973_n.jpg',
  '/galeria/293107003_184394310613789_6117642676202324734_n.jpg',
  '/galeria/294464517_2067772846753407_2908694590613696801_n.jpg',
  '/galeria/295708226_427856005959928_1053434183924035123_n.jpg',
  '/galeria/296451794_1086229718965335_4059240380382672293_n.jpg',
  '/galeria/300735133_746906689940105_1024349053879475190_n.jpg',
  '/galeria/300786739_155273800446303_6886139802616957900_n.jpg',
  '/galeria/300951510_1168706300374977_3778072683639000872_n.jpg',
  '/galeria/301233269_1520528955050558_8210038299726005347_n.jpg',
  '/galeria/302415081_5763180907107626_5293367651658726887_n.jpg',
  '/galeria/307156269_1068569637169370_2292103679698798744_n.jpg',
  '/galeria/307968380_1758655504503344_3874285787410856886_n.jpg',
  '/galeria/308633910_1222389234973137_2436970278920896856_n.jpg',
  '/galeria/312070920_1832267807110410_2164770569416849624_n.jpg',
  '/galeria/312668646_449604007278505_8548673028343302881_n.jpg',
  '/galeria/312728134_415360944137090_3503423339622454835_n.jpg',
  '/galeria/316488351_1099866107388748_3370292562967568939_n.jpg',
  '/galeria/317408779_672368614532751_542219541297112850_n.jpg',
  '/galeria/317664035_3024564991169984_6007632985932712136_n.jpg',
  '/galeria/321862499_547131870716648_206350089312867089_n.jpg',
  '/galeria/322977678_696097645570133_8016587929218876784_n.jpg',
  '/galeria/325623101_1707076853023221_6425589741555034791_n.jpg',
  '/galeria/334370233_1303540456895802_1553380661993962605_n.jpg',
  '/galeria/334853070_2449982251834503_2163165797097684794_n.jpg',
  '/galeria/340487178_549571560616109_2824875161564844632_n.jpg',
  '/galeria/343419899_2418133221697558_1202445449110550937_n.jpg',
  '/galeria/345218082_965723791234482_7972012145758923869_n.jpg',
  '/galeria/351715128_960495178432650_8546438492190842180_n.jpg',
  '/galeria/358490103_17916111968772044_4955026508404928872_n.jpg',
  '/galeria/367739417_17921393102772044_8563820338520038877_n.jpg',
  '/galeria/384153385_200276279744035_7961095203918573849_n.jpg',
  '/galeria/386523800_18387045133011284_4312732846935186179_n.jpg',
  '/galeria/396232246_17933248595772044_2949961725918089426_n.jpg',
  '/galeria/416076848_857314106191507_7697367658203162826_n.jpg',
  '/galeria/417607940_1065465081363427_2654722207077718541_n.jpg',
  '/galeria/419713147_18416858857016823_1893703761344526634_n.jpg',
  '/galeria/419836840_2026663227708991_6631344704710515970_n.jpg',
  // ... agrega el resto de rutas si es necesario
];

const Galeria = () => {
  const [mainImage, setMainImage] = useState(images[0]);
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
            {images.map((thumb, index) => (
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