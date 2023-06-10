import fs from 'fs';
const hre = require("hardhat");
const { deploy1820 } = require('deploy-eip-1820')

// deploy/00_deploy_my_contract.js
module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    let {deployer, erc1820Registry, USDT, USDC} = await getNamedAccounts();
    const [owner] = await hre.ethers.getSigners()

    if (erc1820Registry === undefined) {
        const registryContract = await deploy1820(owner)
        erc1820Registry = registryContract.address;
    }

    if (USDT === undefined) {
        const result = await deploy("USDT", {
            contract: 'ERC20',
            from: deployer,
            args: ["Tether: USDT Token", "USDT"],
            log: true,
            gasLimit: 10000000,
        });
        USDT = result.address;
    }
    if (USDC === undefined) {
        const result = await deploy("USDC", {
            contract: 'ERC20',
            from: deployer,
            args: ["USD Coin", "USDT"],
            log: true,
            gasLimit: 10000000,
        });
        USDC = result.address;
    }

    const gUSDT = await deploy("gUSDT", {
        contract: 'LockERC20InERC777',
        from: deployer,
        args: [
            erc1820Registry,
            USDT,
            1, // multiplier
            10**18 / 10**6, // divisor
            "greendollar USDT",
            "gUSDT"
        ],
        log: true,
        gasLimit: 10000000,
    });
    const gUSDC = await deploy("gUSDC", {
        contract: 'LockERC20InERC777',
        from: deployer,
        args: [
            erc1820Registry,
            USDC,
            1, // multiplier
            10**18 / 10**6, // divisor
            "greendollar USDC",
            "gUSDC"
        ],
        log: true,
        gasLimit: 10000000,
    });

    const j = [
        { wrapped: USDT, wrapper: gUSDT.address },
        { wrapped: USDC, wrapper: gUSDC.address },
    ];
    fs.writeFileSync("frontend/src/data/addresses.json", JSON.stringify(j));
};
module.exports.tags = ['LockERC20InERC777'];
