import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/WavePortal.json'

declare global {
  interface Window {
    ethereum:any
  }
}

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState('')

  const contractAddress = "0x99722fa618c632bF6fb40e25C42d70B2D7ee7f6E"

  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object ', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window as any

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())

        const waveTransaction = await wavePortalContract.wave()
        console.log("Mining... ", waveTransaction.hash)

        await waveTransaction.wait()
        console.log("Mined -- ", waveTransaction.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Retreived total wave count...", count.toNumber())

      } else {
        console.log("Etherum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="container mx-auto">
      👋🏽 Hey There! I am raghav and I work on event technology! Connect your
      Ethereum wallent and wave at me!
      <button onClick={wave}>Wave at Me</button>

      {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
    </div>
  )
}

export default Home