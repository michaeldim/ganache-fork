const Web3 = require('web3');
const daiAbi = require('./abi.json');

const recipientAddress = '0x0000000000000000000000000000000000000000';

const unlockedAddress = '0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa';
const daiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

const web3 = new Web3('http://127.0.0.1:8545');

const dai = new web3.eth.Contract(
    daiAbi,
    daiContractAddress
);

async function run() {
    let unlockedBalance, recipientBalance;
    ([unlockedBalance, recipientBalance] = await Promise.all([
        dai.methods
            .balanceOf(unlockedAddress)
            .call(),
        dai.methods
            .balanceOf(recipientAddress)
            .call()
    ]));
    console.log(`Dai Balance: ${unlockedBalance}`);
    console.log(`Local Account Balance: ${recipientBalance}`);

    await dai.methods
        .transfer(recipientAddress, 10)
        .send({from: unlockedAddress});

    ([unlockedBalance, recipientBalance] = await Promise.all([
        dai.methods
            .balanceOf(unlockedAddress)
            .call(),
        dai.methods
            .balanceOf(recipientAddress)
            .call()
    ]));

    console.log(`New Dai Balance: ${unlockedBalance}`);
    console.log(`New Local Account Balance: ${recipientBalance}`);
}

run();
