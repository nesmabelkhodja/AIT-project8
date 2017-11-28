function main(){
	//filtering				
	document.querySelector("#filterBtn").addEventListener("click", function(evt){
		evt.preventDefault();
		
		//variables for location and cuisine
		let loc = document.getElementById('location').value;
		let cuis = document.getElementById('cuisine').value;
		let url = 'http://localhost:3000/api/places?cuisine='+cuis;

		if (loc !== '' && loc !== undefined){
			url = '/api/places?location='+loc+'&cuisine='+cuis;
		}
		const req = new XMLHttpRequest();
		req.open('GET', url, true);

		//on load
		req.addEventListener('load', function() { 
			if (req.status >= 200 && req.status < 400) {
				const restaurants = JSON.parse(req.responseText);
				console.log('restaurants', restaurants);
				let places = document.getElementById('places-list');
				console.log('places', places);

				//creating the table of data
				restaurants.forEach(function(place) {
                let row = document.createElement('tr');
                let name =  row.appendChild(document.createElement('td'));
                let cuisine =  row.appendChild(document.createElement('td'));
                let location =  row.appendChild(document.createElement('td'));
                //adding the data
                let nContent = document.createTextNode(place.name); 
                name.appendChild(nContent);
                let cContent = document.createTextNode(place.cuisine); 
                cuisine.appendChild(cContent);
                let lContent = document.createTextNode(place.location); 
                location.appendChild(lContent);
                
                //adding row to final table
                places.appendChild(row);
                });
			}
		});

		//if error
		req.addEventListener('error', function(e) {
			document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
		});

		req.send();
	});


}

document.addEventListener('DOMContentLoaded', main);