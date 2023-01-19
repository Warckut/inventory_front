import React from 'react'
import './Table.css'

const Table = ({rows, columns}: any) => {

    return (
        <table className="table">
            <thead>
                <tr className="table__header">
                    {columns.map( (column: any) => {
                        return (
                            <th key={column} className="table__column">{column}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: any)=> {
                    const rowFields = Object.keys(row)
                    return (
                        <tr key={row.id} className="table__row">
                            {rowFields.map((field:any) => {
                                return (<td key={field + row.id} className="table__column">{row[field]}</td>)
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table