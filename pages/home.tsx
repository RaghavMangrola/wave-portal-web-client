import type { NextPage } from 'next'
import React, {useEffect} from 'react'
import {ethers} from 'ethers'

const Home: NextPage = () => {
    const checkIfWalletIsConnected = () => {
        const { ethereum } = window

        if (!ethereum) {
            console.log('Make sure you have metamask!')
            return
        } else {
            console.log('We have the ethereum object ', ethereum)
        }

        useEffect(() => {
            checkIfWalletIsConnected()
        }, [])
    }

    return (
        <div className='mainContainer'>
            <div className='dataContainer'>
                <div className='header'>
                👋🏽 Hey There!
                </div>

                <div className='bio'>
                    I am raghav and I work on event technology! Connect your Ethereum wallent and wave at me!
                </div>

                <button className='waveButton' onClick={null}>
                    Wave at Me
                </button>
            </div>
        </div>
    )
}

export default Home