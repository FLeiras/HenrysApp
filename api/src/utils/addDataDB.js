function addDataDB() {
  const ingredients = [
    {
      name: "Mayonesa",
      price: 30,
      isRepeat: false,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148971/ingredientes/mayonesa_vz13y6.png",
    },
    {
      name: "Mostaza",
      price: 35,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148971/ingredientes/mostaza_tebarl.png",
    },
    {
      name: "Ketchup",
      price: 40,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148969/ingredientes/ketchup_ewhgl6.png",
    },
    {
      name: "Tomate",
      price: 90,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148971/ingredientes/tomate_swr9n3.png",
    },
    {
      name: "Lechuga",
      price: 70,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148970/ingredientes/lechuga_ecpcdd.png",
    },
    {
      name: "Cebolla",
      price: 45,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148969/ingredientes/cebolla_nv13lg.png",
    },
    {
      name: "Chedar",
      price: 110,
      isRepeat: true,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148970/ingredientes/cheddar_dt12zq.png",
    },
    {
      name: "Morrón",
      price: 120,
      isRepeat: false,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148972/ingredientes/morron_o36ant.png",
    },
    {
      name: "Bacon",
      price: 120,
      isRepeat: true,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148969/ingredientes/bacon_grqyyd.png",
    },
    {
      name: "Medallón de carne",
      price: 190,
      isRepeat: true,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148970/ingredientes/medallondecarne_uyc4hz.png",
    },
    {
      name: "Medallón vegetal",
      price: 110,
      isRepeat: true,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660148971/ingredientes/medallonvegetal_odveao.png",
    },
    {
      name: "Jamón",
      price: 70,
      isRepeat: false,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660176516/ingredientes/jamon_dz0lvh.png",
    },
  ];

  const burgers = [
    {
      id: "30046cf2-85ba-48e9-bcde-cb51c0fe3fa8",
      name: "Whopper Doble",
      price: 950,
      isVeggie: false,
      ingredients: [2, 4, 5, 6, 10],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368861/Hamburguesas/whopper-doble_qxp7af.png",
    },
    {
      id: "9ff3ad73-b27e-4de4-ae91-2e54068398ac",
      name: "Whopper Vegetal",
      price: 970,
      isVeggie: true,
      ingredients: [1, 3, 6, 5, 11],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368861/Hamburguesas/WhopperVegetal_2604_k1rtdy.png",
    },
    {
      id: "9553b94c-85ef-4252-ad2f-44f96ca2296b",
      name: "Stacker Triple",
      price: 1070,
      isVeggie: false,
      ingredients: [10, 7, 9, 2, 1, 3],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368860/Hamburguesas/Stacker-Triple_viitjb.png",
    },
    {
      id: "e335faa7-10d6-49b1-844e-426033d063e3",
      name: "King Vegetal",
      price: 990,
      isVeggie: true,
      ingredients: [11, 5, 7, 1, 2],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/King-de-vegetal_ljh5ot.png",
    },
    {
      id: "ca03dd5b-9d64-42b4-81e8-fd53aa6904c6",
      name: "King de Pollo Frances",
      price: 970,
      isVeggie: false,
      ingredients: [10, 1, 2, 7, 12],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/king-de-pollo-frances_oezpta.png",
    },
    {
      id: "1ff1a612-2b75-47ad-a3dd-cd0fe0797967",
      name: "DOBLE BBQ Bacon XL",
      price: 1210,
      isVeggie: false,
      ingredients: [3, 10, 7],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/DOBLE-BBQ-Bacon-xl_ovoapa.png",
    },
    {
      id: "ed4973b0-3664-4a4b-9ccb-c5c9a05c9020",
      name: "Cuarto XL",
      price: 882,
      isVeggie: false,
      ingredients: [2, 3, 7, 6, 10],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/Cuarto-XL_phvrct.png",
    },

    {
      id: "f49d5058-505a-4128-988f-529e57bb922e",
      name: "Crispy Vegetal",
      price: 810,
      isVeggie: true,
      ingredients: [11, 8, 6, 3, 2],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/Cuarto-XL_phvrct.png",
    },

    {
      id: "34edc4b8-d942-4ff4-878c-dbb33ab7ad41",
      name: "Clásica",
      price: 700,
      isVeggie: false,
      ingredients: [1, 4, 5, 10],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368857/Hamburguesas/hamburguesa-clasica_g7jpl4.png",
    },

    {
      id: "2f6f03da-41b4-4f0d-abcb-18b48cb98025",
      name: "BBQ Bacon XL",
      price: 890,
      isVeggie: false,
      ingredients: [1, 3, 7, 9, 10],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368856/Hamburguesas/BBQ-Bacon-xl_y5y8jp.png",
    },

    {
      id: "c5c3428e-f885-47f5-af5d-d35be513d53e",
      name: "Doble Jamón y Queso XL",
      price: 890,
      isVeggie: false,
      ingredients: [1, 7, 10, 12],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368856/Hamburguesas/Doble-Jamon-y-Queso-XL_yetuv9.png",
    },

    {
      id: "21da7040-d6fe-4c7e-b5da-b895de31a438",
      name: "Doble Napolitano XL",
      price: 1100,
      isVeggie: false,
      ingredients: [1, 4, 7, 10, 12],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368855/Hamburguesas/DobleNapolitano-XL-1_snhzrl.png",
    },

    {
      id: "3b433072-2279-4138-b056-a661720b37d3",
      name: "Hamburguesa con Queso",
      price: 750,
      isVeggie: false,
      ingredients: [10, 1, 7, 3],
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368855/Hamburguesas/Hamburguesa-con-Queso_nhyhcd.png",
    },
  ];

  const fries = [
    {
      id: "f3a181c0-1f95-4788-bbb4-fd38d4c6634a",
      name: "Papas fritas (chicas)",
      price: 420,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/PAPAS-KING_dknxtf.png",
      size: "Chico",
      isVeggie: true,
    },
    {
      id: "7e33e6b9-23bb-464b-8d61-2c7dd869b569",
      name: "Papas chedar (chicas)",
      price: 430,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368860/Hamburguesas/Papas-Cheddar_s1f5ac.png",
      size: "Chico",
      isVeggie: true,
    },
    {
      id: "43dd3750-1ee6-489f-baeb-b7431eba6ae7",
      name: "Papas chedar bacon (chicas)",
      price: 520,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/Papas-Cheddar-y-Bacon_yi7xn6.png",
      size: "Chico",
      isVeggie: false,
    },

    {
      id: "08f6fa50-90b8-4f23-acc3-4572b833f71c",
      name: "Papas fritas (medianas)",
      price: 520,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/PAPAS-KING_dknxtf.png",
      size: "Mediano",
      isVeggie: true,
    },
    {
      id: "563e6890-1bee-43cd-8ec7-f4ef37b7c2fd",
      name: "Papas chedar (medianas)",
      price: 530,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368860/Hamburguesas/Papas-Cheddar_s1f5ac.png",
      size: "Mediano",
      isVeggie: true,
    },
    {
      id: "1b1261d0-22f9-4164-b6c2-3aef28f94ed7",
      name: "Papas chedar bacon (medianas)",
      price: 620,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/Papas-Cheddar-y-Bacon_yi7xn6.png",
      size: "Mediano",
      isVeggie: false,
    },

    {
      id: "f456331d-5058-4a78-bb3b-97daa0c9daa4",
      name: "Papas fritas (grandes)",
      price: 620,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/PAPAS-KING_dknxtf.png",
      size: "Grande",
      isVeggie: true,
    },
    {
      id: "9bb64175-7658-4874-896c-8feec9557ead",
      name: "Papas chedar (grandes)",
      price: 630,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368860/Hamburguesas/Papas-Cheddar_s1f5ac.png",
      size: "Grande",
      isVeggie: true,
    },
    {
      id: "645e2ac4-c4b3-4e2b-9479-304e6b5d0c95",
      name: "Papas chedar bacon (grandes)",
      price: 720,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368858/Hamburguesas/Papas-Cheddar-y-Bacon_yi7xn6.png",
      size: "Grande",
      isVeggie: false,
    },
  ];

  const beverages = [
    {
      id: "18e7bcf0-0404-4cd6-a96e-3b61f97e8f63",
      name: "Pepsi 500 ml",
      price: 170,
      size: "Chico",
      isCarbonated: true,
      isSugar: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660181086/bebidas/nuevasBebidas/pepsi_nhasup.png",
    },
    {
      id: "50448dc7-2a51-4e19-8528-33e5789ac83c",
      name: "SevenUp 500 ml",
      price: 170,
      size: "Chico",
      isCarbonated: true,
      isSugar: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660181668/bebidas/nuevasBebidas/7up_wzgdkh.png",
    },
    {
      id: "440e7d15-f910-43f2-a7b9-4b3b1fb5d689",
      name: "Paso de los Toros 500 ml",
      price: 170,
      size: "Chico",
      isCarbonated: true,
      isSugar: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660181664/bebidas/nuevasBebidas/Paso-de-los-Toros-Promelo_mgr3w3.png",
    },
    {
      id: "2bdea2e5-f994-45aa-9a23-67e44c4910ed",
      name: "Mirinda 500 ml",
      price: 170,
      size: "Chico",
      isCarbonated: true,
      isSugar: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660181662/bebidas/nuevasBebidas/mirinda_hzrftc.png",
    },
    {
      id: "9df67e4d-5a7e-429f-bcf5-8b66fdc3d795",
      name: "Bonaqua 500 ml",
      price: 200,
      size: "Chico",
      isCarbonated: false,
      isSugar: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660181666/bebidas/nuevasBebidas/Agua_kjaf9f.png",
    },
  ];

  //const combos = [];

  const combos = [
    {
      id: "98d662ca-64bc-4994-a137-432694d07ed4",
      name: "Combo 4 burgers con queso + 4 papas",
      price: 2800,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368853/combos/combo4Iguales_jjmbyc.png",
      burgers: ["3b433072-2279-4138-b056-a661720b37d3"],
      fries: ["7e33e6b9-23bb-464b-8d61-2c7dd869b569"],
      beverages: [],
    },

    {
      id: "4f8e3c46-fcef-42ab-9218-263a55526737",
      name: "Mix & Match",
      price: 2600,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368851/combos/como4-dosydos_dtl08f.png",
      burgers: ["ed4973b0-3664-4a4b-9ccb-c5c9a05c9020"],
      fries: ["f3a181c0-1f95-4788-bbb4-fd38d4c6634a"],
      beverages: [],
    },

    {
      id: "93f820c9-c616-4263-86fc-4b1d1b1c0800",
      name: "Combo Clásicas",
      price: 900,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368851/combos/combo2-dobles_ieyiul.png",
      burgers: ["34edc4b8-d942-4ff4-878c-dbb33ab7ad41"],
      fries: ["f3a181c0-1f95-4788-bbb4-fd38d4c6634a"],
      beverages: [
        "18e7bcf0-0404-4cd6-a96e-3b61f97e8f63",
        "2bdea2e5-f994-45aa-9a23-67e44c4910ed",
      ],
    },

    {
      id: "c086f2a0-2e41-4b66-82ef-b7f70378286c",
      name: "Cajita mágica con queso",
      price: 1150,
      isVeggie: false,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1659368850/combos/cajita-nuggetshamb-con-queso_xf27np.png",
      burgers: ["3b433072-2279-4138-b056-a661720b37d3"],
      fries: ["f3a181c0-1f95-4788-bbb4-fd38d4c6634a"],
      beverages: ["440e7d15-f910-43f2-a7b9-4b3b1fb5d689"],
    },

    {
      id: "a666ed45-45fd-47a8-8196-4670f4e87b60",
      name: "Combo Crispy Vegetal",
      price: 920,
      isVeggie: true,
      imgUri:
        "https://res.cloudinary.com/henrysburgers/image/upload/v1660177679/combos/Crispy-vegan_nh7lnp.png",
      burgers: ["f49d5058-505a-4128-988f-529e57bb922e"],
      fries: ["f3a181c0-1f95-4788-bbb4-fd38d4c6634a"],
      beverages: ["18e7bcf0-0404-4cd6-a96e-3b61f97e8f63"],
    },
  ];

  const data = {
    ingredients,
    burgers,
    fries,
    beverages,
    combos,
  };

  return data;
}

module.exports = {
  addDataDB,
};
