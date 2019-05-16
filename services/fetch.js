const fetch = require('node-fetch');

async function get(url) {
    const res = await fetch(url);
    return await res.json();
}

module.exports = {
    get
};
