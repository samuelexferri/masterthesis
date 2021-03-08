// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PackVariables {
    struct Values {
        uint128 a;
        uint128 b;
        uint256 c;
    }
    
    Values public values;
    
    function saveStorage(uint128 a, uint128 b, uint256 c) external {
        values = Values(a,b,c);
    }
}

contract PackVariablesWrong {
    
    struct ValuesWrong {
        uint128 a;
        uint256 b;
        uint128 c;
    }
    
    ValuesWrong public valuesWrong;
    
    function saveStorageWrong(uint128 a, uint256 b, uint128 c) external {
        //uint128 aa = a;
        valuesWrong = ValuesWrong(a,b,c);
    }
}
