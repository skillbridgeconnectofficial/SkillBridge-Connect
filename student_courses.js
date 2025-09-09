document.addEventListener("DOMContentLoaded", function() {

  // Function to switch between tabs
  window.openTab = function(evt, tabName) {
    let i, tabcontent, tablinks;

    // Hide all tab content sections
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Remove the "active" class from all tab links
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Set the default tab to be open on page load
  // We check if the element exists before clicking to avoid errors
  const defaultTab = document.querySelector('.tab-link.active');
  if (defaultTab) {
    defaultTab.click();
  }
  
});
