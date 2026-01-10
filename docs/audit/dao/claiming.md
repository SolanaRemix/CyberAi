# Token Claiming Process

## Overview

<<<<<<< HEAD
<<<<<<< HEAD
This guide explains how to claim your SmartContractAudit DAO governance tokens after you've been included in an airdrop allocation.
=======
This guide explains how to claim your CyberAi DAO token allocation after a snapshot has been taken and the merkle tree has been generated.
>>>>>>> origin/pr10

## Prerequisites

Before you can claim:

<<<<<<< HEAD
✅ **Verify Eligibility**
- Check you're included in the allocation
- Confirm your address and amount
- Review your merkle proof

✅ **Prepare Wallet**
- Have a compatible Web3 wallet (MetaMask, WalletConnect, etc.)
- Ensure wallet is on the correct network
- Have sufficient native tokens for gas (if on-chain claiming)

✅ **Understand Vesting**
- 25% unlocked immediately
- 75% vests linearly over 12 months
- No cliff period

## Claiming Methods

### Method 1: On-Chain Claiming (If Deployed)

**When to use**: Token contract deployed on blockchain

#### Step 1: Visit Claim Interface

Navigate to the official claiming portal:
```
[CLAIM_URL_TO_BE_ANNOUNCED]
```

⚠️ **Security**: Only use official links announced on GitHub

#### Step 2: Connect Wallet

1. Click "Connect Wallet"
2. Choose your wallet provider
3. Approve connection
4. Verify correct network

#### Step 3: Verify Allocation

The interface will show:
- Your address
- Allocated amount
- Claimed status
- Vested amount (if applicable)

#### Step 4: Claim Tokens

1. Click "Claim Tokens"
2. Review transaction details
3. Confirm gas fee
4. Sign transaction
5. Wait for confirmation

#### Step 5: Verify Receipt

- Check token balance in wallet
- Add token to wallet if not visible
- Verify amount matches allocation

### Method 2: Off-Chain Claiming

**When to use**: Gasless distribution preferred

#### Step 1: Verify Identity

1. Visit claim portal
2. Connect wallet
3. Sign message to verify ownership (gasless)

#### Step 2: Submit Claim

1. Review your allocation
2. Click "Submit Claim Request"
3. Sign verification message
4. Receive confirmation

#### Step 3: Receive Tokens

- Tokens sent directly to your address
- No gas fees required
- Processing time: 24-48 hours

#### Step 4: Confirm Receipt

- Check wallet balance
- Add token if needed
- Contact support if not received after 48 hours

## Detailed Instructions

### For On-Chain Claims

#### Using MetaMask

1. **Install MetaMask**
   ```
   https://metamask.io
   ```

2. **Connect to Correct Network**
   - Click network dropdown
   - Select appropriate network (Ethereum, Solana, etc.)
   - Verify network ID

3. **Visit Claim Site**
   - Use official link only
   - Check URL carefully
   - Ensure HTTPS

4. **Connect Wallet**
   - Click "Connect Wallet"
   - Select MetaMask
   - Approve connection
   - Verify connected address

5. **View Claim Details**
   ```
   Address: 0x1234...
   Allocation: 1,000 SCAUDIT
   Claimed: 0 SCAUDIT
   Available to Claim: 250 SCAUDIT (25%)
   Vesting: 750 SCAUDIT over 12 months
   ```

6. **Execute Claim**
   - Click "Claim Tokens"
   - Review transaction
   - Gas estimate: ~100,000 gas
   - Confirm transaction

7. **Add Token to Wallet**
   - Token contract: `[CONTRACT_ADDRESS]`
   - Symbol: SCAUDIT
   - Decimals: 18

#### Using WalletConnect

1. **Mobile Wallet Setup**
   - Open wallet app (Trust Wallet, Rainbow, etc.)
   - Ensure funded with gas tokens

2. **Scan QR Code**
   - Click "WalletConnect" on claim site
   - Scan QR code with wallet app
   - Approve connection

3. **Complete Claim**
   - Follow prompts in wallet app
   - Confirm transaction
   - Wait for confirmation

### For Off-Chain Claims

#### Simple Sign & Claim

1. **Visit Portal**
   ```
   [OFF_CHAIN_CLAIM_URL]
   ```

2. **Connect & Verify**
   - Connect wallet
   - Sign verification message (no gas)
   - Message content:
     ```
     I am claiming SmartContractAudit DAO tokens
     Address: [YOUR_ADDRESS]
     Timestamp: [TIMESTAMP]
     ```

3. **Submit Claim**
   - Review allocation details
   - Click "Submit Claim"
   - Wait for processing

4. **Receive Tokens**
   - Tokens distributed within 48 hours
   - Check email for updates (if provided)
   - Monitor wallet balance

## Vesting Schedule

### Understanding Vesting

**Immediate Unlock**: 25% available at claim
**Vesting Period**: 12 months linear vesting
**Vesting Amount**: 75% of allocation

### Example Timeline

**Total Allocation**: 1,000 tokens

| Time | Available | Vested | Total Claimed |
|------|-----------|--------|---------------|
| Day 0 (Claim) | 250 | 0 | 250 |
| Month 1 | 0 | 62.5 | 312.5 |
| Month 3 | 0 | 187.5 | 437.5 |
| Month 6 | 0 | 375 | 625 |
| Month 12 | 0 | 750 | 1,000 |

### Claiming Vested Tokens

**On-Chain**:
- Return to claim interface
- Click "Claim Vested"
- Sign transaction
- Gas fee applies

**Off-Chain**:
- Vested tokens automatically included in wallet balance
- No action needed

## Adding Token to Wallet

### MetaMask

1. Open MetaMask
2. Click "Import Tokens"
3. Enter token contract address:
   ```
   [TOKEN_CONTRACT_ADDRESS]
   ```
4. Symbol: `SCAUDIT`
5. Decimals: `18`
6. Click "Add Custom Token"

### Trust Wallet

1. Open Trust Wallet
2. Tap "+" (top right)
3. Search for "SmartContractAudit" or paste contract address
4. Enable token
5. Token appears in wallet

### Other Wallets

Most wallets auto-detect tokens. If not:
- Find "Add Token" or "Custom Token"
- Enter contract address
- Confirm addition

## Troubleshooting

### "Already Claimed" Error

**Cause**: Tokens already claimed for this address

**Solution**:
- Check wallet balance
- Verify token is added to wallet
- Review transaction history
- Contact support if unsure

### "Invalid Proof" Error

**Cause**: Merkle proof doesn't match

**Solutions**:
- Refresh page and try again
- Clear browser cache
- Verify you're using correct address
- Re-download proof data
- Contact support with your address

### "Insufficient Gas" Error

**Cause**: Not enough native tokens for transaction

**Solutions**:
- Add ETH (or native token) to wallet
- Gas estimate: ~$10-50 depending on network
- Wait for lower gas prices
- Use off-chain claiming if available

### "Network Mismatch" Error

**Cause**: Wallet on wrong network

**Solutions**:
- Check required network
- Switch network in wallet
- Verify network ID matches
- Reconnect wallet

### Tokens Not Appearing

**Causes & Solutions**:

1. **Token not added to wallet**
   - Manually add token (see "Adding Token" section)

2. **Wrong address connected**
   - Disconnect and reconnect correct wallet
   - Verify address matches allocation

3. **Transaction pending**
   - Wait for blockchain confirmation
   - Check block explorer

4. **Off-chain processing**
   - Wait 24-48 hours for processing
   - Check email for updates

### Can't Sign Message/Transaction

**Solutions**:
- Ensure wallet unlocked
- Check wallet has sufficient funds
- Try different wallet/browser
- Disable conflicting extensions
- Update wallet to latest version

## Security Checklist

Before claiming, verify:

✅ **Official Site**
- [ ] URL matches official announcement
- [ ] HTTPS enabled
- [ ] Certificate valid
- [ ] No typos in domain

✅ **Contract Verification**
- [ ] Contract address matches announcement
- [ ] Contract verified on block explorer
- [ ] Correct token details

✅ **Transaction Safety**
- [ ] Review all transaction details
- [ ] Verify recipient address (should be you)
- [ ] Reasonable gas fees
- [ ] No suspicious token approvals

✅ **Wallet Security**
- [ ] Using trusted wallet
- [ ] Private keys secure
- [ ] No wallet compromises
- [ ] Hardware wallet recommended for large amounts

## Common Scams to Avoid

⚠️ **Warning Signs**:

- Requests for private keys or seed phrases
- Unofficial claiming sites
- DMs claiming to be support
- Urgent "claim now or lose" messages
- Requests for payment to claim
- Suspicious token approvals
- Fake social media announcements

🛡️ **Stay Safe**:

- Only use links from official GitHub
- Never share private keys
- Verify everything
- Be suspicious of unsolicited messages
- Report scams to security@cuberai.example

## Post-Claim Actions

### After Successfully Claiming

1. **Verify Balance**
   - Check token appears in wallet
   - Confirm amount matches expected

2. **Secure Your Wallet**
   - Backup wallet if not done
   - Consider hardware wallet
   - Enable 2FA where possible

3. **Participate in Governance**
   - Join Snapshot space
   - Read active proposals
   - Cast your votes
   - Or delegate voting power

4. **Stay Informed**
   - Watch GitHub for updates
   - Join community discussions
   - Monitor governance proposals

## Support

### Getting Help

**Before Contacting Support**:
1. Read this guide thoroughly
2. Check FAQ section below
3. Search GitHub Discussions
4. Review transaction on block explorer

**Contact Channels**:
- **GitHub Discussions**: Community help
- **GitHub Issues**: Technical problems
- **Email**: governance@cuberai.example

**Include in Support Request**:
- Your wallet address (public)
- Error messages (screenshots)
- Transaction hashes (if any)
- Steps you've tried
- Never include private keys
=======
This guide explains how to claim your DAO tokens through our off-chain and on-chain claiming processes.

## Off-Chain Claim Process

For smaller allocations or testnet distributions, we use an off-chain claim process.

### Step 1: Check Eligibility

1. **Visit Dashboard**
   - Go to: https://smartcontractaudit.github.io/claim
   - Or check: `dao/allocations.json` in repository

2. **Find Your Address**
   ```bash
   grep "0xYourAddress" dao/allocations.json
   ```

3. **Verify Amount**
   - Confirm your allocation amount
   - Check distribution date

### Step 2: Connect Wallet

**Supported Wallets**:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Ledger
- Trezor

**Steps**:
1. Click "Connect Wallet"
2. Select your wallet provider
3. Approve connection
4. Verify correct address is connected

### Step 3: Submit Claim Request

1. **Generate Claim Message**
   - Dashboard generates message to sign
   - Message includes: address, amount, timestamp

2. **Sign Message**
   ```javascript
   const message = `I claim ${amount} tokens to address ${address} at ${timestamp}`;
   const signature = await wallet.signMessage(message);
   ```

3. **Submit Request**
   - Send signed message to claim endpoint
   - Wait for confirmation

### Step 4: Receive Tokens

**Off-Chain Distribution**:
- Tokens sent within 24-48 hours
- Check wallet balance
- Transaction sent from multisig

**Email Notification**:
- Confirmation sent to registered email (if provided)
- Transaction hash included
- Block explorer link

## On-Chain Claim Process (Merkle)

For larger distributions, we use Merkle airdrop for gas efficiency.

### Step 1: Get Your Proof

1. **Download Proof File**
   ```bash
   # From GitHub
   curl -O https://raw.githubusercontent.com/SolanaRemix/SmartContractAudit/main/dao/merkle-proofs.json
   ```

2. **Find Your Proof**
   ```javascript
   const proofs = require('./merkle-proofs.json');
   const myProof = proofs['0xYourAddress'];
   console.log('Amount:', myProof.amount);
   console.log('Proof:', myProof.proof);
   ```

3. **Or Use Web Interface**
   - Visit claim dashboard
   - Proof loaded automatically
   - Amount displayed

### Step 2: Verify Contract

**Important**: Always verify official contract address!

```javascript
// Official MerkleDistributor contract
const CONTRACT_ADDRESS = '0x...'; // Check official announcement

// Verify on Etherscan/block explorer
// Check contract is verified
// Review contract code
```

**Red Flags**:
- ❌ Contract not verified
- ❌ Different address than announced
- ❌ Unusual permissions or functions
- ❌ Recently deployed (check announcement date)

### Step 3: Submit Claim Transaction

#### Using Web Interface

1. **Visit Claim Page**
   - https://smartcontractaudit.github.io/claim

2. **Connect Wallet**
   - Select wallet provider
   - Approve connection

3. **Review Details**
   - Verify your allocation amount
   - Check gas estimate
   - Proof loaded automatically

4. **Click "Claim Tokens"**
   - Wallet prompt appears
   - Review transaction details
   - Confirm transaction

5. **Wait for Confirmation**
   - Transaction submitted
   - Wait for block confirmation
   - Tokens appear in wallet

#### Using Ethers.js

```javascript
const { ethers } = require('ethers');

// Contract ABI
const ABI = [
  "function claim(uint256 amount, bytes32[] proof) external",
  "function isClaimed(address account) external view returns (bool)"
];

// Setup
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// Check if already claimed
const alreadyClaimed = await contract.isClaimed(address);
if (alreadyClaimed) {
  console.log('Already claimed!');
  return;
}

// Submit claim
const tx = await contract.claim(amount, proof);
console.log('Transaction hash:', tx.hash);

// Wait for confirmation
const receipt = await tx.wait();
console.log('Claimed successfully!');
```

#### Using Web3.py

```python
from web3 import Web3

# Connect
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/YOUR_KEY'))

# Contract
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

# Check if claimed
already_claimed = contract.functions.isClaimed(address).call()
if already_claimed:
    print('Already claimed!')
    exit()

# Build transaction
tx = contract.functions.claim(amount, proof).build_transaction({
    'from': address,
    'nonce': w3.eth.get_transaction_count(address),
    'gas': 150000,
    'gasPrice': w3.eth.gas_price
})

# Sign and send
signed_tx = w3.eth.account.sign_transaction(tx, private_key)
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
print(f'Transaction hash: {tx_hash.hex()}')

# Wait for confirmation
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print('Claimed successfully!')
```

### Step 4: Verify Receipt

1. **Check Wallet Balance**
   ```javascript
   const balance = await tokenContract.balanceOf(address);
   console.log('Balance:', ethers.utils.formatUnits(balance, 18));
   ```

2. **View on Block Explorer**
   - Go to Etherscan/block explorer
   - Search transaction hash
   - Verify token transfer event

3. **Confirm in Dashboard**
   - Claim dashboard should update
   - Show "Claimed" status
   - Display claim timestamp

## Troubleshooting

### Common Errors

#### "Already claimed"

**Cause**: Address has already claimed tokens

**Solution**:
- Check if you already claimed
- Verify you're using correct address
- Each address can only claim once

```javascript
// Check claim status
const isClaimed = await contract.isClaimed('0xYourAddress');
console.log('Claimed:', isClaimed);
```

#### "Invalid proof"

**Cause**: Proof doesn't match Merkle root

**Solution**:
- Download latest proof file
- Verify you're using correct address
- Confirm amount matches allocation
- Check Merkle root on contract

```javascript
// Verify proof locally
const { MerkleTree } = require('merkletreejs');
const isValid = tree.verify(proof, leaf, root);
console.log('Valid proof:', isValid);
```

#### "Insufficient gas"

**Cause**: Gas limit too low

**Solution**:
- Increase gas limit to 150,000
- Check current gas prices
- Wait for lower gas times

```javascript
// Estimate gas
const gasEstimate = await contract.estimateGas.claim(amount, proof);
console.log('Estimated gas:', gasEstimate.toString());
```

#### "Reverted transaction"

**Cause**: Multiple possible causes

**Solution**:
1. Check if already claimed
2. Verify contract has tokens
3. Confirm proof is valid
4. Check network (mainnet vs testnet)
5. Review transaction on block explorer

### Getting Help

If you encounter issues:

1. **Check Documentation**
   - Review this guide
   - Check FAQ below
   - Read [merkle.md](merkle.md)

2. **Search Existing Issues**
   - GitHub Issues
   - Discord support channel
   - Community forums

3. **Contact Support**
   - Email: dao@cuberai.example
   - GitHub Issue with details:
     - Your address
     - Error message
     - Transaction hash (if applicable)
     - Screenshots
=======
✅ **Check eligibility** - Review [eligibility.md](eligibility.md)  
✅ **Snapshot taken** - Wait for snapshot announcement  
✅ **Address registered** - Have your wallet address recorded  
✅ **Allocation confirmed** - Check your allocation amount  
✅ **Claiming open** - Wait for claiming period to begin

## Claiming Timeline

### Phase 1: Registration (Days 1-30)

**Register your address:**
- Provide wallet address
- Verify ownership
- Link to GitHub account

### Phase 2: Verification (Days 31-45)

**We verify:**
- Address format is valid
- No duplicate registrations
- Ownership proof is correct
- Allocations are accurate

### Phase 3: Claiming (Day 45+)

**Claim your tokens:**
- Connect wallet
- Generate merkle proof
- Submit claim transaction
- Receive tokens

### Time Limit

⏰ **Claim within 12 months** of claiming opening

- After 12 months, unclaimed tokens may be redistributed
- Extensions may be granted for special circumstances
- Request extension via GitHub issue

## Step-by-Step Guide

### Step 1: Check Your Allocation

**Option A: Web Interface** (recommended)

1. Visit claiming website (link in announcement)
2. Enter your GitHub username or wallet address
3. View your allocation details

**Option B: Direct Merkle Tree File**

1. Download merkle tree file from repository
2. Search for your address
3. Note your amount and proof

### Step 2: Prepare Your Wallet

**Supported Wallets:**
- MetaMask (browser extension)
- WalletConnect (mobile wallets)
- Ledger/Trezor (hardware wallets)
- Other Web3 wallets

**Requirements:**
- Native token for gas (ETH, SOL, etc.)
- Wallet updated to latest version
- Network added (mainnet or specific chain)

**Estimated Gas Costs:**
- Ethereum: 50,000-100,000 gas (~$5-50 depending on gas price)
- Solana: ~0.00001 SOL (~$0.001)
- Other chains: varies

### Step 3: Connect Wallet

**Web Interface:**

1. Click "Connect Wallet" button
2. Select your wallet type
3. Approve connection in wallet
4. Verify connected address matches registration

**Security Checks:**
- URL is correct (check for phishing)
- HTTPS connection (lock icon)
- Contract address verified (compare with official)
- Transaction details reviewed

### Step 4: Generate Proof

**Automatic (Recommended):**

Interface automatically generates merkle proof for your address.

**Manual (Advanced):**

```bash
# Using our tool
node dao/merkle/generate_merkle.js \
  --prove \
  --tree merkle-tree.json \
  --address 0x1234...5678
```

Output:
```json
{
  "address": "0x1234...5678",
  "amount": "1000",
  "proof": [
    "0xabcd...",
    "0xef01...",
    "0x2345..."
  ]
}
```

### Step 5: Review Claim Details

Before submitting, verify:

- ✅ **Address**: Your wallet address is correct
- ✅ **Amount**: Token amount matches your allocation
- ✅ **Network**: Connected to correct network
- ✅ **Gas**: Sufficient gas in wallet
- ✅ **Contract**: Official contract address

**Warning Signs:**
- ❌ Different amount than expected
- ❌ Unusual contract address
- ❌ Excessive gas fee request
- ❌ Additional permissions requested

### Step 6: Submit Claim Transaction

1. Click "Claim Tokens" button
2. Review transaction in wallet popup
3. Verify gas fee is reasonable
4. Approve and sign transaction
5. Wait for confirmation

**Transaction Process:**
1. Submitted → Pending
2. Included in block → Confirming
3. Finalized → Complete

**Time to complete:**
- Ethereum: 30 seconds - 5 minutes
- Solana: 1-5 seconds
- Polygon: 5-30 seconds

### Step 7: Verify Receipt

**Check tokens in wallet:**

1. Add token contract address to wallet
2. View token balance
3. Verify amount matches allocation

**If tokens not showing:**
- Wait for sufficient confirmations
- Manually add token contract
- Check block explorer for transaction
- Verify correct network

## Troubleshooting

### Common Issues

#### "Address not found"

**Causes:**
- Address not registered
- Typo in address
- Not eligible for airdrop
- Registration after deadline

**Solutions:**
- Verify address is correct (checksum)
- Check eligibility criteria
- Appeal if you believe you're eligible
- Register for next airdrop

#### "Invalid proof"

**Causes:**
- Wrong merkle tree version
- Address changed after registration
- Technical error in proof generation
- Contract updated after registration

**Solutions:**
- Regenerate proof from latest tree
- Verify address matches registration
- Contact support with error details
- Check for announcement of updated tree

#### "Already claimed"

**Causes:**
- Tokens already claimed by this address
- Double claim attempt
- Someone else claimed (address compromise)

**Solutions:**
- Check wallet for tokens (may have claimed previously)
- Verify transaction history
- If stolen, report immediately to security@cyberai.network
- Check block explorer for original claim

#### "Insufficient gas"

**Causes:**
- Not enough native token for gas
- Gas price too low
- Complex transaction requiring more gas

**Solutions:**
- Add more native token to wallet
- Increase gas limit slightly
- Wait for lower gas prices
- Use different wallet/network

#### "Transaction reverted"

**Causes:**
- Contract error
- Proof invalid
- Claim period ended
- Already claimed

**Solutions:**
- Check error message details
- Verify all claim requirements
- Contact support with transaction hash
- Try again with higher gas

### Getting Help

**Self-Service:**
1. Check FAQ section below
2. Review transaction on block explorer
3. Verify all requirements met
4. Try again with different wallet/network

**Community Support:**
1. Search GitHub Issues for similar problems
2. Ask in GitHub Discussions (tag: `dao-claiming`)
3. Check announcement for updates

**Direct Support:**
- **Technical Issues**: Open GitHub Issue (tag: `dao-claiming-issue`)
- **Security Concerns**: security@cyberai.network
- **Lost Access**: Follow account recovery process
>>>>>>> origin/pr10

## Security Best Practices

### Before Claiming

<<<<<<< HEAD
- ✅ Verify contract address (official sources only)
- ✅ Check contract is verified on block explorer
- ✅ Review contract code (or trust audit)
- ✅ Use official claim interface only
- ✅ Never share private keys

### During Claiming

- ✅ Review transaction details carefully
- ✅ Check gas price is reasonable
- ✅ Verify receiving address
- ✅ Use hardware wallet if possible
- ✅ Don't rush - double check everything

### After Claiming

- ✅ Verify tokens in wallet
- ✅ Check transaction on block explorer
- ✅ Save transaction hash
- ✅ Update personal records
- ✅ Consider staking or governance participation

### Phishing Protection

**Red Flags**:
- ❌ Unexpected DMs about claiming
- ❌ Requests for private keys
- ❌ Urgent "claim now or lose tokens"
- ❌ Links from unofficial sources
- ❌ Requests for seed phrases

**Safe Practices**:
- ✅ Only use official links
- ✅ Verify URLs carefully
- ✅ Check SSL certificates
- ✅ Use bookmarks, not search results
- ✅ Ask community if unsure

## Claiming Timeline

### Regular Distribution

- **Announcement**: 7 days before claiming opens
- **Claiming Opens**: Specific date/time announced
- **Claiming Period**: 90 days
- **Reminder**: 30 days before closing
- **Final Reminder**: 7 days before closing
- **Closing**: Unclaimed tokens handled per policy

### Emergency Distribution

For urgent fixes or security issues:
- Expedited timeline
- 48-hour notice minimum
- Extended claiming period
- Multiple reminders
>>>>>>> origin/pr9

## FAQ

**Q: When can I claim?**
<<<<<<< HEAD
A: After airdrop announcement and claim period opens.

**Q: Is there a deadline?**
A: Typically no hard deadline, but claim as soon as possible.

**Q: Do I need to pay to claim?**
A: On-chain claims require gas fees. Off-chain claims are free.

**Q: Can someone else claim for me?**
A: No. Claims require signature from the allocated address.

**Q: What if I lose access to my wallet?**
A: Unfortunately, tokens cannot be recovered without wallet access.

**Q: Can I claim to a different address?**
A: No. Tokens must be claimed to the allocated address.

**Q: Do I need to claim immediately?**
A: No, but vesting starts from the snapshot date regardless of when you claim.

**Q: What if I'm not in the allocation?**
A: Review [eligibility.md](eligibility.md) and participate in future snapshots.

## Resources

### Documentation

- [merkle.md](merkle.md) - Merkle tree technical details
- [eligibility.md](eligibility.md) - Who can participate
- [snapshot.md](snapshot.md) - Governance voting

### Tools

- Block explorers for transaction verification
- Wallet providers (MetaMask, WalletConnect)
- Gas price trackers

### Official Announcements

- GitHub Releases
- GitHub Discussions
- Official blog/website

---

**Status**: Guide Ready - Awaiting Airdrop Deployment

**Last Updated**: 2026-01-01

**Support**: governance@cuberai.example
=======
A: Check announcement for specific dates. Typically 7 days after announcement.

**Q: How long do I have to claim?**
A: 90 days from opening. After that, unclaimed tokens return to treasury.

**Q: What if I miss the deadline?**
A: Contact DAO governance. May be included in future distribution.

**Q: Can I claim for someone else?**
A: No. Proof and address must match. Each address claims their own tokens.

**Q: What if I made a mistake?**
A: Once claimed, transaction is irreversible. Double-check before confirming!

**Q: Are there fees?**
A: Only gas fees (for on-chain claims). No platform fees.

**Q: Can I claim partial amounts?**
A: No. Must claim full allocation in single transaction.

**Q: What if contract runs out of tokens?**
A: Contact team immediately. Will be refilled from treasury.

## Resources

- [DAO Overview](README.md)
- [Eligibility Criteria](eligibility.md)
- [Merkle Airdrop Details](merkle.md)
- [Scoring Formula](scoring.md)

---

Last updated: 2026-01-01
>>>>>>> origin/pr9
=======
✅ **Verify everything:**
- Official website URL
- Contract address
- Allocation amount
- Transaction details

✅ **Protect your wallet:**
- Use hardware wallet for large amounts
- Never share seed phrase
- Verify all transactions
- Use reputable wallet software

### During Claiming

✅ **Be cautious:**
- Review all transaction details
- Don't rush under time pressure
- Check gas fees are reasonable
- Verify recipient address

### After Claiming

✅ **Secure your tokens:**
- Move to secure wallet
- Enable additional security (2FA, etc.)
- Keep seed phrase safe
- Monitor wallet activity

### Avoiding Scams

❌ **Never:**
- Share seed phrase or private keys
- Click suspicious links in DMs
- Send tokens to "verify" eligibility
- Use unofficial claiming interfaces
- Connect wallet to unknown sites

⚠️ **Red Flags:**
- Unsolicited DMs about claiming
- Requests for payment to claim
- "Limited time" pressure tactics
- Unofficial websites or contracts
- Requests for more than signature approval

## FAQ

### General

**Q: When can I claim?**  
A: After claiming period opens (announced separately from snapshot)

**Q: How long do I have to claim?**  
A: 12 months from claiming opening

**Q: Is there a claim fee?**  
A: Only network gas fees, no additional protocol fees

**Q: Can I claim to a different address?**  
A: No, must claim to registered address

### Technical

**Q: Which networks are supported?**  
A: Announced with claiming details (varies by implementation)

**Q: Can I claim multiple times?**  
A: No, each address can claim only once

**Q: What if I lose access to my address?**  
A: Very limited recovery options; secure your wallet

**Q: Can I transfer before claiming?**  
A: No, must claim first, then transfer

### Timing

**Q: What happens to unclaimed tokens?**  
A: After 12 months, may be redistributed per governance

**Q: Can I claim in batches?**  
A: No, must claim full allocation at once

**Q: Is there a claim deadline extension?**  
A: Only for extraordinary circumstances; request via GitHub

## Additional Resources

### Documentation
- [eligibility.md](eligibility.md) - Eligibility criteria
- [scoring.md](scoring.md) - How allocations are calculated
- [merkle.md](merkle.md) - Technical details of merkle trees
- [snapshot.md](snapshot.md) - Snapshot process

### Tools
- Claiming interface (link in announcement)
- Block explorer for transaction verification
- Gas price trackers
- Wallet software

### Support
- GitHub Discussions: General questions
- GitHub Issues: Technical problems
- security@cyberai.network: Security concerns

## Claiming Checklist

Before claiming, verify:

- [ ] Checked eligibility and allocation amount
- [ ] Registered wallet address
- [ ] Downloaded supported wallet
- [ ] Added sufficient gas to wallet
- [ ] Verified official claiming interface URL
- [ ] Reviewed security best practices
- [ ] Understood transaction details
- [ ] Ready to claim (not rushed)

---

**Last Updated**: 2026-01-01  
**Claiming Status**: Not yet open (snapshot planning phase)  
**Support**: GitHub Discussions (tag: `dao-claiming`)
>>>>>>> origin/pr10
