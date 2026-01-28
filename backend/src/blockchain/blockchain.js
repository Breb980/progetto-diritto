/* The Class Blockchain rapresents the blockchain and 
a Class Block for build the blocks of blockchain */

class Blockchain {
    constructor() {
        // create the genesis block (the first block without data)
        this.chain = [new Block(Date.now().toString())];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    isValid(blockchain = this) {
        // iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            // check validation
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }

    addBlock(block) {
        // prevHash will be the hash of the old latest block
        block.prevHash = this.getLastBlock().hash;
        // now prevHash has a value, we must reset the block's hash
        block.hash = block.getHash();

        // Object.freeze ensures immutability in our code
        this.chain.push(Object.freeze(block));

    }

    static fromJSON(json) {
        const blockchain = new Blockchain();

        blockchain.chain = json.chain.map(b => {
            const block = new Block(b.timestamp, b.data);
            block.hash = b.hash;
            block.prevHash = b.prevHash;
            return Object.freeze(block);
        });

        return blockchain;
    }
}

const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        // this.data should contain information like transactions.
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // previous block's hash
    }

    // ensure the immutability
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }

    mine(difficulty) {
        // Basically, it loops until our hash starts with 
        // the string 0...000 with length of <difficulty>.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increases our nonce so that we can get a whole different hash.
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }
    }
}

module.exports = {
    Blockchain,
    Block
}