import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";
import SortingTable from "./sortingTable";

function App() {

    const currency = (data) => {
        return data.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
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
                accessor: "quote.USD.price",
                Cell: (props) => (
                    <>
                        <span>{currency(props.row.original.quote.USD.price)}</span>
                    </>
                )
            },
            {
                Header: "1h % ",
                accessor: "quote.USD.percent_change_1h",
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
                accessor: "quote.USD.percent_change_24h",
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
                accessor: "quote.USD.percent_change_7d",
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
                accessor: "quote.USD.market_cap",
                Cell: (props) => (
                    <>
                        <span>{new Intl.NumberFormat(["ban", "id"]).format((props.row.original.quote.USD.volume_24h).toFixed(2))}</span>
                    </>
                )
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
            <SortingTable columns={columns} data={data} />
        </div>
    );
}
export default App;