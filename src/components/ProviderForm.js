import React, {useState, useEffect, useCallback} from 'react'
import {Form} from 'react-bootstrap';
import {STATE_LABEL_VALUES, NPI_URL} from '../constants';
import {Debounce} from './Utilities';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

// This component renders the provider form which includes state, last name, first name, and provider results
// It will automatically debounce user key input for 500ms before attempting to call the NPI API
// No submit button required :)
//
function ProviderForm() {
    const [search, setSearch] = useState({state: '', providerLastName: '', providerFirstName: ''});
    const [providerResults, setProviderResults] = useState('');
    // State for search status (whether there is a pending API request)
    const [, setIsSearching] = useState(false);

    const debouncedSearchTerm = Debounce(search, 500)

    const getProviderResults = useCallback((lastName, firstName, state) => {

        const url = NPI_URL + '?limit=200&first_name=' + firstName + '&last_name='
            + lastName + '&state=' + state + '&version=2.0'
        axios.get(url)
            .then((response) => {
                setProviderResults(JSON.stringify(response))
            })
    }, [])

    // This is triggered when debounced search term is triggered to automatically make a GET axios
    // call to fetch the response for the search terms entered
    useEffect(() => {

        if (debouncedSearchTerm.state !== '') {
            let trimmedFirstName = debouncedSearchTerm.providerFirstName.trim()
            trimmedFirstName = (trimmedFirstName.length >= 2) ? trimmedFirstName + '*' : trimmedFirstName
            let trimmedLastName = debouncedSearchTerm.providerLastName.trim() + '*'
            trimmedLastName = (trimmedLastName.length >= 2) ? trimmedLastName + '*' : trimmedLastName

            if (trimmedFirstName.length >= 3 || trimmedLastName.length >= 3) {
                setIsSearching(true)
                getProviderResults(trimmedLastName, trimmedFirstName, debouncedSearchTerm.state)
                setIsSearching(false)
            }
        }
    }, [debouncedSearchTerm, getProviderResults]);

    // The form is validated with Yup/Formik before proceeding
    return (
        <div>
            <Formik validationSchema={yup.object({
                firstName: yup.string().required("Required if last name empty"),
                lastName: yup.string().required("Required if first name empty"),
            })}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        stateName: '',
                    }}
                    onSubmit={{}}
            >
                {({
                      values,
                      touched,
                      errors,
                      handleChange
                  }) => (
                    <Form noValidate>
                        <Form.Group controlId="formState">
                            <Form.Label>Select Provider State</Form.Label>
                            <Form.Control value={values.stateName} as="select" name='stateName'
                                          onChange={(event) => {
                                              handleChange(event)
                                              setSearch({...search, state: event.target.value})
                                            }
                                          }
                                          isValid={touched.stateName}
                            >
                                <option value="" selected disabled hidden>
                                    Select a State
                                </option>
                                {STATE_LABEL_VALUES.map((state) => (
                                        <option value={state.value}>{state.label}</option>
                                    )
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formProviderLastName">
                            <Form.Label>Provider Last Name</Form.Label>
                            <Form.Control value={values.lastName} type="input" name="lastName"
                                          placeholder="Enter Provider Last Name"
                                          onChange={(event) => {
                                              handleChange(event)
                                              setSearch({...search, providerLastName: event.target.value})
                                            }
                                          }
                                          isValid={!errors.lastName}

                            />
                        </Form.Group>
                        <Form.Group controlId="formProviderFirstName">
                            <Form.Label>Provider First Name</Form.Label>
                            <Form.Control value={values.firstName} type="input" name="firstName"
                                          placeholder="Enter Provider First Name"
                                          onChange={(event) => {
                                              handleChange(event)
                                              setSearch({...search, providerFirstName: event.target.value})
                                            }
                                          }
                                          isValid={!errors.firstName}
                            />
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            Results:
            <div className="providerResults" style={{'padding-left': '30px'}}/>
            {JSON.stringify(providerResults)}
        </div>
    )
}

export default ProviderForm
