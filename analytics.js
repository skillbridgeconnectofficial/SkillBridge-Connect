// This script requires the Chart.js library to be included in your HTML.

document.addEventListener("DOMContentLoaded", function() {

  // --- 1. SAMPLE DATA ---
  // In a real application, you would fetch this data from your backend.

  const revenueDataMonthly = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Revenue',
      data: [1200, 1500, 1800, 1700, 2100, 2300, 2200, 2500],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3498db',
      pointRadius: 4
    }]
  };

  const revenueDataYearly = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: 'Revenue',
      data: [14000, 18000, 22000, 28000, 35000],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const engagementData = {
    labels: ['High Engagement', 'Medium Engagement', 'Low Engagement'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#3498db', '#2980b9', '#1f5a82'],
      borderColor: 'rgba(10, 25, 47, 0.8)',
      hoverOffset: 15
    }]
  };


  // --- 2. CHART CONFIGURATION & INITIALIZATION ---

  Chart.defaults.color = '#bdc3c7'; // Default font color for charts

  // Get the canvas elements from the HTML
  const revenueCanvas = document.getElementById('revenue-chart');
  const engagementCanvas = document.getElementById('engagement-chart');

  // Create the Revenue Line Chart
  const revenueChart = new Chart(revenueCanvas, {
    type: 'line',
    data: revenueDataMonthly, // Start with monthly data
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { color: 'rgba(52, 152, 219, 0.1)' } },
        y: { grid: { color: 'rgba(52, 152, 219, 0.1)' } }
      }
    }
  });

  // Create the Engagement Donut Chart
  new Chart(engagementCanvas, {
    type: 'doughnut',
    data: engagementData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20 }
        }
      }
    }
  });


  // --- 3. FILTER BUTTON LOGIC ---

  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update chart data
      if (this.textContent === 'Yearly') {
        revenueChart.data = revenueDataYearly;
      } else {
        revenueChart.data = revenueDataMonthly;
      }
      revenueChart.update();
    });
  });

});
