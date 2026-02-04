#!/usr/bin/env node

/**
 * Merkle Tree Generator for DAO Token Airdrops
 *
 * This script generates a merkle tree from an allocation JSON file
 * and outputs merkle root and proofs for claiming.
 *
 * Usage:
 *   node generate_merkle.js <input.json> <output.json>
 *
 * Example:
 *   node generate_merkle.js ../airdrop-sample.json output.json
 *
 * Input format:
 * [
 *   {
 *     "address": "0x...",
 *     "amount": "1000000000000000000",
 *     "score": 500
 *   }
 * ]
 *
 * Output format:
 * {
 *   "merkleRoot": "0x...",
 *   "claims": {
 *     "0x...": {
 *       "index": 0,
 *       "amount": "1000000000000000000",
 *       "proof": ["0x...", "0x..."]
 *     }
 *   }
 * }
 *
 * SECURITY NOTE: No secrets or private keys required.
 * This script only processes public allocation data.
 */

const fs = require('fs');
const crypto = require('crypto');

// Simple keccak256 implementation (in production, use ethers.js or web3.js)
function keccak256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Encode address and amount (simplified - use ethers.js abi.encode in production)
function encodeLeaf(index, address, amount) {
  const data = `${index}${address}${amount}`;
  return keccak256(data);
}

// Build merkle tree from leaves
function buildMerkleTree(leaves) {
  if (leaves.length === 0) {
    throw new Error('Cannot build tree with no leaves');
  }

  let currentLevel = leaves;
  const tree = [currentLevel];

  while (currentLevel.length > 1) {
    const nextLevel = [];

    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : currentLevel[i];

      // Sort pair to ensure deterministic tree
      const pair = [left, right].sort();
      const combined = keccak256(pair[0] + pair[1]);
      nextLevel.push(combined);
    }

    currentLevel = nextLevel;
    tree.push(currentLevel);
  }

  return tree;
}

// Generate merkle proof for a specific leaf
function getProof(tree, leafIndex) {
  const proof = [];
  let index = leafIndex;

  for (let level = 0; level < tree.length - 1; level++) {
    const currentLevel = tree[level];
    const isRightNode = index % 2 === 1;
    const siblingIndex = isRightNode ? index - 1 : index + 1;

    if (siblingIndex < currentLevel.length) {
      proof.push('0x' + currentLevel[siblingIndex]);
    }

    index = Math.floor(index / 2);
  }

  return proof;
}

// Main function
function generateMerkleData(inputFile, outputFile) {
  console.log('🌳 Merkle Tree Generator');
  console.log('========================\n');

  // Read input file
  console.log(`📖 Reading input: ${inputFile}`);
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const allocations = JSON.parse(rawData);

  console.log(`✅ Found ${allocations.length} allocations\n`);

  // Validate allocations
  console.log('🔍 Validating data...');
  for (let i = 0; i < allocations.length; i++) {
    const alloc = allocations[i];
    if (!alloc.address || !alloc.amount) {
      throw new Error(`Invalid allocation at index ${i}: missing address or amount`);
    }
  }
  console.log('✅ Data validation passed\n');

  // Generate leaves
  console.log('🌱 Generating leaves...');
  const leaves = allocations.map((alloc, index) => {
    return encodeLeaf(index, alloc.address, alloc.amount);
  });
  console.log(`✅ Generated ${leaves.length} leaves\n`);

  // Build tree
  console.log('🌳 Building merkle tree...');
  const tree = buildMerkleTree(leaves);
  const merkleRoot = '0x' + tree[tree.length - 1][0];
  console.log(`✅ Tree built with ${tree.length} levels`);
  console.log(`📝 Merkle Root: ${merkleRoot}\n`);

  // Generate proofs for each allocation
  console.log('🔐 Generating proofs...');
  const claims = {};

  for (let i = 0; i < allocations.length; i++) {
    const alloc = allocations[i];
    const proof = getProof(tree, i);

    claims[alloc.address] = {
      index: i,
      amount: alloc.amount,
      score: alloc.score || 0,
      proof: proof,
    };
  }
  console.log(`✅ Generated ${Object.keys(claims).length} proofs\n`);

  // Create output data
  const output = {
    merkleRoot: merkleRoot,
    tokenTotal: allocations.reduce((sum, a) => sum + BigInt(a.amount), BigInt(0)).toString(),
    claims: claims,
  };

  // Write output file
  console.log(`💾 Writing output: ${outputFile}`);
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log('✅ Output file written\n');

  // Summary
  console.log('📊 Summary');
  console.log('==========');
  console.log(`Total Allocations: ${allocations.length}`);
  console.log(`Merkle Root: ${merkleRoot}`);
  console.log(`Total Tokens: ${output.tokenTotal}`);
  console.log(`\n✨ Done! Merkle tree generated successfully.\n`);

  // Instructions
  console.log('📋 Next Steps:');
  console.log('1. Review the output file to verify correctness');
  console.log('2. Publish merkle root and claims data publicly');
  console.log('3. Deploy smart contract with merkle root (if on-chain)');
  console.log('4. Announce claim period to eligible recipients');
  console.log('5. Monitor claims and provide support as needed\n');

  console.log('⚠️  IMPORTANT: Keep the output file secure but accessible');
  console.log('    Recipients will need their proofs to claim tokens.\n');
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Usage: node generate_merkle.js <input.json> <output.json>');
    console.error('   Example: node generate_merkle.js ../airdrop-sample.json output.json');
    process.exit(1);
  }

  const [inputFile, outputFile] = args;

  try {
    generateMerkleData(inputFile, outputFile);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { generateMerkleData, buildMerkleTree, getProof };
