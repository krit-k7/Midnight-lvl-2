# 🛡️ ComplyGuard dApp

> **Privacy-first regulatory compliance on the Midnight Network using Zero-Knowledge Proofs.**

![Midnight](https://img.shields.io/badge/Network-Midnight%20Preprod-4B0082?style=for-the-badge)
![Compact](https://img.shields.io/badge/Compact-v0.1.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite)

---

## 🌙 Overview:

**ComplyGuard** is a decentralized privacy-preserving compliance platform built on the **Midnight Preprod Network**.

Instead of exposing sensitive personal information, users prove their compliance using **Zero-Knowledge Proofs (ZKPs)**. The blockchain only records the compliance result while the underlying identity and credentials remain completely private.

---

## ✨ Key Features:

🔐 **Zero-Knowledge Compliance Verification**
- Verify regulatory eligibility without revealing confidential data.

🛡️ **Privacy by Default**
- Secret witness values never leave the client.

⚡ **On-Chain Validation**
- Smart contracts validate compliance proofs directly on Midnight.

👛 **Wallet Integration**
- Connect seamlessly using the Midnight Lace Wallet.

📜 **Transparent Audit Trail**
- Public verification status with private user information.

---

## 🔒 Privacy Model

### ✅ Public Information

- Validation status
- Transaction hash
- Contract execution
- Compliance event

### 🔐 Private Information

- Identity
- Personal credentials
- Secret witness
- Eligibility proof inputs

Only the proof is verified.

The sensitive information is **never stored on-chain**.

---

## 📊 Observable Behavior

The ZK circuit verifies that the submitted **eligibilityProof** satisfies compliance requirements.

After successful verification:

```text
isValidated: true
```

is recorded on-chain while every confidential input remains hidden.

This provides:

- ✅ Regulatory verification
- ✅ Complete user privacy
- ✅ Tamper-proof auditability

---

## 🚀 Live Demo

### 🌐 Frontend

https://midnight-lvl-2.vercel.app/

### 📄 Smart Contract

```text
0000000000000000000000000000000000000000000000000000000000000001::ComplyGuard
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---------|------------|
| Smart Contract | Compact v0.1.0 |
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Wallet | Midnight Lace Wallet |
| Network | Midnight Preprod |
| Privacy | Zero-Knowledge Proofs |

---

# 📂 Project Structure

```
ComplyGuard/
│
├── contract/
│   ├── main.compact
│   └── witness.ts
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── App.tsx
│
├── public/
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/ComplyGuard.git
```

Go inside

```bash
cd ComplyGuard
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

---

# 👛 Wallet Setup

1. Install **Midnight Lace Wallet**
2. Switch to **Midnight Preprod**
3. Connect your wallet
4. Submit a compliance proof
5. Observe on-chain validation

---

# 🔄 Verification Flow

```text
User
   │
   ▼
Generate Eligibility Proof
   │
   ▼
Zero-Knowledge Circuit
   │
   ▼
Compact Smart Contract
   │
   ▼
Proof Verified
   │
   ▼
Blockchain Records

isValidated = true
```

---

# 🔐 Why ComplyGuard?

✅ Privacy First

✅ No Identity Exposure

✅ Regulatory Friendly

✅ Tamper-Proof Verification

✅ Fully Decentralized

✅ Zero-Knowledge Security

---

# 📸 Screenshots

> Add screenshots of your application here.

```
/screenshots

Home.png

Wallet.png

ProofVerification.png

Success.png
```

---

# 🌍 Future Roadmap

- Multi-country compliance support
- KYC provider integrations
- Enterprise dashboards
- Compliance NFTs
- Role-based verification
- DID (Decentralized Identity)
- Cross-chain proof verification

---

# 🤝 Contributing

Contributions are welcome!

```bash
Fork → Create Branch → Commit → Push → Pull Request
```

---

# 📜 License

MIT License

---

<div align="center">

# 🛡️ ComplyGuard

### Privacy Preserved • Compliance Verified • Powered by Midnight 🌙

Built with ❤️ using **Compact**, **React**, **TypeScript**, and **Zero-Knowledge Proofs**

</div>
