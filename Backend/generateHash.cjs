const bcrypt = require('bcrypt');

const password = '12345678'; // La contraseña que quieres hashear
const saltRounds = 10; // El número de rondas de sal, usa el mismo que tu aplicación

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Hash de la contraseña:', hash);
});