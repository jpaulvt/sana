// This component renders detailed provider info as a table displaying name, NPI, and addresses
import React, {useState, useEffect, useCallback} from 'react'

function ProviderInfo(props) {
    let infoMsg = "No results found."
    if (props.providerResults && props.providerResults.result_count > 0) {
        infoMsg = ""
    }
    const renderTableHeader = () => {
        let header = [{columnName: 'Name', class: 'name'},
            {columnName: 'NPI Number', class: 'npi'},
            {columnName: 'Address(es)', class: 'address'}]
        return header.map((key, index) => {
            return <th key={index}>{key.columnName}</th>
        })
    }

    const renderTableData = (providerResults) => {
        return providerResults.map((key) => {
            return <tr>
                <td>{key.basic.first_name + ' ' + (key.basic.middle_name ? key.basic.middle_name + ' ' : '') + key.basic.last_name + ' ' + key.basic.credential}</td>
                <td>{key.enumeration_type}</td>
                <td>{key.addresses.map((address) => {
                    return (
                        <p>
                        {address.address_purpose}:<br/>
                        {address.address_1 && address.address_1 + "\n"}
                        {address.address_2 && address.address_2 + "\n"}
                        {address.city}, {address.state} {address.postal_code.length === 9 ? address.postal_code.replace(/(\d{5})/, "$1-") : address.postal_code}
                        {address.telephone_number && "\nPh: " + address.telephone_number}
                    </p>)
                })}
                </td>
            </tr>
        })
        return "<div/>"
    }

    return (
        <div className="provider-info">
            {infoMsg}
            {props.providerResults && props.providerResults.result_count > 0 && (
                <table>
                    <colgroup>
                        <col style={{width : '40%'}}/>
                        <col style={{width : '20%'}}/>
                        <col style={{width : '40%'}}/>
                    </colgroup>
                        <tr>
                            {renderTableHeader()}
                        </tr>
                        {renderTableData(props.providerResults.results)}
                </table>
            )}
        </div>
    )
}

export default ProviderInfo
