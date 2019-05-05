// https://www.reddit.com/r/ethereum/comments/agw5vp/adding_good_peers_to_ethereum_node_using_etherscan/
// https://etherscan.io/nodetracker/nodes
const enodeTable = document.getElementsByClassName('table')[0];
let enodeList = [];
let commandList = [];
let commandStart = 'curl --data \'{"jsonrpc":"2.0","method":"parity_addReservedPeer","params":["';
let commandEnd = '"],"id":0}\' -H "Content-Type: application/json" -X POST localhost:8545';

let text = '';
for (i = 1; i < enodeTable.rows.length; i++) {
    let enodeUrl = '';
    let command = '';
    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    let objCells = enodeTable.rows.item(i).cells;
    let btn = objCells[8];
    copySpan = btn.getElementsByClassName('d-none');
    enodeUrl = copySpan[0].innerText;
    enodeList.push(enodeUrl);
    text += enodeUrl + '\n';
}

console.log(text);
