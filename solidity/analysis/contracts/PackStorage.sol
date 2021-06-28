// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Test Address: 0x1234574773Fc4F943711e57a7542f5Af2c83210F
// Test Time: 1609455600
// Test DNA: 73616d75656c65786665727269

contract PackSingle {
	mapping(uint256 => address) owners;
	mapping(uint256 => uint256) dnas;
	mapping(uint256 => uint16) heights;
	mapping(uint256 => uint16) weights;
	mapping(uint256 => uint64) creationTimes;

	function setPerson(
		uint256 _id,
		address _owner,
		uint256 _dna,
		uint256 _height,
		uint256 _weight,
		uint256 _creationTime
	) external {
		owners[_id] = _owner;
		dnas[_id] = _dna;
		heights[_id] = uint16(_height);
		weights[_id] = uint16(_weight);
		creationTimes[_id] = uint64(_creationTime);
	}

	function getPerson(uint256 _id)
		external
		view
		returns (
			address _owner,
			uint256 _dna,
			uint256 _height,
			uint256 _weight,
			uint256 _creationTime
		)
	{
		_owner = owners[_id];
		_dna = dnas[_id];
		_height = heights[_id];
		_weight = weights[_id];
		_creationTime = creationTimes[_id];
	}
}

contract PackStructs {
	struct Person {
		address owner; // Address 160 bit
		uint64 creationTime;
		uint16 height;
		uint16 weight;
		uint256 dna;
	}

	mapping(uint256 => Person) persons;

	function setPerson(
		uint256 _id,
		address _owner,
		uint256 _creationTime,
		uint256 _height,
		uint256 _weight,
		uint256 _dna
	) external {
		persons[_id] = Person(_owner, uint64(_creationTime), uint16(_height), uint16(_weight), _dna);
	}

	function getPerson(uint256 _id) external view returns (Person memory _person) {
		_person = persons[_id];
	}
}

contract PackEncoding {
	mapping(uint256 => uint256) persons;
	mapping(uint256 => uint256) dnas;

	function setCharacter(
		uint256 _id,
		address _owner,
		uint256 _creationTime,
		uint256 _height,
		uint256 _weight,
		uint256 _dna
	) external returns (bytes32 s) {
		uint256 person = uint256(uint160(address(_owner)));
		person |= _creationTime << 160;
		person |= _height << 224;
		person |= _weight << 240;
		persons[_id] = person;
		dnas[_id] = _dna;
		return bytes32(person);
	}

	function getCharacter(uint256 _id)
		external
		view
		returns (
			address _owner,
			uint256 _creationTime,
			uint256 _height,
			uint256 _weight,
			uint256 _dna
		)
	{
		uint256 person = persons[_id];
		_owner = address(uint160(person));
		_creationTime = uint256(uint64(person >> 160));
		_height = uint256(uint16(person >> 224));
		_weight = uint256(uint16(person >> 240));
		_dna = dnas[_id];
	}
}
