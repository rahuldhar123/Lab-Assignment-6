const fs =  require('fs');

var fetchCustomers = () => {
    try {
        var customers = fs.readFileSync('customers_info.json')
        return JSON.parse(customers);
    } catch(e){
        return [];
    }
};

var saveCustomers = (customers) => {
    fs.writeFileSync('customers_info.json',JSON.stringify(customers));
};



var addCustomer = (customer_id,customer_name, customer_email) => {
    var customers = fetchCustomers();
    var customer = {customer_id,customer_name, customer_email}

    var duplicateCustomers =  customers.filter((customer) => {
        return customer.customer_id === customer_id;
    });

    if (duplicateCustomers.length === 0){
        customers.push(customer);
        saveCustomers(customers);
        return customer
    }

};


var getAll = () => {
    return fetchCustomers();
};



var getCustomer = (customer_id) => {

    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {
        return customer.customer_id === customer_id;
    });

    return getCustomers[0]

};


var remove = (customer_id) => {

    var customers = fetchCustomers();

    var filteredCustomers =  customers.filter((customer) => {
        return customer.customer_id !== customer_id;
    });

    saveCustomers(filteredCustomers);

    return customers.length !== filteredCustomers.length

};

var update = (customer_id, customer_name, customer_email) => {

    var customer = getCustomer(customer_id);
    if(customer){
        remove(customer_id);
        return addCustomer(customer_id, customer_name, customer_email);
    }

};


var logCustomer = (customer) => {
    console.log('--');
    console.log(`Customer Id: ${customer.customer_id}`);
    console.log(`Customer Name: ${customer.customer_name}`);
    console.log(`Customer Email: ${customer.customer_email}`);

};

module.exports = {
    addCustomer, getAll, remove, getCustomer,logCustomer, update
};
