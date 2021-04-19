import binascii

import sha3  # Convert a number to 32 bytes array


def bytes32(i):
    return binascii.unhexlify('%064x' % i)  # Calculate the keccak256 hash of a 32 bytes array


def keccak256(x):
    return sha3.keccak_256(x).hexdigest()
