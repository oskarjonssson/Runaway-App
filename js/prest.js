window.addEventListener("load", function (){
	let totalLength = 0;
	let longestDistance = 0;


	function createPrest(dataForRace){
		let prestList = document.getElementsByClassName("containerPrestation")

		/**CONTAINER **/
		let newDiv = document.createElement("div");
		let headPrest = document.createElement("div");
		let infoPrest = document.createElement("div");
		let textPrest = document.createElement("div");
		let sharePrest = document.createElement("div");

		/** CONTENT OF CONTAINER **/
		let newRating = document.createElement('div');
		let newPlace = document.createElement("p");
		let btnRemovePrest = document.createElement('button');

		let newLength = document.createElement("p");
		let newTime = document.createElement("p");
		let newDate = document.createElement("p");

		let newTextarea = document.createElement('textarea');
		let newShare = document.createElement("p");

		/*
		let newDivBtn = document.createElement("div");




		let newSwitchBox = document.createElement("div");
		let newSwitch = document.createElement("div");
		let newSwitchCircle = document.createElement("div");

		let newRating = document.createElement('span');

		let btnSetStars = document.createElement('button');*/
		let spanTotalLength = document.getElementById("spanTotalLength");
		let spanLongestDist = document.getElementById("spanLongestDist");

		let thisDistance = dataForRace.length;

		//newTextarea.type="textarea";
		/** CONTAINER CLASSNAMES **/
		newDiv.className="prest";
		headPrest.className = "headPrest";
		infoPrest.className = "infoPrest";
		textPrest.className = "textPrest";
		sharePrest.className = "sharePrest";

		/** CONTENT CLASSNAMES **/
		newPlace.className="place";
		newRating.className="wrapper-rating";
		newTime.className = "timePrest";
		newDate.className = "datePrest";
		newLength.className = "lengthPrest";
		newShare.className = "shareTextPrest";
		newTextarea.className="prestInput";
		newTextarea.placeholder = "Enter a comment to be able to share"

		btnRemovePrest.innerText="X";

		btnRemovePrest.className="btnRemove";

		btnRemovePrest.idOfRound= dataForRace.roundid;
		//btnSetStars.innerText="Rating";

		let dt= new Date(dataForRace.date)
		dt = dt.getFullYear()+"-" + (dt.getMonth()+1)+"-"+ dt.getDate();
		let stars = countStars(dataForRace.rating);

		newPlace.innerHTML = `${dataForRace.name}`
		newLength.innerHTML = `<i class="fas fa-flag-checkered" style="font-size: 17px; color: black; margin-right: 5px;"></i> ${dataForRace.length}km`;
		newTime.innerHTML = `<i class="fas fa-stopwatch" style="font-size: 17px; color: black; margin-right: 5px;"></i> ${convertToTime(dataForRace.time)}`; //convertToTime ligger i cardsMap
		newShare.innerHTML = `<i class="fas fa-share-alt" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Share";
		newDate.innerHTML = `<i class="far fa-calendar" style="font-size: 17px; color: black; margin-right: 5px;"></i> ${dt}`;


		newRating.appendChild(stars);

		prestList[0].appendChild(newDiv);
		newDiv.appendChild(headPrest);
		newDiv.appendChild(infoPrest);
		newDiv.appendChild(textPrest);
		newDiv.appendChild(sharePrest);
		headPrest.appendChild(newRating);
		headPrest.appendChild(newPlace);
		headPrest.appendChild(btnRemovePrest);
		infoPrest.appendChild(newTime);
		infoPrest.appendChild(newLength);
		infoPrest.appendChild(newDate);
		textPrest.appendChild(newTextarea);
		sharePrest.appendChild(newShare);


		//btnSetStars.className="btnStars";
		//newDivBtn.className="divBtnPrest";
		headPrest.idOfRound = dataForRace.roundid;
		newDiv.idOfRound = dataForRace.roundid;
		newRating.idOfRound = dataForRace.roundid;
		//newDivBtn.appendChild(btnRemovePrest);
		//newDivBtn.appendChild(btnSetStars);


		if(dataForRace.comment!==undefined){
			newTextarea.value= dataForRace.comment;
		}
		newTextarea.className="prestInput";
		//newTextarea.readOnly = "false";


		/*
		totalLength += thisDistance;
		currentUser.totalLength = totalLength; //sparar totalsträcka till user objecktet
	  	currentUser.longestRun = longestDistance; //sparar totalsträcka till user objecktet

		spanTotalLength.innerText = `Total längd: ${totalLength}km`;
		spanLongestDist.innerText = `Längst sträcka: ${longestDistance}km`;

		if(longestDistance < thisDistance){
			longestDistance = thisDistance;
			spanLongestDist.innerText = `Längst sträcka: ${longestDistance}km`;
			currentUser.longestRun = thisDistance;
		}
		*/

		getRunInfo(); //används för att uppdatera profil


		btnRemovePrest.addEventListener('click', function(event){  // tar bort vald prestation
			let key = event.target.idOfRound;
			  showMsgToUser("Removed","red");
			 db.ref(`/rundor/${key}`).remove();
		});

		newRating.addEventListener('click',(function(){  // för att sätta ny rating på runda
			let divOfStar = newRating;

			return function(event){
				let containerStars = document.getElementsByClassName('containerStars')[0];
				let stars = document.getElementsByClassName('stars');
				let grandpa = divOfStar.getElementsByClassName('rating')[0];
				let amount = countStarsOfSpan(grandpa.children);//räknar ut rating
				fillStars(amount-1,stars);										// innan justering av rating sätts den till samma klickad prestation. Kommer från timer.js

				currentUser.idForStarUpdate = divOfStar.idOfRound;

				document.getElementsByClassName('wrapper-ownLength')[0].style.display="none";
				containerStars.style.display="flex"
			}
		})() );

		/*
		newRating.addEventListener('click', function(event){  //justera rating på vald prestation
			let containerStars = document.getElementsByClassName('containerStars')[0];
			let stars = document.getElementsByClassName('stars');
			let grandpa = event.target;

			grandpa = grandpa.getElementsByClassName('rating')[0];

			let amount = countStarsOfSpan(grandpa.children);//räknar ut rating

			fillStars(amount-1,stars);										// innan justering av rating sätts den till samma klickad prestation.

			currentUser.trackid = event.target.parentNode.idOfRound;

			containerStars.style.display="flex"
		});
		*/



		/*newDiv.appendChild(newLength);
		newDiv.appendChild(newTime);
		newDiv.appendChild(newDate);
		newDiv.appendChild(newRating);
		newDiv.appendChild(newPlace);

		newDiv.appendChild(newTextarea);
		newDiv.appendChild(newSwitchBox);
		newDiv.appendChild(newDivBtn);

		newSwitchBox.appendChild(newSwitch);
		newSwitch.appendChild(newSwitchCircle);*/
		if(dataForRace.share == true){
			sharePrest.style.backgroundColor = "#8ce833";
			newShare.innerHTML = `<i class="fas fa-check" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Shared";
		}else{
			sharePrest.style.backgroundColor = "#00ceff";
			newShare.innerHTML = `<i class="fas fa-share-alt" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Share";
		}

		/*if(dataForRace.share == true)newSwitch.classList.add("active");*/

		sharePrest.addEventListener("click", function(){

			let inputTextCheck = newDiv.getElementsByClassName('prestInput')[0];
			if(inputTextCheck.value !=="" && sharePrest.style.backgroundColor == "rgb(0, 206, 255)"){
				db.ref("rundor/" + dataForRace.raceId).update({
					share: true,
					comment: inputTextCheck.value
				})

			}else if(sharePrest.style.backgroundColor == "rgb(140, 232, 51)"){
				sharePrest.style.backgroundColor = "#00ceff";
				db.ref("rundor/" + dataForRace.raceId).update({share: false});
			}
			else{
				let str = inputTextCheck.value
				inputTextCheck.style.border = "1px solid red";
				db.ref("rundor/" + dataForRace.raceId).update({share: false})
				setTimeout(function () {

					inputTextCheck.classList.remove("fail");
					inputTextCheck.style.border = "none";
				}, 1500);
			}
			/*let inputTextCheck = newDiv.getElementsByClassName('prestInput')[0];
			if(inputTextCheck.value !=="" && dataForRace.share == false){

				sharePrest.style.backgroundColor = "#8ce833";
				newShare.innerHTML = `<i class="fas fa-check" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Shared";
				db.ref("rundor/" + dataForRace.raceId).update({
					share: true,
					comment: inputTextCheck.value
				})

			}else if(dataForRace.share == true){
				sharePrest.style.backgroundColor = "#00ceff";
				newShare.innerHTML = `<i class="fas fa-share-alt" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Share";
				db.ref("rundor/" + dataForRace.raceId).update({share: false});
			}else{
				let str = inputTextCheck.value
				inputTextCheck.style.border = "1px solid red";
				db.ref("rundor/" + dataForRace.raceId).update({share: false})
				setTimeout(function () {

					inputTextCheck.classList.remove("fail");
					inputTextCheck.style.border = "none";
				}, 1500);

			}*/
		})


			/*sharePrest.addEventListener("click", function(){
				if(dataForRace.share == true){
					sharePrest.style.backgroundColor = "#00ceff";
					newShare.innerHTML = `<i class="fas fa-share-alt" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Share";
					db.ref("rundor/" + dataForRace.raceId).update({share: false});
				}else{
					sharePrest.style.backgroundColor = "#8ce833";
					newShare.innerHTML = `<i class="fas fa-check" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Shared";
				}
			});*/


	}

	let getTracksFromUser=()=>{

		db.ref("rundor/").on("child_added", function(snapshot, prevChildKey){
			let data = snapshot.val();
			let route = snapshot.key;
			let trackId = data.trackid;


			if(data.user == currentUser.uid){
				//console.log(data);
				let length=0;
				if(trackId=="default"){
					length = data.length;
				}else{
					length = runningTracks[trackId].length;
				}
				updateLengthNew(length); //updaterar localt

				let dataForRace = {
					place : runningTracks[trackId].place, //runningTracks kommer från cardsMap
					length : length,
					name: runningTracks[trackId].name,
					time : data.time,
					date : data.date,
					raceId : route,
					share : data.share,
					comment : data.comment,
					rating: data.rating,
					roundid: data.roundid,
					trackid: data.trackid
				}
				createPrest(dataForRace); // skapar kort för varje runda
			}
		})



		db.ref("rundor/").limitToLast(1).on("child_added",function(snapshot){
			if(true){
				//console.log("child added id 2");
				let data = snapshot.val();
				updateUserLengthDb(); // uppdaterar i databasen
			}
		})

		db.ref('rundor/').on("child_removed", function(snapshot, prevChildKey){
			let data = snapshot.val();
			let containerPrest = document.getElementsByClassName('containerPrestation')[0];
			let allPrest = document.getElementsByClassName('prest');


			if(data.user==currentUser.uid){
				let length=0;
				if(data.trackid=="default"){
					length -= data.length;
				}else{
					length -= runningTracks[data.trackid].length;
				}
				updateLengthNew(length) // updaterar localt


				for(let i=0;i < allPrest.length;i++){ //tar bort kort i html
					if(allPrest[i].idOfRound == data.roundid){
						containerPrest.removeChild(allPrest[i]);
					}
				}
				//console.log("child removed");
				updateUserLengthDb();// sparar ner ny längd till db

			}

			//updateLength(data.roundid); // uppdaterar sträcka för användare
		})

		db.ref('rundor/').on("child_changed", function(snapshot, prevChildKey){
			let data = snapshot.val();
			let allPrest = document.getElementsByClassName('prest');
			//console.log("child changed");

			if(data.share == true){
				for(let i=0;i<allPrest.length;i++){
					if(allPrest[i].idOfRound == data.roundid){
						allPrest[i].getElementsByClassName('sharePrest')[0].style.backgroundColor = "#8ce833";
						allPrest[i].getElementsByClassName('shareTextPrest')[0].innerHTML = `<i class="fas fa-check" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Shared";
					}
				}
			}else{
				for(let i=0;i<allPrest.length;i++){
					if(allPrest[i].idOfRound == data.roundid){
						allPrest[i].getElementsByClassName('sharePrest')[0].style.backgroundColor = "#00ceff";
						allPrest[i].getElementsByClassName('shareTextPrest')[0].innerHTML = `<i class="fas fa-share-alt" style="font-size: 17px; color: white; margin-right: 5px;"></i>` + "Share";
					}
				}
			}

			if(data.user==currentUser.uid){
				for(let i=0;i<allPrest.length;i++){
					if(allPrest[i].idOfRound == data.roundid){
						updatePrest(allPrest[i],data);
					}
				}
				updateUserLengthDb();
			}

		})


	}

	getTracksFromUser();

}) // End of window load



// ------------------ Räknar ut hur många stjärnor som är satta -------------->>
let countStarsOfSpan=(list)=>{
	let stars = document.getElementsByClassName('className');
	let count = 0;
	for(let i=0;i<list.length; i++){
			if(list[i].dataset.prefix=="fas"){
			count++
			}
	}

	currentUser.stars = count; //används vid spara till db.
	return count;
}

// --------------------------- END -------------------------------------------//



//-------------------------- Uppdatera prestation ---------------------------->>

let updatePrest = (found,data)=>{  //uppdaterar endast stjärnor än så länge
	let stars = countStars(data.rating);

	found.getElementsByClassName('wrapper-rating')[0].innerHTML = ""
	found.getElementsByClassName('wrapper-rating')[0].appendChild(stars);

}
//--------------------------  END --------------------------------------------//



// ------------------- New version of update length ------------------------------>>
let totalLengthNew=0;
let longestRunNew=[];
let updateLengthNew=(newLength)=>{
	let longestDist = 0;
	totalLengthNew+= Number(newLength);
	totalLengthNew = Math.round(totalLengthNew*100)/100;

	if(newLength<0 && longestRunNew.length<2){ // kontroll om det användren tagit bort alla rundor
		longestRunNew= [];
		let longestDist = 0;
	}else{
		if(Number(newLength)<0){
			let number = longestRunNew.indexOf(Math.abs(Number(newLength)));
			longestRunNew.splice(number,1);
		}else{
			longestRunNew.push(Math.round(Number(newLength)*100)/100);
		}
		longestRunNew.sort((a,b)=>a-b);
		longestDist = longestRunNew[longestRunNew.length-1]

	}


	document.getElementById("spanTotalLength").innerText="Total distance: " + totalLengthNew + "km";
	document.getElementById("spanLongestDist").innerText="Farthest run: "+longestDist + "km";
	currentUser.longestRun = longestDist;
	currentUser.totalLength = totalLengthNew;

}

//------------------  END ----------------------------------------------------//




//----------------- Save longest run and totalLength to db ------------------->>

let updateUserLengthDb=()=>{

	//console.log("uppdaterear db" , currentUser);
	let totalLength = currentUser.totalLength;
	let longestRun = currentUser.longestRun;
	if(currentUser.key!=""){
		db.ref(`/users/${currentUser.key}/stats/`).set({longestRun,totalLength});
	}

}

//-----------------  END -----------------------------------------------------//
