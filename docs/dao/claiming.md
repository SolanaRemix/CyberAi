# Token Claiming Process

## Overview

This guide explains how to claim your SmartContractAudit DAO governance tokens after you've been included in an airdrop allocation.

## Prerequisites

Before you can claim:

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

## FAQ

**Q: When can I claim?**
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
