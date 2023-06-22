import React, { useMemo, useState, useEffect } from "react";
import { MetaMaskSDK } from '@metamask/sdk';

function MetaMask() {

    const [data, setData] = useState([]);

    const MMSDK = new MetaMaskSDK();
    const ethereum = MMSDK.getProvider();

    async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        setData(accounts[0])
        return accounts[0];
    }

    useEffect(() => { getAccount() }, []);

    ethereum.on('accountsChanged', getAccount);


    return (
        <p className='metamask'>Metamask : {data}</p>
    );
}
export default MetaMask;