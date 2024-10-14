// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
  const fundraiserDetailsContainer = document.getElementById('fundraiserDetails');
  const queryParams = new URLSearchParams(window.location.search);
  const fundraiserId = queryParams.get('id');

  // If no fundraiser ID is present, display a not found message
  if (!fundraiserId) {
    fundraiserDetailsContainer.innerHTML = '<p>Fundraiser not found.</p>';
    return;
  }

  try {
    // Fetch fundraiser details from the API using the fundraiser ID
    const response = await fetch(`/api/fundraisers/${fundraiserId}`);
    const data = await response.json();
    

    // If no fundraiser data is returned, display a not found message
    if (!data) {
      fundraiserDetailsContainer.innerHTML = '<p>Fundraiser not found.</p>';
    } else {
      const fundraiser = data.fundraiser;
      const donations = data.donations;

      // Display the fetched fundraiser details in the container

        document.getElementById('fundraiserName').textContent = fundraiser.ORGANIZER;
        document.getElementById('fundraiserCaption').textContent = fundraiser.CAPTION;
        document.getElementById('fundraiserTarget').textContent = `Target Funding: $${fundraiser.TARGET_FUNDING}`;
        document.getElementById('fundraiserCurrent').textContent = `Current Funding: $${fundraiser.CURRENT_FUNDING}`;


        const donationsTableBody = document.getElementById('donationsTable').getElementsByTagName('tbody')[0];
        donations.forEach(donation => {
          const row = donationsTableBody.insertRow();
          row.insertCell(0).textContent = donation.giver_name;
          row.insertCell(1).textContent = new Date(donation.date).toLocaleDateString();
          row.insertCell(2).textContent = `$${donation.amount}`;
        });
    }
  } catch (error) {
    console.error('Error fetching fundraiser details:', error);
    fundraiserDetailsContainer.innerHTML = '<p>Failed to load fundraiser details.</p>';
  }
});

// Function to show a message that the donate feature is under construction
function donate() {
  const fundraiserId = getCurrentFundraiserId(); 
  if (fundraiserId) {
    window.location.href = `/ownation?id=${fundraiserId}`; 
  } else {
    alert('Unable to determine the fundraiser ID.');
  }
}


function getCurrentFundraiserId() {
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Function to navigate back to the search page
function Back() {
  window.location.href = "search";
}