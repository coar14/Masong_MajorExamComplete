let inventory = [];
let selectedMedicineItems = [];

function addMedicine() {
    const brandName = prompt("Enter Brand Name:");
    const genericName = prompt("Enter Generic Name:");
    const quantity = parseFloat(prompt("Enter Quantity:"));
    const price = parseFloat(prompt("Enter Price:"));

    if (brandName && genericName && !isNaN(quantity) && !isNaN(price)) {
        inventory.push({ brandName, genericName, quantity, price });
        displayInventory();
    } else {
        alert("Invalid input. Please try again.");
    }
}

function displayInventory() {
    const inventoryTable = document.querySelector("#inventory table");
    inventoryTable.innerHTML = "<tr><th>Brand Name</th><th>Generic Name</th><th>Quantity</th><th>Price</th><th>Action</th></tr>";

    for (let i = 0; i < inventory.length; i++) {
        const item = inventory[i];
        const row = `<tr>
            <td>${item.brandName}</td>
            <td>${item.genericName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>
                <button class="button edit" onclick="editMedicine(${i})">Edit</button>
                <button class="button remove" onclick="removeMedicine(${i})">Remove</button>
            </td>
        </tr>`;
        inventoryTable.innerHTML += row;
    }

    updateMedicineSelect();
}


function editMedicine(index) {
    const newQuantity = parseFloat(prompt("Enter the new quantity:"));
    if (!isNaN(newQuantity) && newQuantity >= 0) {
        inventory[index].quantity = newQuantity;
        displayInventory();
    } else {
        alert("Invalid input. Please enter a valid quantity.");
    }
}

function removeMedicine(index) {
    if (confirm(`Are you sure you want to remove ${inventory[index].brandName} - ${inventory[index].genericName}?`)) {
        inventory.splice(index, 1);
        displayInventory();
    }
}


function updateMedicineSelect() {
    const selectMedicine = document.querySelector("#selectMedicine");
    selectMedicine.innerHTML = "<option value=''>Select Medicine</option>";

    for (const item of inventory) {
        selectMedicine.innerHTML += `<option value="${item.brandName}">${item.brandName}</option>`;
    }
}

function addToCart() {
    const selectedMedicine = document.querySelector("#selectMedicine").value;
    const quantity = parseFloat(document.querySelector("#quantity").value);

    if (selectedMedicine && !isNaN(quantity)) {
        const item = inventory.find(item => item.brandName === selectedMedicine);

        if (item && item.quantity >= quantity) {
            const price = item.price;
            const subtotal = price * quantity;

            selectedMedicineItems.push({ brandName: item.brandName, genericName: item.genericName, quantity, price, subtotal });
            displaySelectedMedicine();

            const buyerNameInput = document.getElementById('buyerName');
            const displayName = document.getElementById('displayname');
            displayName.textContent = buyerNameInput.value;

            const totalAmount = calculateTotalAmount(selectedMedicineItems);
            displayTotalAmount(totalAmount);

            item.quantity -= quantity;
            displayInventory();

            if (confirm("Do you want to buy more medicine?")) {
                document.querySelector("#selectMedicine").value = "";
                document.querySelector("#quantity").value = "";
            } else {
                displaySelectedMedicine();
            }
        } else {
            alert("Invalid quantity or medicine not found.");
        }
    } else {
        alert("Invalid input. Please try again.");
    }
}
function calculateTotalAmount(selectedMedicineItems) {
    let totalAmount = 0;
    for (const item of selectedMedicineItems) {
        totalAmount += item.subtotal;
    }
    return totalAmount.toFixed(2);
}

function displayTotalAmount(totalAmount) {
    const totalAmountElement = document.querySelector("#totalAmount");
    totalAmountElement.textContent = `${totalAmount}`;
}


function displaySelectedMedicine() {
    const selectedMedicineTable = document.querySelector("#selectedMedicine table");
    selectedMedicineTable.innerHTML = "<tr><th>Brand Name</th><th>Generic Name</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>";

    for (const item of selectedMedicineItems) {
        selectedMedicineTable.innerHTML += `<tr><td>${item.brandName}</td><td>${item.genericName}</td><td>${item.quantity}</td><td>${item.price.toFixed(2)}</td><td>₱${item.subtotal.toFixed(2)}</td></tr>`;
    }
}

displayInventory();

function checkout() {
    if (selectedMedicineItems.length > 0) {
        const totalAmount = parseFloat(document.querySelector("#totalAmount").textContent);
        openCustomAlert(`Total Amount: ₱${totalAmount} Medicines have been bought successfully!`);
        selectedMedicineItems = [];
        buyerName.textContent='';
        displayName.textContent='';
    } else {
        openCustomAlert("No medicines have been bought. Please select medicines to purchase.");
    }
}

function openCustomAlert(message) {
    document.getElementById('customAlertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    displaySelectedMedicine();
    totalAmount.textContent = '';
    buyerName.textContent='';
}
