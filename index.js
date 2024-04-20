const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events`;

const state = {
  parties: [],
};

const partiesList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

async function render() {
  await getParties();
  renderParties();
}

render();

// update the state with parites from API
async function getParties() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.parties = data.data;
  } catch (error) {
    console.error(error);
  }
}

// render the parties from the state
function renderParties() {
  for (let i = 0; i < state.parties.length; i++) {
    const currentParty = state.parties[i];
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h1>${currentParty.name}</h1>
        <h3>${currentParty.date}</h3>
        <h3>${currentParty.location}</h3>
        <p>${currentParty.description}</p>`;
    partiesList.appendChild(newDiv);
  }
}

// add new party from the form section

async function addParty(event) {
  event.preventDefault();

  const nameInput = document.querySelector('input[name="eventName"]');
  const dateInput = document.querySelector('input[name="dateTime"]');
  const locationInput = document.querySelector('input[name="location"]');
  const descriptionInput = document.querySelector('input[name="description"]');

  const name = nameInput.value;
  const date = dateInput.value;
  const location = locationInput.value;
  const description = descriptionInput.value;
  // convert the date and time to iso?
  date = date.isoformat() + 'Z';
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        location,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add event");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
