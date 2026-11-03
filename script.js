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

document.getElementById('add-item').addEventListener('click', function(){

  // ---------------------------- refresh messages - save added items
  const addedItems = document.querySelectorAll('.usedItems');
  itemWarn.textContent = '';
  
  const dropdown = document.getElementById('iDropdown');
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

  // ------------------------------------- creates the fields to add
  const newModel = document.createElement('input');
  const newStock = document.createElement('input');
  const newOrder = document.createElement('input');

  newModel.type = 'number';
  newModel.name = `model_${sType}`;
  newModel.placeholder = 'Model';
  newModel.classList.add('first2');

  newStock.type = 'number';
  newStock.name = `stock_${sType}`;
  newStock.placeholder = 'Stock';
  newModel.classList.add('first2');

  newOrder.type = 'number';
  newOrder.name = `order_${sType}`;
  newOrder.placeholder = 'Order';

  // ---------------------------- the X button for removing a field
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'X';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', function(){
    container.removeChild(wrapper);
  });

  //still need to fix this so inactive for now TODO -- Auto Update Order

  // const inputF = wrapper.querySelectorAll('first2');
  // inputF.addEventListener('input', function(){
  //   const modelVal = wrapper.querySelector(`model_${sType}`).value;
  //   const stockVal = (wrapper.querySelector(`stock_${sType}`).value) / /*crate/pack size*/;
  //   wrapper.newOrder.value = Math.round(modelVal - stockVal);
  // })

  // ------------------------- building the item row and adding it
  wrapper.appendChild(iName);
  wrapper.appendChild(newModel);
  wrapper.appendChild(newStock);
  wrapper.appendChild(newOrder);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

});
