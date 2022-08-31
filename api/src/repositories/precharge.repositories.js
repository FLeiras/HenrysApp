const {
  Newsletter,
  Ingredient,
  Burger,
  Fries,
  Beverage,
  Combo,
  User,
  BurgerBase,
  Coupon,
} = require("../models");
const bcrypt = require("bcrypt");

const { addDataDB } = require("../utils/addDataDB");

async function precharge() {
  try {
    const data = addDataDB();

    if (!data) return;

    if (data.ingredients.length) {
      await Ingredient.bulkCreate(data.ingredients, {
        ignoreDuplicates: true,
      });
    }

    if (data.burgers.length) {
      for (const burger of data.burgers) {
        const find = await Burger.findByPk(burger.id, { paranoid: false });
        if (!find) {
          const newBurger = await Burger.create(burger);
          await newBurger.addIngredient(burger.ingredients);
        }
      }
    }

    if (data.fries.length) {
      await Fries.bulkCreate(data.fries, {
        ignoreDuplicates: true,
      });
    }

    if (data.beverages.length) {
      await Beverage.bulkCreate(data.beverages, {
        ignoreDuplicates: true,
      });
    }

    if (data.combos.length) {
      for (const combo of data.combos) {
        const find = await Combo.findByPk(combo.id, { paranoid: false });
        if (!find) {
          const newCombo = await Combo.create(combo);
          await newCombo.addBeverage(combo.beverages);
          await newCombo.addFries(combo.fries);
          await newCombo.addBurger(combo.burgers);
        }
      }
    }

    await User.bulkCreate(
      [
        {
          id: "dbaf0142-48ec-4900-8694-1d8eb4080c39",
          firstName: "Henry",
          lastName: "Burger",
          email: "henrysburgers@admin.com",
          password: await bcrypt.hash("admin@", 10),
          role: "admin",
          isConfirmed: true,
        },
        {
          id: "9d70e6a6-bc63-46aa-9a4c-22c540a565fd",
          firstName: "Juan",
          lastName: "Burger",
          email: "juan@gmail.com",
          password: await bcrypt.hash("22", 10),
          role: "employee",
          isConfirmed: true,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );

    await BurgerBase.bulkCreate(
      [
        {
          name: "Base",
          price: 250,
          imgUri:
            "https://res.cloudinary.com/henrysburgers/image/upload/v1659368855/Hamburguesas/Hamburguesa-con-Queso_nhyhcd.png",
          description: "Incluye pan y 1 medallón de carne",
        },
        {
          name: "Base vegetariana",
          price: 370,
          isVeggie: true,
          imgUri:
            "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/King-de-vegetal_ljh5ot.png",
          description: "Incluye pan con sésamo y 1 medallón vegetal",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );

    await Coupon.bulkCreate(
      [
        {
          code: "XLXR567",
          title: "Fries Day",
          expirationDate: "2023-04-21",
          imgUri:
            "https://res.cloudinary.com/henrysburgers/image/upload/v1659368859/Hamburguesas/PAPAS-KING_dknxtf.png",
          discountPorcentage: 15,
          productsId: [
            "f3a181c0-1f95-4788-bbb4-fd38d4c6634a",
            "7e33e6b9-23bb-464b-8d61-2c7dd869b569",
            "43dd3750-1ee6-489f-baeb-b7431eba6ae7",
            "08f6fa50-90b8-4f23-acc3-4572b833f71c",
            "563e6890-1bee-43cd-8ec7-f4ef37b7c2fd",
            "1b1261d0-22f9-4164-b6c2-3aef28f94ed7",
            "f456331d-5058-4a78-bb3b-97daa0c9daa4",
            "9bb64175-7658-4874-896c-8feec9557ead",
            "645e2ac4-c4b3-4e2b-9479-304e6b5d0c95",
          ],
        },
        {
          code: "RTTAS87",
          title: "Bacon Day",
          expirationDate: "2022-08-04",
          imgUri:
            "https://res.cloudinary.com/henrysburgers/image/upload/v1659368860/Hamburguesas/Stacker-Triple_viitjb.png",
          discountPorcentage: 20,
          productsId: [
            "1ff1a612-2b75-47ad-a3dd-cd0fe0797967",
            "2f6f03da-41b4-4f0d-abcb-18b48cb98025",
            "43dd3750-1ee6-489f-baeb-b7431eba6ae7",
            "1b1261d0-22f9-4164-b6c2-3aef28f94ed7",
            "645e2ac4-c4b3-4e2b-9479-304e6b5d0c95",
          ],
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );

    console.log("models precharged successfully!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  precharge,
};
