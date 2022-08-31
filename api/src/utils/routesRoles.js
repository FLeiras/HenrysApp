const authRoute = (routeRoles, myRole) => {
  const allow = routeRoles.find((role) => role === myRole);

  if (allow) return true;
  return false;
};

const beverageRoles = ["admin"];
const burgerRoles = ["admin"];
const burgerBaseRoles = ["admin"];
const comboRoles = ["admin"];
const friesRoles = ["admin"];
const ingredientRoles = ["admin"];
const newsletterRoles = ["admin"];
const usersRoles = ["admin"];

module.exports = {
  authRoute,
  beverageRoles,
  burgerRoles,
  burgerBaseRoles,
  comboRoles,
  friesRoles,
  ingredientRoles,
  newsletterRoles,
  usersRoles,
};
