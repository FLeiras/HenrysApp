const burgerRepository = require("../repositories/burger.repositories");
const comboRepository = require("../repositories/combo.repositories");
const friesRepository = require("../repositories/fries.repositories");
const beverageRepository = require("../repositories/beverage.repositories");
const productRepository = require("../repositories/product.repositories");
const burgerBaseRepository = require("../repositories/burgerBase.repositories");
const ingredientRepository = require("../repositories/ingredient.repositories");
const utils = require("../utils/utils");

async function getById(req, res, next) {
    
    try {
        const {id} = req.params;
        const find = await productRepository.getById(id);    
        
        if(!find){            
            return res.status(404).json({error: "Producto no encontrado!"});
        }
        
        return res.status(200).json(find);
    } catch (error) {
      next(error);
    }
}

async function getByQuery(req, res, next) {
    
  try {
    const category = req.query.category ? req.query.category.toLowerCase() : req.query.category;
    const name = req.query.name ? req.query.name.toLowerCase() : req.query.name;
    const isVeggie = req.query.isVeggie ? req.query.isVeggie.toLowerCase() : req.query.isVeggie;
    const order = req.query.order ? req.query.order.toLowerCase() : req.query.order;
    const isDeleted = req.query.isDeleted ? "true" : "false";
    const addBase = req.query.addBase ? "true" : "false";
    const addIngredient = req.query.addIngredient ? "true" : "false";
    const filters = utils.setFilters({isVeggie, name, isDeleted});
    let products = [];

    if(!category){
        const all = await productRepository.getByQuery(filters, addBase, addIngredient);     
        products = [...all];
    }    
    else if(category === "burgers"){
        const burgers = await burgerRepository.getByQuery(filters);
        products = [...burgers]; 
    }
    else if(category === "combos"){
        const combos = await comboRepository.getByQuery(filters);
        products = [...combos]; 
    }
    else if(category === "fries"){
        const fries = await friesRepository.getByQuery(filters);
        products = [...fries]; 
    }
    else if(category === "beverages"){
        const beverages = await beverageRepository.getByQuery(filters);
        products = [...beverages];
    }
    else if(category === "veggie"){
        const all = await productRepository.getByQuery(filters);
        products = [...all];
    }
    else if(category === "burgerbase"){
        const burgerBase = await burgerBaseRepository.getByQuery(filters);
        products = [...burgerBase];
    }
    else if(category === "ingredient"){
        const ingredient = await ingredientRepository.getByQuery(filters);
        products = [...ingredient];
    }

        if(order){
            products = utils.sort(order, products, "price");
        }
       
    return res.status(200).json(products);
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getByQuery,
    getById
};
