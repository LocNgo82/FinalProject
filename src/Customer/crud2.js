import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import $ from '../../node_modules/jquery/dist/jquery.min.js';

export class Customer {
    constructor(name) {
        this.name = name;
        this.items = [];    
    }
    
}

export class Item {
    constructor(name, cost, quantity) {
        this.name = name;
        this.cost = cost;
        this.quantity = quantity;
    }
}

export class CustomerService {                                    
    // static url = "https://ancient-taiga-31359.herokuapp.com/api/Customers";
    // static url = "https://crudcrud.com/api/e3dc4dde37ca44e08762774295b456ce";
    static url = "https://63540cf4ccce2f8c020237cf.mockapi.io/Promineo_Tech_API/invoices";
    static getAllCustomers() {
        return $.get(this.url);
    }

    static getCustomer(id) {
        return $.get(this.url + `${id}`);
    }

    static createCustomer(Customer) {
        return $.post(this.url, Customer);
        
    }


    static updateCustomer(Customer) {
        return $.ajax({
            url: this.url + `/${Customer.id}`,
            dataType: 'json',
            data: JSON.stringify(Customer),
            contentType: 'application/json',
            type: 'PUT'
           
        });
    }

    static deleteCustomer(id) {
        return $.ajax({
            url: this.url + `/${id}`,   
            type: 'DELETE'
            // crossDomain: true, //set the cross domain to be true
        });
    }
}

export class DOMManager {
    static Customers;

    static getAllCustomers() {
        CustomerService.getAllCustomers().then(Customers => this.render(Customers));
    }

    static createCustomer(name) {
        console.log("create Customer");
        CustomerService.createCustomer(new Customer(name))
        .then(() => {
            return CustomerService.getAllCustomers();
        })
        .then((Customers) => this.render(Customers));
    }

    static deleteCustomer(id) {
        CustomerService.deleteCustomer(id) 
        .then( () => {
            return CustomerService.getAllCustomers();
        })
        .then((Customers) => this.render(Customers));
    }

    static addItem(id) {
        for (let customer of this.Customers) {
            if (customer.id == id) {     
                let name = $(`#${customer.id}-item-name`).val();
                let cost = $(`#${customer.id}-item-cost`).val();
                let quantity = $(`#${customer.id}-item-quantity`).val();
                customer.items.push(new Item(name, cost, quantity));
                CustomerService.updateCustomer(customer)
                .then(() => {
                    return CustomerService.getAllCustomers();
                })
                .then((Customers) => this.render(Customers));
            }
        }
    }

    static deleteitem(CustomerId, itemNumber) {
        for (let customer of this.Customers) {
            if (customer.id == CustomerId) {
                
                customer.items.splice(itemNumber,1);
                CustomerService.updateCustomer(customer)
                        .then(() => {
                            return CustomerService.getAllCustomers();
                        })
                        .then((Customers) => this.render(Customers));                                
            }
        }
    }

    static render(Customers) {
        this.Customers = Customers;
        $('#app').empty();
        for (let Customer of Customers) {
            $('#app').prepend(
                `<div id="${Customer.id}" className="card">
                <div className="card-header">
                    <h2>${Customer.name}-${Customer.id}</h2>
                    <button className="btn btn-danger" onclick="DOMManager.deleteCustomer('${Customer.id}')">Delete</button>
                </div>
                <div className="card-body">
                    <div className="card">
                        <div className="row">                        
                            <div className="col-sm">
                                <input type="text" id="${Customer.id}-item-name" className="form-control" placeholder="item Name">
                            </div>
                            <div className="col-sm">
                                <input type="text" id="${Customer.id}-item-cost" className="form-control" placeholder="item cost">
                            </div>
                            <div className="col-sm">
                                <input type="text" id="${Customer.id}-item-quantity" className="form-control" placeholder="item quantity">
                            </div>
                        </div>
                        <button id="${Customer.id}-new-item" onclick="DOMManager.addItem('${Customer.id}')"
                                className="btn btn-primary form-control">Add</button>
                    </div>
    
                </div>
            </div><br>
             `
            );
            // let size = Customer.items.lenght;
            // for (let i=0; i<size; i++) {
            // table header
            if (Customer.items.length > 0) {
            $(`#${Customer.id}`).find('.card-body').append(
            `<p>
                <div className="card">
                    <div className="row">                        
                            <div className="col-sm">
                            <span>Item#:</span>
                            </div>
                            <div className="col-sm">
                            <span"><strong>Name: </strong> </span>
                            </div>
                            <div className="col-sm">
                            <span ><strong>cost: </strong> </span>
                            </div>
                            <div className="col-sm">
                            <span ><strong>quantity: </strong> </span>
                            </div>
                            <div className="col-sm">
                            <span ><strong>Subtotal: </strong></span>
                            </div>
                            <div className="col-sm">
                            
                            </div>
                            
                        </div>

                </div>
                </p>`);
            
            let count = 1;
            let total = 0;
            for (let item of Customer.items) {
                // let item = Customer.items[i];
                let subtotal = item.cost * item.quantity;
                total += subtotal;
                $(`#${Customer.id}`).find('.card-body').append(
                    `<p>
                    <div className="card">
                    <div className="row">                        
                            <div className="col-sm">
                            <span>${count}</span>
                            </div>
                            <div className="col-sm">
                            <span id="name-${count}">${item.name}</span>
                            </div>
                            <div className="col-sm">
                            <span id="cost-${count}">${item.cost}</span>
                            </div>
                            <div className="col-sm">
                            <span id="quantity-${count}">${item.quantity}</span>
                            </div>
                            <div className="col-sm">
                            <span id="subtotal-${count}">${subtotal}</span>
                            </div>
                            <div className="col-sm">
                            <button className="btn btn-danger" onclick="DOMManager.deleteitem('${Customer.id}', '${count-1}')">
                                Delete item</button>
                            </div>
                            
                        </div>

                    </div>
                    </p>
                    `
                )
                count++;
            }
            if (total > 0) {
            $(`#${Customer.id}`).find('.card-body').append(
            `<p>
            <div className="card">
            <div className="row">                        
                    <div className="col-sm">
                
                    </div>
                    <div className="col-sm">
                    
                    </div>
                    <div className="col-sm">
                    
                    </div>
                    <div className="col-sm">
                    <span "><strong>Total: </strong> </span>
                    </div>
                    <div className="col-sm">
                    <span ><strong>${total} </strong></span>
                    </div>
                    <div className="col-sm">
                    
                    </div>
                    
                </div>

            </div>
            </p>`
            );
            }
            }
        }
    }
}

$("#create-new-customer").on( "click", function() {
    console.log("click");
    let name = $('#new-customer-name').val();
    DOMManager.createCustomer($('#new-customer-name').val());
    $('#new-Customer-name').val('');
  });


DOMManager.getAllCustomers();

