class Blockchain {
    constructor() {
        // create the genesis block (the first block without data)
        this.chain = [new Block(Date.now().toString())];
        /// this.difficulty = 1;
        /// this.blockTime = 30000;
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

    // TODO da mettere altrove
    addBlock(block) {
        // prevHash will be the hash of the old latest block
        block.prevHash = this.getLastBlock().hash;
        // now prevHash has a value, we must reset the block's hash
        block.hash = block.getHash();

        /// block.mine(this.difficulty); // for mining

        // Object.freeze ensures immutability in our code
        this.chain.push(Object.freeze(block));

        /// this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
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
        /// this.nonce = 0;
    }

    // ensure the immutability
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data)); //+ this.nonce
    }

    mine(difficulty) {
        // Basically, it loops until our hash starts with 
        // the string 0...000 with length of <difficulty>.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increases our nonce so that we can get a whole different hash.
            /// this.nonce++;
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }
    }
}

module.exports = {
    Blockchain,
    Block
}