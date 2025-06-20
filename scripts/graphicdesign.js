let allCards=[];
let allTags=[];


function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/filmprojects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            console.log(data);

            // convert dates to Dates (better sorting)
            // data.forEach(project => {
            //     project.date = new Date(project.date);
            // });

            // Sort and create cards
            data.sort((a, b) =>  new Date(b.date) - new Date(a.date)); // sort by most recent

            data.forEach(project => createCard(project));
            addTags();
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
fetchJSONData();