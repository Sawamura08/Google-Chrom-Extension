let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveElBtn = document.getElementById("save-el");
const saveTabBtn = document.getElementById("tab-el");
const deleteBtn = document.getElementById("delete-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

saveTabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	});
});

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `
            <li>
                <a target = _blank href = "${leads[i]}"> 
                    ${leads[i]}
                </a>
            </li>
        `;
	}
	ulEl.innerHTML = listItems;
}

saveElBtn.addEventListener("click", function () {
	myLeads.push(inputEl.value);
	inputEl.value = "";
	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render(myLeads);
});

deleteBtn.addEventListener("click", function () {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
});
