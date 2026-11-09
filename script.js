const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'

});

document.getElementById('date-today').textContent = formattedDate;

// ------------------------------------------------------------------
let addedItems = [];

const container = document.getElementById('field-container');
// window.addEventListener('DOMContentLoaded', () => {
//   const savedHTML = localStorage.getItem('savedProgress');
//   // const savedValues = JSON.parse(localStorage.getItem('savedProgressData'));
//   if (savedHTML !== null) {
//     container.innerHTML = savedHTML;
//   }

//   // if (savedValues !== null){
//   //   const inputs = container.querySelectorAll('input');
//   //   inputs.forEach((input, index) => {
//   //     if (savedValues[index] !== undefined) {
//   //       input.value = savedValues[index];
//   //     }
//   //   });
//   // }

//   // if (addedItems.length < 1){
//   //   document.getElementById('save-print').style.display = "none";
//   // }else if (addedItems.length >= 1){
//   //   document.getElementById('save-print').removeAttribute('style');
//   // }
// })

const itemWarn = document.getElementById('item-warning');

document.getElementById('add-item').addEventListener('click', function(){
  
  // ---------------------------- refresh messages - save added items
  itemWarn.textContent = ''; // for warning message
  addedItems = document.querySelectorAll('.usedItems');

  const dropdown = document.getElementById('iDropdown');
  const itemCrateInfo = dropdown.options[dropdown.selectedIndex].classList;
  const sType = dropdown.value;
  const sText = dropdown.options[dropdown.selectedIndex].text;

  const wrapper = document.createElement('div');//----------- Wrapper
  wrapper.classList.add('container');
  wrapper.classList.add('wrapper');
  const iName = document.createElement('p');  //------------ add name
  iName.textContent = `${sText}`;
  iName.classList.add('usedItems');
  iName.classList.add('fw6');

  // console.log(sType);// --------------------------------------TEST

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

  // console.log(itemCrateInfo[0]); // --------------------------TEST
  let crateAmount = 0;
  if (
    itemCrateInfo[0] === 'ml300' || 
    itemCrateInfo[0] === 'ml440' || 
    itemCrateInfo[0] === 'ml500C' || 
    itemCrateInfo[0] === 'ml500HF' || 
    itemCrateInfo[0] === 'ml500PB'
  ) crateAmount = 24;
  if (itemCrateInfo[0] === 'ml500G') crateAmount = 20;
  if (itemCrateInfo[0] === 'l2') crateAmount = 6;
  if (itemCrateInfo[0] === 'l2R') crateAmount = 9;

  // console.log("Crate amount: " + crateAmount); // ------------TEST

  // -------------------------------------- creates the fields to add
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

  // ------------------------------ the X button for removing a field
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'X';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', function(){
    container.removeChild(wrapper);
  });

  // ---------------------------- building the item row and adding it
  wrapper.appendChild(iName);
  wrapper.appendChild(newModel);
  wrapper.appendChild(newStock);
  wrapper.appendChild(newOrder);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

  if (addedItems.length < 1){
    document.getElementById('print').style.display = "none";
  }else if (addedItems.length > 0){
    document.getElementById('print').removeAttribute('style');
  }

  // -------------------------------------- for order field auto-fill
  function orderAutofill (){
    const modelVal = wrapper.querySelector(`.model_${sType}`).value || 0;
    // console.log("Model: " + modelVal); // --------------------TEST
    const stockVal = (wrapper.querySelector(`.stock_${sType}`).value || 0) / crateAmount;
    // console.log("Stock: " + stockVal); // --------------------TEST
    const orderField = wrapper.querySelector(`.order_${sType}`);
    const calcVal = Math.round(modelVal - stockVal);

    if (calcVal < 1) orderField.value = 0;
    else orderField.value = Math.round(modelVal - stockVal);

    // Save
    // localStorage.setItem('savedProgress', container.innerHTML);
    // const dataInputs = container.querySelectorAll('input');
    // const dataValues = Array.from(dataInputs).map(input => input.value);
    // localStorage.setItem('savedProgressData', JSON.stringify(dataValues));
  }

  const inputF = wrapper.querySelectorAll('.first2');
  const refreshBttn = document.querySelector('.list #refresh-order');
  inputF.forEach(input => input.addEventListener('input', orderAutofill));
  refreshBttn.addEventListener('click', orderAutofill);

  // localStorage.setItem('savedProgress', container.innerHTML);
  // const dataInputs = container.querySelectorAll('input');
  // const dataValues = Array.from(dataInputs).map(input => input.value);
  // localStorage.setItem('savedProgressData', JSON.stringify(dataValues));

});
