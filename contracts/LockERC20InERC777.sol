// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import { ERC777 } from './ERC777.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract LockERC20InERC777 is ERC777 {
    IERC20 erc20;

    constructor(IERC20 _erc20, string memory name_, string memory symbol_/*, address[] memory defaultOperators_*/)
        ERC777(name_, symbol_, new address[](0))
    {
        erc20 = _erc20;
    }

    function borrowERC20(uint256 _amount, address _from, address _to, bytes memory userData) public {
        _mint(_to, _amount, userData, "");
        erc20.transferFrom(_from, address(this), _amount);
        // To protect from reentrancy vulnerability, don't change variables below.
        emit BorrowedERC20(msg.sender, _amount, _from, _to);
    }

    function burn(uint256 _amount, bytes memory _data) public override {
        _burn(msg.sender, _amount, _data, "");
        // To protect from reentrancy vulnerability, don't change variables below.
        erc20.transfer(msg.sender, _amount);
    }

    event BorrowedERC20(address sender, uint256 amount, address from, address to);
}