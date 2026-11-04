const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'

});

document.getElementById('date-today').textContent = formattedDate;

// -------------------------------------------

const itemWarn = document.getElementById('item-warning');
let crateAmount = 0;

document.getElementById('add-item').addEventListener('click', function(){

  // ---------------------------- refresh messages - save added items
  itemWarn.textContent = ''; // for warning message
  const addedItems = document.querySelectorAll('.usedItems');
  
  const dropdown = document.getElementById('iDropdown');
  const itemCrateInfo = dropdown.options[dropdown.selectedIndex].classList;
  const sType = dropdown.value;
  const sText = dropdown.options[dropdown.selectedIndex].text;
  const container = document.getElementById('field-container');

  const wrapper = document.createElement('div');//----------- wrapper
  wrapper.classList.add('container');
  wrapper.classList.add('wrapper');
  const iName = document.createElement('p');  //------------ add name
  iName.textContent = `${sText}`;
  iName.classList.add('usedItems');
  iName.classList.add('fw6');

  // console.log(sType);

  // -------------------- returns if selection is on the default item
  if (sType === "default-item"){
    itemWarn.textContent = 'Invalid Option! Pick a valid item.'; 
    return;
  };
  // -------------------------------------- for preventing duplicates
  const itemExists = Array.from(addedItems).some(e => e.textContent === iName.textContent);
  if(itemExists){
    itemWarn.textContent = 
      'Item already selected! Pick a valid item.';
    return;
  }

  // console.log(itemCrateInfo[0]);
  if (
    itemCrateInfo[0] === 'ml300' || 
    itemCrateInfo[0] === 'ml440' || 
    itemCrateInfo[0] === 'ml500C' || 
    itemCrateInfo[0] === 'ml500HF' || 
    itemCrateInfo[0] === 'ml500PB'
  ) crateAmount = 24;
  if (itemCrateInfo[0] === 'l2') crateAmount = 6;
  if (itemCrateInfo[0] === 'l2R') crateAmount = 9;

  // console.log("Crate amount: " + crateAmount);

  // ------------------------------------- creates the fields to add
  const newModel = document.createElement('input');
  const newStock = document.createElement('input');
  const newOrder = document.createElement('input');

  newModel.type = 'number';
  newModel.name = `model_${sType}`;
  newModel.placeholder = 'Model';
  newModel.classList.add('first2');
  newModel.classList.add(`model_${sType}`)

  newStock.type = 'number';
  newStock.name = `stock_${sType}`;
  newStock.placeholder = 'Stock';
  newStock.classList.add('first2');
  newStock.classList.add(`stock_${sType}`)

  newOrder.type = 'number';
  newOrder.name = `order_${sType}`;
  newOrder.placeholder = 'Order';
  newOrder.classList.add(`order_${sType}`)

  // ---------------------------- the X button for removing a field
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'X';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', function(){
    container.removeChild(wrapper);
  });

  // ------------------------- building the item row and adding it
  wrapper.appendChild(iName);
  wrapper.appendChild(newModel);
  wrapper.appendChild(newStock);
  wrapper.appendChild(newOrder);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

  // ----------------------------------- for order field auto-fill
  const inputF = wrapper.querySelectorAll('.first2');
  inputF.forEach(input => input.addEventListener('input', function(){
    const modelVal = wrapper.querySelector(`.model_${sType}`).value || 0;
    // console.log("Model: " + modelVal);
    const stockVal = (wrapper.querySelector(`.stock_${sType}`).value || 0) / crateAmount;
    // console.log("Stock: " + stockVal);
    const orderField = wrapper.querySelector(`.order_${sType}`);
    const calcVal = Math.round(modelVal - stockVal);

    if (calcVal < 1) orderField.value = 0;
    else orderField.value = Math.round(modelVal - stockVal);
  }));

});
