const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'

});

document.getElementById('date-today').textContent = formattedDate;

// -------------------------------------------


document.getElementById('add-item').addEventListener('click', function(){

  const dropdown = document.getElementById('iDropdown');
  const sType = dropdown.value;
  const sText = dropdown.options[dropdown.selectedIndex].text;
  const container = document.getElementById('field-container');
  // wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('container');
  // add name
  const iName = document.createElement('p');
  iName.textContent = `${sText}`;
  // console.log(sType);

  // returns if selection is on the default item.
  // ----------------------------------------------TODO--- needs to pop a warning message!
  if (sType === "default-item"){ 
    console.warn('NOT VALID');
    return;
  };

  // creates the fields to add
  const newModel = document.createElement('input');
  const newStock = document.createElement('input');
  const newOrder = document.createElement('input');

  newModel.type = 'number';
  newModel.name = `model_${sType}`;
  newModel.placeholder = 'Model';

  newStock.type = 'number';
  newStock.name = `stock_${sType}`;
  newStock.placeholder = 'Stock';

  newOrder.type = 'number';
  newOrder.name = `order_${sType}`;
  newOrder.placeholder = 'Order';

  // the X button for removing a field
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'X';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', function(){
    container.removeChild(wrapper);
  });

  // building the item row and adding it
  wrapper.appendChild(iName);
  wrapper.appendChild(newModel);
  wrapper.appendChild(newStock);
  wrapper.appendChild(newOrder);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

  // console.log('Button Clicked!');

});
