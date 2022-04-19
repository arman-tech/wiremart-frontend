const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("api-server/db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4001;
var db = require("./db.json");

server.use(jsonServer.bodyParser);
server.use(middlewares);

const isValidPost = (req, res) => {
  if (req.method !== "POST") {
    res.status(400).jsonp({ error: "Your request is not a POST" });
    return false;
  }

  return true;
};

const isValidateUserName = (userName, res) => {
  if (userName === undefined || userName === null) {
    res.status(400).jsonp({ error: "user name not found in request." });
    return false;
  }

  return true;
};

const isValidEmail = (email, res) => {
  if (email === undefined || email === null) {
    res.status(400).jsonp({ error: "user name not found in request." });
    return false;
  }

  return true;
};

const isValidateUser = (userId, res) => {
  if (userId === undefined || userId === null) {
    res.status(400).jsonp({ error: "userId not found in request." });
    return false;
  }

  return true;
};

const isValidCartItems = (cartItems, res) => {
  if (cartItems === undefined || cartItems === null) {
    res.status(400).jsonp({ error: "cartItems not found in request." });
    return false;
  }

  return true;
};

const isValidProductItems = (cartItems, res) => {
  let errFound = 0;
  let errMsg = "following product ids were not found: [";
  for (var i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const index = db.products.findIndex((c) => c.id === item.productId);
    // create an error message if an item is not found.
    if (index === -1) {
      errMsg += item.productId + ", ";
      errFound += 1;
    }
  }

  errMsg += "]";

  if (errFound > 0) {
    res.status(400).jsonp({ error: errMsg });
    return false;
  }

  return true;
};

const calculateCartSummary = (cartItems, stateTax) => {
  // get all products
  let shippingCost = 0.0;
  let subTotal = 0.0;

  for (var i = 0; i < cartItems.length; i++) {
    // find the index of product.
    const item = cartItems[i];
    const index = db.products.findIndex((c) => c.id === item.productId);
    const prodDetail = db.products[index];

    // shipping cost  = product shipping cost * item qty
    shippingCost += prodDetail.shippingCost * item.qty;
    subTotal += prodDetail.price * item.qty;
  }

  return {
    subTotal: subTotal,
    shippingCost: shippingCost,
    tax: (subTotal + shippingCost) * stateTax.value,
    total: (subTotal + shippingCost) * (1 + stateTax.value),
  };
};

server.post("/post/cartItems", (req, res) => {
  if (!isValidPost(req, res)) {
    return;
  }

  const userId = req.body["userId"];
  const cartItems = req.body["cartItems"];

  if (!isValidateUser(userId, res)) {
    return;
  }

  if (!isValidCartItems(cartItems, res)) {
    return;
  }

  // get user based off of user id.
  const user = db.users.find((users) => {
    return users.id === userId;
  });

  if (user === undefined) {
    res.status(400).jsonp({ error: "user " + userId + " could not be found." });
    return;
  }

  // get state tax
  const stateTax = db.taxes.find((tax) => {
    return tax.byState === user.state;
  });

  if (stateTax === undefined) {
    res
      .status(400)
      .jsonp({ error: "tax could not be found for user " + userId + "." });
    return;
  }

  // validate product items in cart items;
  if (!isValidProductItems(cartItems, res)) {
    return;
  }

  // calculate cart summary.
  const cartSummary = calculateCartSummary(cartItems, stateTax);

  res.status(200).jsonp({ cartSummary: cartSummary });
});

server.post("/post/completeOrder", (req, res) => {
  if (!isValidPost(req, res)) {
    return;
  }

  const userId = req.body["userId"];
  const cartItems = req.body["cartItems"];

  if (!isValidateUser(userId, res)) {
    return;
  }

  if (!isValidCartItems(cartItems, res)) {
    return;
  }
  // if <b>calculation of order is correct</b>, and all the items are <b>available</b> to be purchased.

  res.status(200).jsonp({ result: true });
});


// Sign-In: this is a fake sign-in process.  If the user name exists then authenticate the user.
server.post("/post/signin", (req, res) => {
  if (!isValidPost(req, res)) {
    return;
  }

  const email = req.body["email"];

  if (!isValidEmail(email, res)) {
    return;
  }

  // attempt to find email.
  const index = db.users.findIndex((c) => c.email === email);

  // if email is not found then return error message
  if (index === -1) {
    res.status(400).jsonp({ error: "email " + email + " could not be found." });
    return;
  }

  res.status(200).jsonp(db.users[index]);
});

server.use(router);
server.listen(port);
