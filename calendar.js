document.addEventListener("DOMContentLoaded", function() {

  const calendarGrid = document.querySelector('.calendar-grid');
  const monthLabel = document.querySelector('.calendar-header h2');
  const prevBtn = document.querySelector('.calendar-header .nav-btn:first-of-type');
  const nextBtn = document.querySelector('.calendar-header .nav-btn:last-of-type');

  let currentDate = new Date();
  
  // --- IMPORTANT ---
  // In a real application, you would fetch this data from your backend for the logged-in user.
  // This is a sample array for demonstration purposes.
  const streakDaysData = {
    "2025-8": [1, 2, 3, 4, 8, 9], // September (month is 0-indexed)
    "2025-7": [25, 26, 27, 28, 29, 30, 31], // August
  };

  function renderCalendar(date) {
    // Clear the existing grid
    calendarGrid.innerHTML = '';
    
    // Add day name headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(name => {
      const dayNameEl = document.createElement('div');
      dayNameEl.className = 'day-name';
      dayNameEl.textContent = name;
      calendarGrid.appendChild(dayNameEl);
    });

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed (0 = January)

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthLabel.textContent = `${monthNames[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfPrevMonth = new Date(year, month, 0);

    const startDayIndex = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday...
    const daysInMonth = lastDayOfMonth.getDate();
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();
    
    // 1. Fill in days from the previous month
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day other-month';
      dayEl.textContent = daysInPrevMonth - i;
      calendarGrid.appendChild(dayEl);
    }

    // 2. Fill in days for the current month
    const currentMonthStreaks = streakDaysData[`${year}-${month}`] || [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day';
      dayEl.textContent = i;
      
      const today = new Date();
      // Check for streak day
      if (currentMonthStreaks.includes(i)) {
        dayEl.classList.add('streak');
      }
      
      // Check for today
      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayEl.classList.add('today');
      }
      
      calendarGrid.appendChild(dayEl);
    }

    // 3. Fill in days for the next month
    const totalGridCells = 42; // 6 rows * 7 columns
    const renderedCells = calendarGrid.children.length - 7; // Subtract day name headers
    for (let i = 1; i <= totalGridCells - renderedCells; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day other-month';
      dayEl.textContent = i;
      calendarGrid.appendChild(dayEl);
    }
  }

  // Event listeners for navigation
  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Initial render of the calendar
  renderCalendar(currentDate);
});
