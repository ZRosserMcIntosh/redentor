const bcrypt = require('bcrypt');

const password = "123456789";
const hash = "$2b$10$wZKjdfAyGo2B2VOUw5FHYufyoNqOcVBNx1RxkPZkLCPt/C/9gmAhG";

bcrypt.compare(password, hash).then(isValid => {
  console.log("Manual password test:", isValid); // Should print: true
});

