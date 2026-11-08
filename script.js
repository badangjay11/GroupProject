// TEST TEST
// BUSINESS MANAGEMENT APP

document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.background = "#f1f5f9";

document.getElementById("app").innerHTML = `
<style>
    * { box-sizing: border-box; }

    .sidebar {
        width: 220px;
        height: 100vh;
        background: #172554;
        color: white;
        position: fixed;
        padding: 25px 15px;
    }

    .sidebar h2 { text-align: center; }

    .sidebar button {
        display: block;
        width: 100%;
        padding: 13px;
        margin: 10px 0;
        border: none;
        background: transparent;
        color: white;
        text-align: left;
        cursor: pointer;
        border-radius: 6px;
    }

    .sidebar button:hover {
        background: #2563eb;
    }

    .main {
        margin-left: 220px;
        padding: 30px;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin: 20px 0;
    }

    .card {
        background: white;
        padding: 22px;
        border-radius: 10px;
        box-shadow: 0 2px 6px #ddd;
    }

    .card h3 { color: #64748b; }

    input, select {
        padding: 10px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .add-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 11px 18px;
        border-radius: 5px;
        cursor: pointer;
    }

    table {
        width: 100%;
        background: white;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        padding: 13px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th { background: #dbeafe; }

    .delete {
        background: #dc2626;
        color: white;
        border: none;
        padding: 7px;
        cursor: pointer;
        border-radius: 4px;
    }

    .section {
        display: none;
    }

    .section.active {
        display: block;
    }

    @media(max-width: 700px) {
        .sidebar { width: 150px; }
        .main { margin-left: 150px; padding: 12px; }
        .cards { grid-template-columns: 1fr; }
        table { font-size: 12px; }
    }
</style>

<div class="sidebar">
    <h2>My Business</h2>
    <button onclick="showPage('dashboard')">Dashboard</button>
    <button onclick="showPage('products')">Products</button>
    <button onclick="showPage('sales')">Sales</button>
    <button onclick="showPage('customers')">Customers</button>
</div>

<div class="main">

    <section id="dashboard" class="section active">
        <h1>Dashboard</h1>
        <p>Welcome to your Business Management System!</p>

        <div class="cards">
            <div class="card">
                <h3>Total Products</h3>
                <h1 id="totalProducts">0</h1>
            </div>

            <div class="card">
                <h3>Total Sales</h3>
                <h1 id="totalSales">₱0.00</h1>
            </div>

            <div class="card">
                <h3>Total Customers</h3>
                <h1 id="totalCustomers">0</h1>
            </div>
        </div>
    </section>

    <section id="products" class="section">
        <h1>Product Inventory</h1>

        <input type="text" id="productName"
            placeholder="Product Name">

        <input type="number" id="productPrice"
            placeholder="Price">

        <input type="number" id="productQuantity"
            placeholder="Quantity">

        <button class="add-btn" onclick="addProduct()">
            Add Product
        </button>

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="productList"></tbody>
        </table>
    </section>

    <section id="sales" class="section">
        <h1>Sales Management</h1>

        <input type="text" id="saleName"
            placeholder="Product Sold">

        <input type="number" id="saleAmount"
            placeholder="Amount">

        <button class="add-btn" onclick="addSale()">
            Record Sale
        </button>

        <table>
            <thead>
                <tr>
                    <th>Product Sold</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="salesList"></tbody>
        </table>
    </section>

    <section id="customers" class="section">
        <h1>Customer Management</h1>

        <input type="text" id="customerName"
            placeholder="Customer Name">

        <input type="text" id="customerContact"
            placeholder="Contact Number">

        <button class="add-btn" onclick="addCustomer()">
            Add Customer
        </button>

        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="customerList"></tbody>
        </table>
    </section>

</div>
`;

let products = [];
let sales = [];
let customers = [];

// CHANGE PAGE

function showPage(page) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");
}

// ADD PRODUCT

function addProduct() {
    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("productPrice").value);
    let quantity = Number(document.getElementById("productQuantity").value);

    if (!name.trim() || price <= 0 || quantity <= 0 ||
        !Number.isFinite(price) || !Number.isInteger(quantity)) {
        alert("Please enter valid product information.");
        return;
    }

    products.push({ name, price, quantity });

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQuantity").value = "";

    displayProducts();
    updateDashboard();
}

// DISPLAY PRODUCTS

function displayProducts() {
    let list = document.getElementById("productList");

    list.innerHTML = products.map((product, index) => `
        <tr>
            <td>${escapeHTML(product.name)}</td>
            <td>₱${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="delete"
                    onclick="deleteProduct(${index})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

// DELETE PRODUCT

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    updateDashboard();
}

// ADD SALE

function addSale() {
    let name = document.getElementById("saleName").value;
    let amount = Number(document.getElementById("saleAmount").value);

    if (!name.trim() || amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter valid sale information.");
        return;
    }

    sales.push({ name, amount });

    document.getElementById("saleName").value = "";
    document.getElementById("saleAmount").value = "";

    displaySales();
    updateDashboard();
}

// DISPLAY SALES

function displaySales() {
    let list = document.getElementById("salesList");

    list.innerHTML = sales.map((sale, index) => `
        <tr>
            <td>${escapeHTML(sale.name)}</td>
            <td>₱${sale.amount.toFixed(2)}</td>
            <td>
                <button class="delete"
                    onclick="deleteSale(${index})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

// DELETE SALE

function deleteSale(index) {
    sales.splice(index, 1);
    displaySales();
    updateDashboard();
}

// ADD CUSTOMER

function addCustomer() {
    let name = document.getElementById("customerName").value;
    let contact = document.getElementById("customerContact").value;

    if (!name.trim() || !contact.trim()) {
        alert("Please complete customer information.");
        return;
    }

    customers.push({ name, contact });

    document.getElementById("customerName").value = "";
    document.getElementById("customerContact").value = "";

    displayCustomers();
    updateDashboard();
}

// DISPLAY CUSTOMERS

function displayCustomers() {
    let list = document.getElementById("customerList");

    list.innerHTML = customers.map((customer, index) => `
        <tr>
            <td>${escapeHTML(customer.name)}</td>
            <td>${escapeHTML(customer.contact)}</td>
            <td>
                <button class="delete"
                    onclick="deleteCustomer(${index})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

// DELETE CUSTOMER

function deleteCustomer(index) {
    customers.splice(index, 1);
    displayCustomers();
    updateDashboard();
}

// DASHBOARD

function updateDashboard() {
    document.getElementById("totalProducts").textContent =
        products.length;

    let total = sales.reduce((sum, sale) =>
        sum + sale.amount, 0);

    document.getElementById("totalSales").textContent =
        "₱" + total.toFixed(2);

    document.getElementById("totalCustomers").textContent =
        customers.length;
}

// PREVENT HTML INJECTION IN TEXT VALUES

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

updateDashboard();
