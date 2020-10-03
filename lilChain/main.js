const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, time, data, previousblockhash = '') {
        this.index = index;
        this.height = "1325438";
        this.time = time;
        this.data = data;
        this.previousblockhash = previousblockhash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousblockhash + this.time + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousblockhash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i ++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousblockhash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let lilChain = new Blockchain();
lilChain.addBlock(new Block(1, "01/02/2020", {amount: 20}));
lilChain.addBlock(new Block(2, "10/02/2020", {amount: 10}));
