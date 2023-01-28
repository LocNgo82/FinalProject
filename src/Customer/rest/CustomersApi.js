// const CUSTOMERS_ENDPOINT = "https://ancient-taiga-31359.herokuapp.com/api/customers";
const CUSTOMERS_ENDPOINT = "https://63540cf4ccce2f8c020237cf.mockapi.io/Promineo_Tech_API/invoices"
// REST API to get, put, post, and delete records
class CustomersApi {
    // retrieve customer information from the server
    get = async () => {
        try {
            const resp = await fetch(CUSTOMERS_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log("Oops, looks like fetchCustomers had an issue.", e);
        }

    }
    // update customer information from the server
    put = async(customer) => {
        try {
            const resp = await fetch(`${CUSTOMERS_ENDPOINT}/${customer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            return await resp.json();
        } catch(e) {
            console.log("Oops, looks like updating customers had an issue.", e);
        }
    }

    // // add a new customer to the server
    post = async(customerName,synopsis) => {
        try {
            const resp = await fetch(`${CUSTOMERS_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: `${customerName}`,
                synopsis: `${synopsis}`})
            });
            return await resp.json();
        } catch(e) {
            console.log("Oops, looks like adding customer had an issue.", e);
        }
    }

    // delete a customer information from the server
    delete = async(customerId) => {
        try {
            const resp = await fetch(`${CUSTOMERS_ENDPOINT}/${customerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }                
            });
            return await resp.json();
        } catch(e) {
            console.log("Oops, looks like delete customer had an issue.", e);
        }
    }
}

export const customersApi = new CustomersApi();