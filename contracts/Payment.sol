// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Payment {
    uint256 public noOfFunders;

    mapping(uint256 => address) private funders;

    receive() external payable {}

    function transfer() external payable {
        funders[noOfFunders] = msg.sender;
    }
}
