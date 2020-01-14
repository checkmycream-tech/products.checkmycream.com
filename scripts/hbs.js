const fs = require('fs');
const handlebars = require('handlebars');

const hbs = {
    render(data, name) {
        const template = fs.readFileSync(`./${name}.hbs`).toString();
        console.log({ template });
        return handlebars.compile(template)(Object.assign( {}, data));
    },
};

module.exports = hbs;
