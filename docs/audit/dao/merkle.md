
# Merkle Airdrop Process

## Overview

This document explains the merkle tree airdrop mechanism used for efficient and gas-optimized token distribution to DAO participants.

## What is a Merkle Airdrop?

A merkle airdrop uses a merkle tree data structure to:

- **Reduce Gas Costs**: Only root hash stored on-chain
- **Prove Inclusion**: Users prove eligibility with merkle proof
- **Scale Efficiently**: Support thousands of recipients
- **Maintain Transparency**: Full tree publicly verifiable

## Merkle Tree Basics

### Structure

```
            Root Hash
           /         \
      Hash AB      Hash CD
      /    \        /    \
  Hash A Hash B  Hash C Hash D
    |      |       |      |
  User A User B  User C User D
```

### Components

1. **Leaf Nodes**: Individual allocations (address + amount)
2. **Branch Nodes**: Hashes of child nodes
3. **Root Hash**: Single hash representing entire tree
4. **Merkle Proof**: Path from leaf to root

## Distribution Flow

### Phase 1: Data Collection

1. **Snapshot**: Capture contributions at specific time
2. **Scoring**: Calculate scores using [scoring.md](scoring.md)
3. **Allocation**: Convert scores to token amounts
4. **Verification**: Community review period

### Phase 2: Merkle Tree Generation

1. **Format Data**: Create allocation list

   ```json
   {
     "address": "0x1234...",
     "amount": "1000000000000000000",
     "score": 500
   }
   ```

2. **Generate Leaves**: Hash each allocation

   ```javascript
   leaf = keccak256(abi.encodePacked(address, amount));
   ```

3. **Build Tree**: Combine hashes pairwise up to root

4. **Generate Proofs**: Create proof for each leaf

5. **Publish**: Release tree data publicly

### Phase 3: Contract Deployment (If On-Chain)

1. **Deploy Contract**: MerkleDistributor contract
2. **Set Root**: Store merkle root hash
3. **Fund Contract**: Transfer tokens to contract
4. **Verify**: Confirm setup correct
5. **Announce**: Notify eligible claimants

### Phase 4: Claiming

See [claiming.md](claiming.md) for user claiming process.

## Generating Merkle Trees

### Using the Provided Script

We provide a merkle tree generator script:

**Location**: `dao/merkle/generate_merkle.js`

**Usage**:

```bash
cd dao/merkle
node generate_merkle.js ../airdrop-sample.json output.json
```

**Input Format** (`airdrop-sample.json`):

```json
[
  {
    "address": "0x1234567890123456789012345678901234567890",
    "amount": "1000000000000000000000",
    "score": 500
  },
  {
    "address": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    "amount": "500000000000000000000",
    "score": 250
  }
]
```

**Output Format** (`output.json`):

```json
{
  "merkleRoot": "0xabc123...",
  "claims": {
    "0x1234...": {
      "index": 0,
      "amount": "1000000000000000000000",
      "proof": ["0xdef456...", "0x789abc..."]
    }
  }
}
```

### Manual Generation

For custom implementations:

**Step 1: Prepare leaves**

```javascript
const leaves = allocations.map((alloc, index) => {
  return ethers.utils.solidityKeccak256(
    ['uint256', 'address', 'uint256'],
    [index, alloc.address, alloc.amount]
  );
});
```

**Step 2: Build tree**

```javascript
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot();
```

**Step 3: Generate proofs**

```javascript
const proof = tree.getHexProof(leaves[index]);
```

## Smart Contract Integration

### Example Solidity Contract

````solidity
# Merkle Airdrop Flow

## Overview

Merkle airdrops enable efficient, gas-optimized token distribution to many recipients. Recipients can claim their tokens when they're ready, paying only their own gas costs.

## How Merkle Airdrops Work

### Concept

Instead of sending tokens to thousands of addresses (expensive), we:
1. Calculate each recipient's allocation
2. Build a Merkle tree from allocations
3. Store only the Merkle root on-chain
4. Users claim by providing a Merkle proof

### Benefits

- **Gas Efficient**: Only root hash stored on-chain
- **Scalable**: Supports unlimited recipients
- **Flexible**: Users claim when ready
- **Transparent**: All allocations public and verifiable
- **Secure**: Cryptographically guaranteed

## Airdrop Process

### Phase 1: Data Collection

1. **Contribution Snapshot**
   ```bash
   # Run scoring algorithm
   node scripts/calculate-contributions.js --start-date 2025-01-01 --end-date 2025-12-31
````

2. **Score Calculation**
   - Apply scoring formula (see [scoring.md](scoring.md))
   - Calculate token allocations
   - Generate allocation list

3. **Review Period**
   - Post draft allocations to GitHub
   - Community review (7 days)
   - Address disputes
   - Finalize allocations

### Phase 2: Merkle Tree Generation

1. **Prepare Allocation Data**

   ```json
   {
     "0x1234...": "1000000000000000000",
     "0x5678...": "500000000000000000",
     "...": "..."
   }
   ```

2. **Generate Merkle Tree**

   ```bash
   node dao/merkle/generate_merkle.js \
     --input dao/allocations.json \
     --output dao/merkle-tree.json
   ```

3. **Outputs**
   - Merkle root hash
   - Merkle proofs for each address
   - Verification data

### Phase 3: On-Chain Deployment

1. **Deploy Merkle Distributor Contract**

   ```solidity
   contract MerkleDistributor {
     bytes32 public merkleRoot;
     mapping(address => bool) public claimed;

     function claim(uint256 amount, bytes32[] memory proof) external;
   }
   ```

2. **Set Merkle Root**
   - Multisig proposes transaction
   - Signers approve
   - Root hash set on-chain

3. **Fund Contract**
   - Transfer total airdrop tokens to contract
   - Verify balance

### Phase 4: Claiming Period

1. **Announcement**
   - Publish claim instructions
   - Share merkle proofs
   - Provide claiming interface

2. **User Claims**
   - User visits claim interface
   - Connects wallet
   - Submits claim transaction with proof
   - Receives tokens

3. **Verification**
   - Contract verifies Merkle proof
   - Checks if already claimed
   - Transfers tokens to user

## Technical Implementation

### Generating Merkle Tree

```javascript
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

function generateMerkleTree(allocations) {
  // Create leaf nodes
  const leaves = Object.entries(allocations).map(([address, amount]) => {
    return keccak256(ethers.utils.solidityPack(['address', 'uint256'], [address, amount]));
  });

  // Build tree
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  // Get root
  const root = tree.getHexRoot();

  // Generate proofs
  const proofs = {};
  Object.entries(allocations).forEach(([address, amount]) => {
    const leaf = keccak256(ethers.utils.solidityPack(['address', 'uint256'], [address, amount]));
    proofs[address] = tree.getHexProof(leaf);
  });

  return { root, proofs, tree };
}
```

### Verifying Proofs

```javascript
function verifyProof(address, amount, proof, root) {
  const leaf = keccak256(ethers.utils.solidityPack(['address', 'uint256'], [address, amount]));

  return MerkleTree.verify(proof, leaf, root, keccak256);
}
```

### Smart Contract (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleDistributor {
    IERC20 public token;
    bytes32 public merkleRoot;
    mapping(address => bool) public claimed;

    event Claimed(address indexed account, uint256 amount);


    event Claimed(address indexed account, uint256 amount);

    constructor(IERC20 _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof)
        external
    {
        require(!claimed[account], "Already claimed");

        // Verify merkle proof
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), "Invalid proof");

        // Mark as claimed and transfer
        claimed[account] = true;
        require(token.transfer(account, amount), "Transfer failed");

        emit Claimed(account, amount);
    }

    function isClaimed(address account) public view returns (bool) {

    function claim(uint256 amount, bytes32[] calldata proof) external {
        require(!claimed[msg.sender], "Already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");

        claimed[msg.sender] = true;
        require(token.transfer(msg.sender, amount), "Transfer failed");

        emit Claimed(msg.sender, amount);
    }

    function isClaimed(address account) external view returns (bool) {
        return claimed[account];
    }
}