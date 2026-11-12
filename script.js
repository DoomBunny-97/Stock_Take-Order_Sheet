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
const itemWarn = document.getElementById('item-warning');
const genDocButt = document.getElementById('print');

// WIP ------------------------------------------------------- START
function generateDocButt(cont){
  const wrapperAmount = cont.querySelectorAll('.wrapper').length;
  console.log(genDocButt);
  console.log(wrapperAmount);
  if (wrapperAmount === 0) genDocButt.classList.add('dispNone');
  else genDocButt.classList.remove('dispNone');
}generateDocButt(container);

function saveProgress (){
  localStorage.setItem('savedProgress', container.innerHTML);
  const dataInputs = container.querySelectorAll('input');
  const dataValues = Array.from(dataInputs).map(input => input.value);
  localStorage.setItem('savedProgressData', JSON.stringify(dataValues));
}

function autoFill (wrap){
  // console.log(wrap); // ----------------------------------- TEST
  const crateItemA = wrap.querySelector('.crateItemA').innerHTML;
  // console.log("Crate: " + crateItemA); // ------------------TEST
  const modelVal = wrap.querySelector(`.model`).value || 0;
  // console.log("Model: " + modelVal); // --------------------TEST
  const stockVal = (wrap.querySelector(`.stock`).value || 0) / crateItemA;
  // console.log("Stock: " + stockVal); // --------------------TEST
  const orderField = wrap.querySelector(`.order`);
  const calcVal = Math.round(modelVal - stockVal);
    
  if (calcVal < 1) orderField.value = 0;
  else orderField.value = Math.round(modelVal - stockVal);

  // Save
  saveProgress();
  generateDocButt(container);
}

function loadSavedNodes(){
  const savedHTML = localStorage.getItem('savedProgress');
  const savedValues = JSON.parse(localStorage.getItem('savedProgressData'));
  if (savedHTML !== null) {
    container.innerHTML = savedHTML;
  }

  if (savedValues !== null){
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input, index) => {
      if (savedValues[index] !== undefined) {
        input.value = savedValues[index];
      }
    });
  }
  generateDocButt(container);
}loadSavedNodes();

async function init(){
  await loadSavedNodes();

  const containerA = document.getElementById('field-container');
  const itemWrappers = containerA.querySelectorAll('.wrapper');
  // console.log(containerA); // ------------------------------ TEST
  // console.log(itemWrappers); // ---------------------------- TEST
  if(itemWrappers.length >= 1){ itemWrappers.forEach((wrapper) => {
    const model = wrapper.querySelectorAll('.first2');
    const order = wrapper.querySelector('.order');
    const removeBtn = wrapper.querySelector('.remove');
    const refreshBttn = document.querySelector('.list #refresh-order');
    // console.log(model); // --------------------------------- TEST
    // console.log(order); // --------------------------------- TEST
    order.addEventListener('input', () => saveProgress());
    model.forEach((node) => node.addEventListener('input', () => autoFill(wrapper)));
    removeBtn.addEventListener('click', function(){
      container.removeChild(wrapper);

      localStorage.setItem('savedProgress', container.innerHTML);
      const dataInputs = container.querySelectorAll('input');
      const dataValues = Array.from(dataInputs).map(input => input.value);
      localStorage.setItem('savedProgressData', JSON.stringify(dataValues));
    });
    refreshBttn.addEventListener('click', () => autoFill(wrapper));
  })}
  // else {console.log('ERROR')} // --------------------------- TEST
}init();
// WIP -------------------------------------------------------- END

function addItem(){
  // ---------------------------- refresh messages - save added items
  itemWarn.textContent = ''; // for warning message
  addedItems = document.querySelectorAll('.usedItems');
  generateDocButt(container);

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
  const crateAm = document.createElement('p');

  function numFields(field, fieldType, stype, wrap, firstTwo){
    const capfield = fieldType.charAt(0).toUpperCase() + fieldType.slice(1);
    field.type = 'number';
    field.name = `${fieldType}_${stype}`;
    field.placeholder = capfield;
    field.classList.add(fieldType);
    if (firstTwo) field.classList.add('first2');
    wrap.appendChild(field);
  };

  crateAm.textContent = crateAmount;
  crateAm.classList.add('crateItemA')
  crateAm.classList.add('dispNone');

  // ------------------------------ the X button for removing a field
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'X';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', function(){
    container.removeChild(wrapper);
    generateDocButt(container);
  });

  // ---------------------------- building the item row and adding it
  wrapper.appendChild(crateAm);
  wrapper.appendChild(iName);
  numFields(newModel, 'model', sType, wrapper, true);
  numFields(newStock, 'stock', sType, wrapper, true);
  numFields(newOrder, 'order', sType, wrapper, false);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);

  // -------------------------------------- for order field auto-fill
  
  const inputF = wrapper.querySelectorAll('.first2');
  const orderF = wrapper.querySelector('.order');
  const refreshBttn = document.querySelector('.list #refresh-order');
  inputF.forEach(input => input.addEventListener('input', () => autoFill(wrapper)));
  orderF.addEventListener('input', saveProgress());
  refreshBttn.addEventListener('click', () => autoFill(wrapper));

  // ----------------------------------------------------------- SAVE
  saveProgress();
};

document.getElementById('add-item').addEventListener('click', () => addItem());
document.addEventListener('keydown', function(event){
  if (event.key === 'Enter'){
    event.preventDefault();
    addItem();
  }
});
