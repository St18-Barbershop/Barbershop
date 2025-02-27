let customers = [];
let totalSales = 0;
let totalCustomers = 0;
let cashPayments = 0;
let qrPayments = 0;

// Customer form submission
document.getElementById("customerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    
    // Add customer to the queue
    customers.push({ name, service, id: customers.length + 1 });
    
    // Update the queue on the dashboard
    updateQueue();
    
    // Clear form
    document.getElementById("name").value = '';
});

// Update the queue on the barber's dashboard
function updateQueue() {
    const queueList = document.getElementById("customerQueue");
    queueList.innerHTML = '';
    customers.forEach(customer => {
        const li = document.createElement("li");
        li.textContent = `${customer.name} - ${customer.service}`;
        li.addEventListener("click", function () {
            selectCustomer(customer);
        });
        queueList.appendChild(li);
    });
}

// Select customer for service
function selectCustomer(customer) {
    document.getElementById("customerName").textContent = customer.name;
    document.getElementById("customerService").textContent = customer.service;
    document.getElementById("selectedCustomer").style.display = 'block';
}

// Record sale
document.getElementById("recordSale").addEventListener("click", function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const paymentMethod = document.getElementById("paymentMethod").value;
    
    // Update totals
    totalSales += amount;
    totalCustomers++;
    
    if (paymentMethod === 'Cash') {
        cashPayments++;
    } else {
        qrPayments++;
    }
    
    // Update session summary
    updateSessionSummary();
    
    // Clear input
    document.getElementById("amount").value = '';
});

// Update session summary
function updateSessionSummary() {
    document.getElementById("totalSales").textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById("totalCustomers").textContent = totalCustomers;
    document.getElementById("cashPayments").textContent = cashPayments;
    document.getElementById("qrPayments").textContent = qrPayments;
}

// End session and hide selected customer interface
document.getElementById("endSession").addEventListener("click", function () {
    document.getElementById("sessionSummary").style.display = 'none';
    alert("Session Closed! Sales and customer data have been recorded.");
});
