const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'

});

document.getElementById('date-today').textContent = formattedDate;