#!/usr/bin/env node

/**
 * Merkle Tree Generator for DAO Token Airdrops
 *
 * This script generates a merkle tree from an allocation JSON file
 * and outputs merkle root and proofs for claiming.
 *
 * Usage:
 *   node generate_merkle.js <input.json> <output.json>
 */

import fs from 'fs';
import crypto from 'crypto';

// Simple keccak256 implementation (placeholder)
function keccak256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Encode leaf (simplified)
function encodeLeaf(index, address, amount) {
  const data = `${index}${address}${amount}`;
  return keccak256(data);
}

// Build merkle tree
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

      const pair = [left, right].sort();
      const combined = keccak256(pair[0] + pair[1]);
      nextLevel.push(combined);
    }

    currentLevel = nextLevel;
    tree.push(currentLevel);
  }

  return tree;
}

// Generate proof
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

// Main generator
function generateMerkleData(inputFile, outputFile) {
  console.log('🌳 Merkle Tree Generator');
  console.log('========================\n');

  console.log(`📖 Reading input: ${inputFile}`);
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const allocations = JSON.parse(rawData);

  console.log(`✅ Found ${allocations.length} allocations\n`);

  console.log('🔍 Validating data...');
  for (let i = 0; i < allocations.length; i++) {
    const alloc = allocations[i];
    if (!alloc.address || !alloc.amount) {
      throw new Error(`Invalid allocation at index ${i}: missing address or amount`);
    }
  }
  console.log('✅ Data validation passed\n');

  console.log('🌱 Generating leaves...');
  const leaves = allocations.map((alloc, index) => encodeLeaf(index, alloc.address, alloc.amount));
  console.log(`✅ Generated ${leaves.length} leaves\n`);

  console.log('🌳 Building merkle tree...');
  const tree = buildMerkleTree(leaves);
  const merkleRoot = '0x' + tree[tree.length - 1][0];
  console.log(`📝 Merkle Root: ${merkleRoot}\n`);

  console.log('🔐 Generating proofs...');
  const claims = {};

  for (let i = 0; i < allocations.length; i++) {
    const alloc = allocations[i];
    const proof = getProof(tree, i);

    claims[alloc.address] = {
      index: i,
      amount: alloc.amount,
      score: alloc.score || 0,
      proof,
    };
  }

  const output = {
    merkleRoot,
    tokenTotal: allocations.reduce((sum, a) => sum + BigInt(a.amount), BigInt(0)).toString(),
    claims,
  };

  console.log(`💾 Writing output: ${outputFile}`);
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log('✨ Done! Merkle tree generated successfully.\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Usage: node generate_merkle.js <input.json> <output.json>');
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

export { generateMerkleData, buildMerkleTree, getProof };
