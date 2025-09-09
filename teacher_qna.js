document.addEventListener("DOMContentLoaded", function() {

  const modal = document.getElementById('qa-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  // Function to open the modal
  const openModal = () => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  };

  // Function to close the modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  // Event listeners for opening the modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Event listeners for closing the modal
  closeModalBtn.addEventListener('click', closeModal);
  
  // Also close modal if the overlay (background) is clicked
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

});
