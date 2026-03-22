const productData = [
  {
    id: 1,
    name: "Adidas Trefoil Tee Black",
    brand: "Adidas",
    category: "Shirts",
    price: 425,
    condition: "Excellent",
    size: "Medium",
    desc: "A classic Adidas shirt featuring the iconic Trefoil logo on the front. The print remains clear, with only slight fading that adds subtle character. It is comfortable, easy to style, and works well as a staple piece in any casual wardrobe.",
    img: "assets/item-ATTB.jpg"
  },

  {
    id: 2,
    name: "Adidas Samba OG Black White Gum",
    brand: "Adidas",
    category: "Shoes",
    price: 1600,
    condition: "Excellent",
    size: "US 9",
    desc: "The Adidas Samba OG is a timeless sneaker known for its clean and versatile design. This pair features a smooth leather upper with suede overlays and a durable gum sole. It shows only light signs of use and remains in very good condition. It pairs easily with jeans, shorts, or relaxed fits, making it a reliable everyday option.",
    img: "assets/item-ASOBWG.jpg"
  },

  {
    id: 3,
    name: "Adidas Classic Backpack",
    brand: "Adidas",
    category: "Accessories",
    price: 750,
    condition: "Like New",
    size: "Standard",
    desc: "Spacious Adidas backpack with multiple compartments for organization. Ideal for school, travel, or daily use.",
    img: "assets/item-ACB.jpg"
  },

  {
    id: 4,
    name: "Nike Dunk Low Syracuse",
    brand: "Nike",
    category: "Shoes",
    price: 2250,
    condition: "Excellent",
    size: "US 9.5",
    desc: "This Nike Dunk Low in the Syracuse colorway features a bright orange and white combination that stands out while still being easy to style. The leather upper remains soft and well preserved, with only light creasing from normal wear. The outsole shows minimal drag, and overall the pair has been well maintained. It is a solid choice for both casual outfits and streetwear looks.",
    img: "assets/item-NDLSPS.jpg"
  },

  {
    id: 5,
    name: "Adidas Essentials Joggers Grey",
    brand: "Adidas",
    category: "Pants",
    price: 550,
    condition: "Like New",
    size: "Large",
    desc: "These Adidas joggers feature the signature three stripe design and a comfortable fit. The fabric feels soft and durable, making them ideal for lounging or everyday wear.",
    img: "assets/item-AEJG.jpg"
  },

  {
    id: 6,
    name: "Vans Old Skool Black White",
    brand: "Vans",
    category: "Shoes",
    price: 1100,
    condition: "Very Good",
    size: "US 10",
    desc: "The Vans Old Skool is a staple sneaker with its signature side stripe and durable construction. This pair features a mix of suede and canvas, offering both comfort and durability. There are light signs of wear on the sole, but it still has plenty of life left and remains a solid everyday shoe.",
    img: "assets/item-VOSBW.jpg"
  },

  {
    id: 7,
    name: "Vans Coaches Jacket Black",
    brand: "Vans",
    category: "Jackets",
    price: 1000,
    condition: "Very Good",
    size: "Medium",
    desc: "A lightweight Vans coaches jacket with snap button closure. It is easy to layer and works well with casual streetwear outfits.",
    img: "assets/item-VCJB.jpg"
  },

  {
    id: 8,
    name: "Puma Suede Classic Navy",
    brand: "Puma",
    category: "Shoes",
    price: 1250,
    condition: "Very Good",
    size: "US 8.5",
    desc: "This Puma Suede Classic offers a vintage look with its soft navy suede upper and clean white accents. The material shows light wear that adds character without affecting the overall appearance. It remains comfortable and durable, making it a great option for everyday casual wear with a retro vibe.",
    img: "assets/item-PSCN.jpg"
  },

  {
    id: 9,
    name: "Levi's 501 Original Jeans",
    brand: "Levi's",
    category: "Pants",
    price: 1000,
    condition: "Worn In",
    size: "W32",
    desc: "These Levi's 501 jeans feature a classic straight fit with a natural vintage fade developed over time. The worn in look adds character while maintaining durability. A timeless denim piece that pairs well with almost any outfit.",
    img: "assets/item-L501OJ.jpg"
  },

  {
    id: 10,
    name: "Nike Oversized Tee White",
    brand: "Nike",
    category: "Shirts",
    price: 450,
    condition: "Like New",
    size: "Large",
    desc: "This oversized Nike shirt offers a relaxed fit that drapes comfortably on the body. The fabric is soft, breathable, and suitable for all day wear. Its minimal design makes it easy to pair with different outfits, whether you are going for a clean or layered look.",
    img: "assets/item-NOTW.jpg"
  },

  {
    id: 11,
    name: "Nike Windrunner Jacket Black",
    brand: "Nike",
    category: "Jackets",
    price: 1250,
    condition: "Excellent",
    size: "Medium",
    desc: "A lightweight Nike windbreaker with a clean and simple design. It offers protection against light wind and adds a sporty touch to any outfit.",
    img: "assets/item-NWJB.jpg"
  },

  {
    id: 12,
    name: "Vans Off The Wall Tee White",
    brand: "Vans",
    category: "Shirts",
    price: 375,
    condition: "Good",
    size: "Medium",
    desc: "A simple Vans shirt with the Off The Wall logo. It has a slightly worn in feel that adds to its casual appeal. The material is still soft and comfortable, making it great for everyday use.",
    img: "assets/item-VOTWTW.jpg"
  },

  {
    id: 13,
    name: "Converse Knit Beanie",
    brand: "Converse",
    category: "Accessories",
    price: 250,
    condition: "Brand New",
    size: "Free Size",
    desc: "Soft knit Converse beanie with a minimal logo design. Comfortable and perfect for adding a subtle touch to your outfit.",
    img: "assets/item-CKB.jpg"
  },

  {
    id: 14,
    name: "Converse Chuck 70 High Black",
    brand: "Converse",
    category: "Shoes",
    price: 1400,
    condition: "Excellent",
    size: "US 9",
    desc: "An upgraded take on the classic Chuck Taylor, this Chuck 70 features thicker canvas, improved cushioning, and a more premium build. The pair is in very clean condition with minimal signs of use. It works effortlessly with almost any outfit, from casual streetwear to simple everyday fits.",
    img: "assets/item-CC70HB.jpg"
  },

  {
    id: 15,
    name: "Nike Dri Fit Track Pants",
    brand: "Nike",
    category: "Pants",
    price: 600,
    condition: "Excellent",
    size: "Medium",
    desc: "Lightweight Nike track pants designed with a tapered fit for a clean and modern look. The breathable material makes them comfortable for both active use and casual wear.",
    img: "assets/item-NDFTP.jpg"
  },

  {
    id: 16,
    name: "Puma Graphic Tee",
    brand: "Puma",
    category: "Shirts",
    price: 350,
    condition: "Very Good",
    size: "Large",
    desc: "This Puma graphic tee features a casual athletic design that fits well into everyday outfits. The print shows minor wear but still looks presentable. The fabric remains soft and comfortable, making it a practical and stylish option.",
    img: "assets/item-PGT.jpg"
  },

  {
    id: 17,
    name: "Adidas Firebird Track Jacket",
    brand: "Adidas",
    category: "Jackets",
    price: 1100,
    condition: "Good",
    size: "Large",
    desc: "Classic Adidas track jacket with signature stripe detailing. It has a slightly worn look that adds character while still being stylish and functional.",
    img: "assets/item-AFTJ.jpg"
  },

  {
    id: 18,
    name: "Puma Sling Bag",
    brand: "Puma",
    category: "Accessories",
    price: 450,
    condition: "Good",
    size: "Small",
    desc: "Compact Puma sling bag designed for carrying daily essentials. Lightweight and easy to style with streetwear outfits.",
    img: "assets/item-PS-bag.jpg"
  },

  {
    id: 19,
    name: "Puma Sweatpants Black",
    brand: "Puma",
    category: "Pants",
    price: 500,
    condition: "Good",
    size: "Medium",
    desc: "Relaxed fit Puma sweatpants that provide comfort and flexibility. They show some signs of wear but remain functional and comfortable for daily use.",
    img: "assets/item-PSB.jpg"
  },

  {
    id: 20,
    name: "Nike Heritage Cap",
    brand: "Nike",
    category: "Accessories",
    price: 300,
    condition: "Brand New",
    size: "Free Size",
    desc: "Adjustable Nike cap with an embroidered swoosh logo. Simple, clean, and perfect for everyday wear.",
    img: "assets/item-NHC.jpg"
  }
];