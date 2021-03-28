import React, {useState, useEffect, useCallback} from 'react'
import {Form, Row, Col} from 'react-bootstrap';
import {STATE_LABEL_VALUES, NPI_URL} from '../constants';
import {Debounce} from './Utilities';
import axios from 'axios';
import ProviderInfo from './ProviderInfo'

// This component renders the provider form which includes state, last name, first name, and provider results
// It will automatically debounce user key input for 500ms before attempting to call the NPI API
// No submit button required :)
//
function ProviderForm() {
    const [search, setSearch] = useState({state: '', providerLastName: '', providerFirstName: ''});
    const [providerResults, setProviderResults] = useState('No results yet');
    // State for search status (whether there is a pending API request)
    const [, setIsSearching] = useState(false);

    const debouncedSearchTerm = Debounce(search, 500)

    const getProviderResults = useCallback((firstName, lastName, state) => {

        const url = NPI_URL + '?limit=10&first_name=' + firstName + '&last_name='
            + lastName + '&state=' + state + '&version=2.1&use_first_name_alias=True'
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            },
        })
            .then((response) => {
                if (response && response.data) {
                    setProviderResults(response.data)
                }
            })
    }, [])

    // This is triggered when debounced search term is triggered to automatically make a GET axios
    // call to fetch the response for the search terms entered
    useEffect(() => {
        if (debouncedSearchTerm.state !== '') {
            let firstName = debouncedSearchTerm.providerFirstName
            let lastName = debouncedSearchTerm.providerLastName
            // Only append wildcard after two chars entered other NPI API fails
            if (firstName.length >= 2) {
                firstName += '*'
            }
            if (lastName.length >= 2) {
                lastName += '*'
            }
            // Only search if firstname or lastname length long enough
            if (firstName.length >= 3 || lastName.length >= 3) {
                setIsSearching(true)
                getProviderResults(firstName, lastName, debouncedSearchTerm.state)
                setIsSearching(false)
            }
        }
    }, [debouncedSearchTerm, getProviderResults]);

    return (
        <div className="provider-form">
            First select a state where provider is located, then enter last name, first name, or both
            <br/>
            <br/>
                    <Form>
                        <Form.Group as={Row} controlId="formState">
                            <Form.Label column sm="1">State</Form.Label>
                            <Col sm="4">
                            <Form.Control size="sm" as="select" name='stateName' defaultValue=""
                                          onChange={(event) => {
                                              setSearch({...search, state: event.target.value})
                                            }
                                          }
                            >
                                <option key="" value="" disabled hidden>
                                    Select a State
                                </option>
                                {STATE_LABEL_VALUES.map((state) => (
                                        <option key={state.value} value={state.value}>{state.label}</option>
                                    )
                                )}
                            </Form.Control>
                           </Col>

                        </Form.Group>
                        {search.state !== "" &&

                        <Form.Group as={Row} controlId="formProviderLastName">
                            <Form.Label column sm="1">Last Name</Form.Label>
                            <Col sm="4">
                            <Form.Control size="sm" type="input" name="lastName"
                                          placeholder="Enter Provider Last Name (2 characters min)"
                                          onChange={(event) => {
                                              setSearch({...search, providerLastName: event.target.value})
                                            }
                                          }

                            />
                            </Col>
                            <Form.Label column sm="1">First Name</Form.Label>
                            <Col sm="5">

                                <Form.Control size="sm" type="input" name="firstName"
                                              placeholder="Enter Provider First Name (2 characters min)"
                                              onChange={(event) => {
                                                  setSearch({...search, providerFirstName: event.target.value})
                                              }
                                              }
                                />
                            </Col>
                        </Form.Group>
                        }
                    </Form>
            {search.state !== "" && (search.providerFirstName.length >= 2 || search.providerLastName.length >= 2) &&
                <ProviderInfo providerResults={providerResults}/>
            }
        </div>
    )
}

export default ProviderForm
