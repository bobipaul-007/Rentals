export class Util {
	/*
	  Function checks for empty or null or undefined
	  @return - value
	*/
	static isEmpty(value) {
		return (value === null || value === undefined || value === '');
	}
	/*
	  Function sums the array of numbers
	  @return - value
	*/
	static sumOfArray = arr => arr.reduce((total, value) => (Number(total) + Number(value)), 0)

	/*
	  Function formats the number to ammount
	  @return - value
	*/
	static formatAmount = value => value && parseFloat(value).toFixed(2)

	/*
	  Function check whether email is valid or not
	  @return - value
	*/
	static isEmailValid(text) {
		//var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
		var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/);
		return pattern.test(text);
	}

	/*
	  Function check whether text is true or not
	  @return - value
	*/
	static isTrue(text) {
		return (text === true);
	}

	/*
	  Function checks for IPaddress & returns with 3octets of it
	  @return - value
	*/
	static getIp(number) {
		number = String(number).split(".");
		number = [number[0], number[1], number[2]];
		number = number.join(".");
		return number;
	}

	/*
	  Function checks for IPaddress & returns with 3octets of it
	  @return - value
	*/
	static getStoreName(number) {
		// 	number = String(number).split(".");
		// 	number = [number[0]];
		// //	number = number.join(".");
		//Code for QA & PROD
		number = String(number);
		return number;
	}

	/*
	  Function remove hyphens from number
	  @return - value
	*/
	static removeHyphensFromNumber(number) {
		return number.replace(/\D/g, '')
	}

	/*
	  Function format phone number with hyphen
	  @return - value
	*/
	static formatPhoneNumberWithHyphen(phone) {
		const number = phone.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
		const firstThree = number.substring(0, 3);
		const middleThree = number.substring(3, 6);
		const lastThree = number.substring(6, 10);

		if (number.length > 6) { phone = `${firstThree}-${middleThree}-${lastThree}` }
		else if (number.length > 3) { phone = `${firstThree}-${middleThree}` }
		else if (number.length > 0) { phone = `${firstThree}` }
		return phone
	}

	/*
	  Function only numbers allowed
	  @return - value
	*/
	static numerics(field) {
		return field.replace(/[^0-9]/g, "")
	}

	/*
	  Function alphabets, numbers, spaces and hyphens allowed
	  @return - value
	*/
	static alphaNumericWithSpacesAndHyphens(field) {
		return field.replace(/[^A-Za-z0-9- ]/g, "")
	}

	/*
	  Function alphabets and numbers only allowed
	  @return - value
	*/
	static alphaNumeric(field) {
		return field.replace(/[^A-Za-z0-9]/g, "")
	}

	/*
	  Function alphabets, numbers, spaces and decimal allowed
	  @return - value
	*/
	static alphaNumericWithSpacesAndDecimal(field) {
		return field.replace(/[^A-Za-z0-9. ]/g, "")
	}

	/*
	  Function alphabets and spaces allowed
	  @return - value
	*/
	static alphabetsWithSpaces(field) {
		return field.replace(/[^A-Za-z ]/g, "")
	}

	/*
	  Function to validate phone number 
	  @return - value
	*/
	static isValidPhonenumber(text) {
		var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
		return pattern.test(text);
	}

	static dialog() {
		Alert.alert(
			textLabel.messages.error, textLabel.messages.errorUI3,
			[
				{ text: textLabel.messages.ok, onPress: () => { /*Code to exit app */ } },
			],
			{ cancelable: false }
		);
	}

	//function to get current date and time
	static getCurrentDateTime() {
		var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		var hours = new Date().getHours(); //Current Hours
		var min = new Date().getMinutes(); //Current Minutes
		var sec = new Date().getSeconds(); //Current Seconds

		//Setting the value of the date time
		date = month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec;

		return date;
	}

	//function to fetch dynamic height
	static getDynamicHeight(minHeight, height) {
		return Math.max(minHeight, height)
	}
}

