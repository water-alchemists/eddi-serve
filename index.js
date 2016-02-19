$(document).ready(function(){
	console.log('window', window);
	var paths = {
			BASE_PATH : 'https://eddi.firebaseIO.com',
			USERS_PATH : 'user',
			EDDI_PATH : 'eddi'
		};

	var ref = new Firebase(paths.BASE_PATH),
		refs = {
		BASE : ref,
		USER : ref.child(paths.USERS_PATH),
		EDDI : ref.child(paths.EDDI_PATH)
	};

	var cache = {
		user : null
	};

	//Edit Dom
	//Display Error
	function displayError(selector, text){
		$(selector).show().text(text);
	}

	var showUserCreateError = displayError.bind(this, '#user-create-form .message'),
		showUserLoginError = displayError.bind(this, '#user-login-form .message'),
		showEddiError = displayError.bind(this, '#machine-form .message');


	//Firebase Related
	//User Related
	function getUser(email, password){

	}

	function createUser(email, password){
		return new Promise(function(resolve, reject){
			refs.BASE.createUser({
				email : email,
				password : password
			}, function(error, user){
				if(error) return reject(error);
				resolve(user);
			});
		});
	}

	function createUserProfile(id, user){
		var submission = {};
		submission[id] = user;

		return Promise(function(resolve, reject){
			refs.USER.set(submission, function(error){
				if(error) return reject(error);
				resolve(submission);
			});
		});
	}

	function updateUser(id, update){
		return new Promise(function(resolve, reject){
			refs.USER.child(id).update(update, function(error){
				if(error) return reject(error);
				resolve();
			});
		});
	}

	function deleteUser(email, password){
		return new Promise(function(resolve, reject){
			refs.BASE.removeUser({
				email : email,
				password : password
			}, function(error){
				if(error) return reject(error);
				resolve();
			});
		});
	}

	function login(email, password){
		return new Promise(function(resolve, reject){
			refs.BASE.authWithPassword({
				email : email,
				password : password
			}, function(){

			});
		});
	}

	function logout(){

	}

	//Eddi Related
	function findByEddi(id){
		return new Promise(function(resolve, reject){
			refs.EDDI.child(id).on('value', function(snapshot){
				var data = snapshot.val();
				if(!data) return reject(new Error('Eddi machine does not exist'));
				resolve(data);
			}, reject);
		});
	}

	function updateEddi(){

	}

	function setEddi(){

	}

	function unsetEddi(){

	}

	//Handles form submissions
	$('#user-create-form > form').submit(function(e){
		e.preventDefault();
		var form = $(this),
			data = form.serializeArray(),
			submission = data.reduce(function(obj, pair){
				obj[pair.name] = pair.value;
				return obj;
			}, {}),
			email = submission.email, 
			password = submission.password;
		console.log('user form submitted', data);
		console.dir(submission);
		createUser(email, password)
			.then(function(user){
				console.log('this is the user after it has been created', user);
				var id = user.uid;

				//delete password from user profile
				delete submission.password;

				//create the user profile
				return createUserProfile(id, submission);
			})
			.catch(function(error){
				switch(error.code){
					case 'EMAIL_TAKEN' : 
						showUserCreateError('Email already exists!');
						break;
					case 'INVALID_EMAIL' : 
						showUserCreateError('Email is not valid!');
						break;
					default :
						showUserCreateError(error);
				}
			});
	});

	$('#user-login-form > form').submit(function(e){
		e.preventDefault();
		var form = $(this),
			data = form.serializeArray(),
			submission = data.reduce(function(obj, pair){
				obj[pair.name] = pair.value;
				return obj;
			}, {});
		console.log('login form submitted', data);
		console.dir(submission);
		loginUser()
	});

	$('#machine-form > form').submit(function(e){
		e.preventDefault();
		var form = $(this),
			data = form.serializeArray(),
			submission = data.reduce(function(obj, pair){
				obj[pair.name] = pair.value;
				return obj;
			}, {});
		console.log('machine form submitted', data);
		console.dir(submission);
	});
});