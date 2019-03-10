const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const customers = require('./customer_application.js');

// ------------ Begin - command configuration -----------------


const idOptions = {
    describe: 'Cust Id',
    demand : true,
    alias : 'id'
}

const nameOptions = {
    describe: 'Cust Name',
    demand : true,
    alias : 'name'
}

const mailOptions = {
    describe: 'Cust Mail',
    demand : true,
    alias : 'email'
}

const argv =  yargs

    .command('add','Add a new customer along with id name and email',{
        customer_id: idOptions,
        customer_name: nameOptions,
        customer_email: mailOptions
    })
    .command('list','List all customers details')
    .command('read','Read a note',{
        customer_id: idOptions
    })
    .command('remove','Remove a customer from the customer_info',{
        customer_id: idOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.id,argv.name,argv.email);
    if (customer){
        customers.logCustomer(customer);
    } else{
        console.log("Customer already exists");
    }
}

else if (command === 'list') {
    var AllCustomers = customers.getAll();
    console.log(`Printing ${AllCustomers.length} customer(s).`);
    AllCustomers.forEach((customer)=>{
        customers.logCustomer(customer);
    });
}

else if (command === 'read') {
    var customer = customers.getCustomer(argv.id);
    if(customer){
        customers.logCustomer(customer);
    }
    else{
        console.log("Customer not found");
    }
}

else if (command === 'remove') {
    var customer = customers.remove(argv.id);
    if(customer){
        console.log("Customer removed successfully");
    }
    else{
        console.log("Customer not found");
    }
}

else if (command === 'update') {
    var customer = customers.update(argv.id, argv.name,argv.email);
    if(customer){
        console.log("Customer Updated successfully");
    }
    else{
        console.log("Customer not found");
    }
}

else{
    console.log('command not recognized');
}
