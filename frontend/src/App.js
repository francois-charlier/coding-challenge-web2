import React, { useMemo, useState, useEffect } from "react";
import { MetaMaskSDK } from '@metamask/sdk';

import MetaMask from "./Metamask";
import SortingTable from "./sortingTable";

function App() {

    const currency = (data) => {
        return data.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
    }

    const compareNumericString = (rowA, rowB, id, desc) => {
        let a = Number.parseFloat(rowA.values[id]);
        let b = Number.parseFloat(rowB.values[id]);
        if (Number.isNaN(a)) {  // Blanks and non-numeric strings to bottom
            a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        }
        if (Number.isNaN(b)) {
            b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        }
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }

    const columns = useMemo(
        () => [
            {
                Header: "# ",
                accessor: "cmc_rank",
            },
            {
                Header: "Name ",
                accessor: "name",
                Cell: (props) => {
                    let img = "https://s2.coinmarketcap.com/static/img/coins/64x64/" + props.row.original.id +".png";
                return(
                    <>
                        <span class='name'><img src={img}></img> {props.row.original.name} &nbsp; <strong>{props.row.original.symbol}</strong></span>
                    </>
                )}
            },
            {
                Header: "Price ",
                id: 'quote.USD.price',
                accessor: d => Number(d.quote.USD.price).toFixed(2),
                sortMethod: (a, b) => Number(a) - Number(b),
                Cell: (props) => {
                    return <p>$ {Number(props.row.original.quote.USD.price).toFixed(3)}</p>;
                }
            },
            {
                Header: "1h % ",
                id: 'quote.USD.percent_change_1h',
                accessor: d => Number(d.quote.USD.percent_change_1h).toFixed(2),
                sortType: compareNumericString,
                Cell: (props) => {
                    return props.row.original.quote.USD.percent_change_1h > 0 ? (
                        <>
                            <span class='positive'><i class="fa fa-caret-up"></i> {(props.row.original.quote.USD.percent_change_1h).toFixed(2)}</span>
                        </>
                    ) : (
                        <>
                                <span class='negative'><i class="fa fa-caret-down"></i> {(props.row.original.quote.USD.percent_change_1h).toFixed(2)}</span>
                        </>
                    )
                }
            },
            {
                Header: "24h % ",
                id: 'quote.USD.percent_change_24h',
                sortType: compareNumericString,
                accessor: d => Number(d.quote.USD.percent_change_24h).toFixed(2),
                Cell: (props) => {
                    return props.row.original.quote.USD.percent_change_24h > 0 ? (
                        <>
                            <span class='positive'><i class="fa fa-caret-up"></i> {(props.row.original.quote.USD.percent_change_24h).toFixed(2)}</span>
                        </>
                    ) : (
                        <>
                                <span class='negative'><i class="fa fa-caret-down"></i> {(props.row.original.quote.USD.percent_change_24h).toFixed(2)}</span>
                        </>
                    )
                }
            },
            {
                Header: "7d % ",
                id: 'quote.USD.percent_change_7d',
                sortType: compareNumericString,
                accessor: d => Number(d.quote.USD.percent_change_7d).toFixed(2),
                Cell: (props) => {
                    return props.row.original.quote.USD.percent_change_7d > 0 ? (
                        <>
                            <span class='positive'><i class="fa fa-caret-up"></i> {(props.row.original.quote.USD.percent_change_7d).toFixed(2)}</span>
                        </>
                    ) : (
                        <>
                                <span class='negative'><i class="fa fa-caret-down"></i> {(props.row.original.quote.USD.percent_change_7d).toFixed(2)}</span>
                        </>
                    )
                }
            },
            {
                Header: "Volume (24h) ",
                id: 'quote.USD.market_cap',
                sortMethod: (a, b) => Number(a) - Number(b),
                sortType: compareNumericString,
                accessor: d => Number(d.quote.USD.market_cap).toFixed(2),
            }
        ],
        []
    );

    const [data, setData] = useState([]);

    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                setData(data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => { fetchUsers("/api") }, []);

    return (
        <div className="App">
            <h1>Coding Challenge Web 2.0</h1>
            <MetaMask></MetaMask>
            <SortingTable columns={columns} data={data} />
        </div>
    );
}
export default App;