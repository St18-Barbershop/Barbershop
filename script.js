// Handle form submission for new customer
document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect customer data
    const name = document.getElementById('name').value;
    const sale = parseFloat(document.getElementById('sale').value);
    const paymentMethod = document.getElementById('payment_method').value;

    // Retrieve customers and sales data from localStorage
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let totalSales = parseFloat(localStorage.getItem('totalSales')) || 0;
    let totalCash = parseInt(localStorage.getItem('totalCash')) || 0;
    let totalQR = parseInt(localStorage.getItem('totalQR')) || 0;

    // Create a new customer
    const customer = {
        id: customers.length + 1, // unique customer ID
        name: name,
        sale: sale,
        paymentMethod: paymentMethod
    };

    // Add customer to list
    customers.push(customer);

    // Update total sales
    totalSales += sale;
    if (paymentMethod === 'cash') {
        totalCash++;
    } else {
        totalQR++;
    }

    // Save updated data to localStorage
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('totalSales', totalSales);
    localStorage.setItem('totalCash', totalCash);
    localStorage.setItem('totalQR', totalQR);

    // Update customer list and summary
    displayCustomers();
    displaySummary();
});

// Display customer list and summary
function displayCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerList = document.getElementById('customer-list');
    const customerSelect = document.getElementById('customer-id');
    customerList.innerHTML = '';
    customerSelect.innerHTML = '';

    customers.forEach(customer => {
        // Display customer info in the list
        customerList.innerHTML += `<p><strong>${customer.name}</strong> - $${customer.sale.toFixed(2)} (${customer.paymentMethod})</p>`;

        // Populate dropdown for customer selection
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name;
        customerSelect.appendChild(option);
    });
}

// Display sales summary (total sales, cash, and QR)
function displaySummary() {
    const totalSales = parseFloat(localStorage.getItem('totalSales')) || 0;
    const totalCash = parseInt(localStorage.getItem('totalCash')) || 0;
    const totalQR = parseInt(localStorage.getItem('totalQR')) || 0;

    document.getElementById('total-sales').textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById('total-cash').textContent = totalCash;
    document.getElementById('total-qr').textContent = totalQR;
}

// Handle form submission for updating customer sale
document.getElementById('sale-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerId = parseInt(document.getElementById('customer-id').value);
    const newSale = parseFloat(document.getElementById('new-sale').value);

    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let totalSales = parseFloat(localStorage.getItem('totalSales')) || 0;
    let totalCash = parseInt(localStorage.getItem('totalCash')) || 0;
    let totalQR = parseInt(localStorage.getItem('totalQR')) || 0;

    // Find the customer and update the sale
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        // Update total sales and the customer sale
        totalSales -= customer.sale;  // Remove previous sale
        totalSales += newSale;         // Add new sale
        customer.sale = newSale;       // Update the customer's sale

        // Update payment counts if payment method changed
        if (customer.paymentMethod === 'cash') {
            totalCash--;
        } else {
            totalQR--;
        }
        if (newSale > 0) {
            if (customer.paymentMethod === 'cash') {
                totalCash++;
            } else {
                totalQR++;
            }
        }

        // Save updated data to localStorage
        localStorage.setItem('customers', JSON.stringify(customers));
        localStorage.setItem('totalSales', totalSales);
        localStorage.setItem('totalCash', totalCash);
        localStorage.setItem('totalQR', totalQR);

        // Refresh customer list and sales summary
        displayCustomers();
        displaySummary();
    }
});

// Initialize customer data and display when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCustomers();
    displaySummary();
});
