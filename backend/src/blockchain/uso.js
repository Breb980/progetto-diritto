const { Block, Blockchain } = require("./backend/src/blockchain/blockchain.js");

const VoteChain = new Blockchain();
// Add a new block
VoteChain.addBlock(new Block(Date.now().toString(), { from: "John", vote: "voto" }));
// (This is just a fun example, real cryptocurrencies often have some more steps to implement).

// Prints out the updated chain
console.log(VoteChain.chain); 