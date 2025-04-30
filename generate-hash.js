const bcrypt = require('bcrypt');

const password = "123456789";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Generated hash:", hash);
});
