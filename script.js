const breweryURL = "https://api.openbrewerydb.org/breweries";

let berveryResponseJson = [];

const mainElement = document.createElement("div");
mainElement.classList.add('container');

const inputSearchElement = document.createElement("input");
console.log(inputSearchElement);

const cardElementRow = document.createElement("div");
cardElementRow.style.marginTop = "10px";
cardElementRow.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
cardElementRow.setAttribute('id', 'card-row');

const inputSearchButton = document.createElement("button");
inputSearchButton.setAttribute("class", "bg-warning");
inputSearchButton.innerText = "Search";
inputSearchButton.style.color = "#fff";
inputSearchButton.addEventListener("click", (e) => {
    const searchInputvalue = inputSearchElement.value.toLowerCase();
    const berveryFilter = berveryResponseJson.filter(ele => {
        return (ele.name.toLowerCase().includes(searchInputvalue) || ele.brewery_type.toLowerCase().includes(searchInputvalue)
            || ele.street.toLowerCase().includes(searchInputvalue) || ele.state.toLowerCase().includes(searchInputvalue) || ele.country.toLowerCase().includes(searchInputvalue));
    })
    displayElemnet(berveryFilter);
});

const breveryFunc = async () => {
    try {
        const response = await fetch(`${breweryURL}`);
        const responseJson = await response.json();
        berveryResponseJson = responseJson;
        displayElemnet(berveryResponseJson);
        console.log(berveryResponseJson);
    }
    catch (error) {
        console.log("Error", error);
    }
}

const displayElemnet = (res) => {
    res.forEach(element => {
        const brewCardcol = document.createElement("div");
        brewCardcol.classList.add('col');

        const brewCard = document.createElement("div");
        brewCard.classList.add('card', 'text-dark', 'border-warning', 'mb-3');

        const brewCardHeader = document.createElement("div");
        brewCardHeader.classList.add('card-header', 'text-dark', 'bg-warning');
        brewCardHeader.innerHTML = element.name + " - (" + "<small>" + element.brewery_type + "</small>" + ")";
        brewCardHeader.style.textAlign = "center";
        brewCardHeader.style.fontWeight = "bold";

        const brewCardbody = document.createElement("div");
        brewCardbody.classList.add('card-body');

        const brewCardText = document.createElement("address");
        if (element.street == null) element.street = "";
        brewCardText.innerHTML = element.street + "</br>" + element.state + "</br>" + element.city + "</br>"
            + element.country + "</br> Postal code - " + element.postal_code;

        const brewLink = document.createElement("a");
        if (element.website_url == null) element.website_url = " Not Available";
        brewLink.setAttribute('href', element.website_url);
        brewLink.text = "Website :" + element.website_url;
        brewLink.style.textDecoration = "none";
        brewLink.setAttribute('class', 'card-link');
        brewLink.setAttribute('target', '_blank');

        const brewPhone = document.createElement("p");
        if (element.phone == null) element.phone = "";
        brewPhone.innerText = "Ph : " + element.phone;
        brewPhone.style.color = "black";

        brewCardbody.append(brewCardText, brewLink, brewPhone);
        brewCard.append(brewCardHeader, brewCardbody);
        brewCardcol.appendChild(brewCard);
        cardElementRow.appendChild(brewCardcol);

    });
};
mainElement.append(inputSearchElement, inputSearchButton, cardElementRow);
document.body.appendChild(mainElement);
breveryFunc();




