"use strict";

const mockData = require("./mockData.js").data;
const prompt = require("prompt-sync")();

// Log mockData to get an idea of how to use data
// console.log(mockData);

// Create emtpy profile to store user information
let userProfile = {
	first_name: "",
	last_name: "",
	age: null,
	gender: null,
	gender_interest: null,
	location: null,
	min_age_interest: null,
	max_age_interest: null,
};

// Log empty user profile object
console.log(userProfile);

// Prompt multiple questions to collect data needed to fill profile object using SEPARATE While blocks
// Check whether the input is valid for each question

// Ask user for first name
while (true) {
	const firstName = prompt("What is your first name?").trim();
	// Check if firstName input is not an empty string
	if (firstName !== "") {
		userProfile.first_name =
			firstName.slice(0, 1).toUpperCase() + firstName.slice(1);
	} else {
		console.log("Please enter a valid first name");
		continue;
	}
	break;
}

// Ask user for last name
while (true) {
	const lastName = prompt("What is your last name?").trim();
	// Check if lastName input is not an empty string
	if (lastName !== "") {
		userProfile.last_name =
			lastName.slice(0, 1).toUpperCase() + lastName.slice(1);
	} else {
		console.log("Please enter a valid last name");
		continue;
	}
	break;
}

// Ask user for age and store input as number
while (true) {
	const age = Number(
		prompt(`What is your age (you must be 18 or above)?`).trim()
	);
	// Check if age input is a number and input is 18 or above
	if (!isNaN(age) && age >= 18) {
		userProfile.age = age;
	} else {
		console.log("Please enter a valid number (you must be 18 or above)");
		continue;
	}
	break;
}

// Ask user for it's gender
while (true) {
	const validGenders = ["M", "F", "X"];
	const gender = prompt(`What is your gender ('M', 'F' or 'X')?`)
		.trim()
		.toUpperCase();
	// Check if gender input is 'M', 'F' or 'X'
	if (validGenders.includes(gender)) {
		userProfile.gender = gender;
	} else {
		console.log(`Please enter a valid gender ('M', 'F' or 'X')`);
		continue;
	}
	break;
}

// Ask user for gender interest
while (true) {
	const validGenders = ["M", "F", "X"];
	const genderInterest = prompt(
		`What gender are you interested in ('M', 'F', 'X')?`
	)
		.trim()
		.toUpperCase();
	// Check if genderInterest input is 'M', 'F' or 'X'
	if (validGenders.includes(genderInterest)) {
		userProfile.gender_interest = genderInterest;
	} else {
		console.log(`Please enter a valid gender ('M', 'F' or 'X')`);
		continue;
	}
	break;
}

// Ask if user lives in city or rural
while (true) {
	const validLocations = ["city", "rural"];
	const location = prompt("Where do you live ('city' or 'rural')?")
		.trim()
		.toLowerCase();
	// Check if location is valid
	if (validLocations.includes(location)) {
		userProfile.location = location;
	} else {
		console.log("Please enter a valid location ('city' or 'rural')");
		continue;
	}
	break;
}

// Ask user minimum age interest and store as number
while (true) {
	const userMinAgeInterest = Number(
		prompt("What is your minimum age interest (must be 18 or above)?").trim()
	);
	// Check if minimum age interest input is 18 or above
	if (!isNaN(userMinAgeInterest) && userMinAgeInterest >= 18) {
		userProfile.min_age_interest = userMinAgeInterest;
	} else {
		console.log(`Please enter a valid minimum age (must be 18 or above)`);
		continue;
	}
	break;
}

// Ask user maximum age interest and store as a number
while (true) {
	const userMaxAgeInterest = Number(
		prompt(
			`What is your maximum age interest (must be above your minimum age interest of ${userProfile.min_age_interest})?`
		).trim()
	);

	// Check if maximum age interest input is 18 or above
	if (
		!isNaN(userMaxAgeInterest) &&
		userMaxAgeInterest >= 18 &&
		userMaxAgeInterest > userProfile.min_age_interest
	) {
		userProfile.max_age_interest = userMaxAgeInterest;
	} else {
		console.log(
			`Please enter a maximum age (must be above your minimum age interest of ${userProfile.min_age_interest})`
		);
		continue;
	}
	break;
}
// Log object entries after prompts have been answered
console.log(Object.entries(userProfile));

/*
In this loop, compare the data with your profile data and store a person as a match when they meet the following criteria:
- Your age range and their age match
- Their age range and your age match
- Their gender_interest and your gender match. 
- Your gender_interest and their gender match. 
- You both have the same location
*/

// Array of all matches.
let allMatches = [];

// Create loop that iterates on the mockData array
for (const match of mockData) {
	// User data to compare with
	const userAge = userProfile.age;
	const userMinAgeInterest = userProfile.min_age_interest;
	const userMaxAgeInterest = userProfile.max_age_interest;
	const userGender = userProfile.gender;
	let userGenderInterest = userProfile.gender_interest;
	const userLocation = userProfile.location;

	// To match person data to compare with
	const matchAge = match.age;
	const matchMinAgeInterest = match.min_age_interest;
	const matchMaxAgeInterest = match.max_age_interest;
	const matchGender = match.gender;
	let matchGenderInterest = match.gender_interest;
	const matchLocation = match.location;

	if (userProfile.gender_interest === "X") {
		userGenderInterest = ["M", "F"];
	} else {
		userGenderInterest = [userProfile.gender_interest];
	}

	if (match.gender_interest === "X") {
		matchGenderInterest = ["M", "F"];
	} else {
		matchGenderInterest = [match.gender_interest];
	}

	if (
		// Check for match age
		matchAge >= userMinAgeInterest &&
		matchAge <= userMaxAgeInterest &&
		// Check for match age preferences
		userAge >= matchMinAgeInterest &&
		userAge <= matchMaxAgeInterest &&
		// Check for gender
		userGenderInterest.includes(matchGender) &&
		matchGenderInterest.includes(userGender) &&
		// Check for location match
		userLocation === matchLocation
	) {
		// If everything is correct, create personMatch object
		let personMatch = {
			name: match.first_name + " " + match.last_name,
			age: match.age,
			location: match.location,
		};
		// Push personMatch object to allMatches array above
		allMatches.push(personMatch);
	}
}
// Count the number of matches.
console.log(`You have ${allMatches.length} matches:`);

// Turn matches output into readable format
for (const match of allMatches) {
	let name = match.name;
	let age = match.age;
	let location = match.location;
	console.log(`Name: ${name}, Age: ${age}, Location: ${location}`);
}
