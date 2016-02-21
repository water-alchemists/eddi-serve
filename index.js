$(document).ready(function(){
	var paths = {
			BASE_PATH : 'https://eddi.firebaseIO.com',
			USERS_PATH : 'users',
			EDDI_PATH : 'eddis',
			METRIC_PATH : 'metrics',
			STATE_PATH : 'state',
			PIN_PATH : 'pins',
			TESTEDDI_PATH : 'test-eddi'
		};

	var ref = new Firebase(paths.BASE_PATH),
		refs = {
			BASE : ref,
			USER : ref.child(paths.USERS_PATH),
			EDDI : ref.child(paths.EDDI_PATH)
		};

	//Handles Authentication
	var cache = {
		user : null
	};

	//Edit Dom
	//Display Error
	function displayText(selector, text){
		$(selector).show().text(text);
	}

	var showUserCreateError = displayText.bind(null, '#user-create-form .message'),
		showUserLoginError = displayText.bind(null, '#user-login-form .message'),
		showEddiError = displayText.bind(null, '#machine-form .message'),
		showAuthenticateStatus = displayText.bind(null, '#user-profile > .authenticate'),
		showUserProfile = displayText.bind(null, '#user-profile > .profile');

	function checkCookie(){
		var cookie = document.cookie,
			token;

		return new Promise(function(resolve, reject){
			if(cookie){
				var regex = /token=(.*?);/;
				token = cookie.match(regex)[1];
				return refs.BASE.auth(token, function(error, data){
					if(error) return reject(error);
					resolve(data);
				});
			} else return resolve(null);
		});
	}

	function setCookie(token, expires){
		var cookie = "";
		if(token) {
			cookie += "token=" + token;
			if(expires) cookie += ";expires=" + expires.toUTCString();
		}
		console.log('this is the cookie', cookie);
		document.cookie = cookie;
		return;
	}

	function onAuthHandler(user){
		console.log('i am in auth handler', user);
		var token, expires;
		if(user) {
			token = user.token;
			expires = new Date(Date.now() + user.expires);

			//cache users
			cache.user = user;
		}

		setCookie(token, expires);
		return token ? showAuthenticateStatus('Authenticated') : showAuthenticateStatus('Not Authenticated');
	}

	refs.BASE.onAuth(onAuthHandler);


	//Firebase Related
	//User Related
	function isAuthenticated(){
		return new Promise(function(resolve, reject){
			var user = refs.BASE.getAuth();
			if(!user) reject(new Error('User is not authenticated.'));
			resolve(user);
		});
	}

	function authenticateWithToken(token){
		return new Promise(function(resolve, reject){
			refs.BASE.auth(token, function(error, user){
				if(error) return reject(error);
				resolve(user);
			});
		});
	}

	function authenticateWithPassword(email, password){
		return new Promise(function(resolve, reject){
			refs.BASE.authWithPassword({
				email : email,
				password : password
			}, function(error, user){
				if(error) return reject(error);
				resolve(user);
			});
		});
	}

	function unauthenticate(){
		return refs.BASE.unauth();
	}

	function getUserProfile(id){
		return new Promise(function(resolve, reject){
			refs.USER.child(id).once('value', function(user){
				if(!user) return reject(new Error('Profile does not exist for this user.'));
				resolve(user);
			});
		});
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
		return new Promise(function(resolve, reject){
			refs.USER.set(submission, function(error){
				if(error) return reject(error);
				resolve(submission);
			});
		});
	}

	function removeUserProfile(id){
		return new Promise(function(resolve, reject){
			refs.USER.child(id).remove(function(error){
				if(error) return reject(error);
				resolve();
			});
		});
	}

	function updateUserProfile(id, update){
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
		return authenticateWithPassword(email, password);
	}

	function logout(){
		return unauthenticate();
	}

	//Eddi Related
	function findByEddi(id){
		return new Promise(function(resolve, reject){
			refs.EDDI.child(id).once('value', function(snapshot){
				var data = snapshot.val();
				if(!data) return reject(new Error('Eddi machine does not exist'));
				resolve(data);
			}, reject);
		});
	}

	function assignEddiToUser(id, eddiId){
		return new Promise(function(resolve, reject){
			refs.USER.child(id)
					.child(paths.EDDI_PATH)
					.push(id, function(error){
						if(error) return reject(error);
						resolve();
					});

		});
	}

	function unassignEddiToUser(pushId){
		return new Promise(function(resolve, reject){
			refs.USER.child(id)
				.child(paths.EDDI_PATH)
				.remove(pushId, function(error){
					if(error) return reject(error);
					resolve();
				});
		});
	}

	function setEddiState(eddiId, state){
		return new Promise(function(resolve, reject){
			refs.EDDI.child(eddiId)
					.set({ state : state }, function(error){
						if(error) return reject(error);
						resolve();
					});
		});
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
			.then(function(){
				//log the user in after signing in
				return authenticateWithPassword(email, password);
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
			}, {}),
			email = submission.email,
			password = submission.password;
		console.log('login form submitted', data);
		console.dir(submission);
		login(email, password)
			.catch(function(error){
				showUserLoginError(error.message);
			});
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

	$('#check-auth').click(function(e){
		e.preventDefault();
		isAuthenticated()
			.then(function(user){
				console.log('you are logged in', user);
			})
			.catch(function(error){
				showUserLoginError(error.message);
			});
	});

	$('#logout').click(function(e){
		e.preventDefault();
		logout();
	});

	$('#user-profile > button').click(function(e){
		e.preventDefault();
		isAuthenticated()
			.then(function(){
				var userId = cache.user.uid;
				return getUserProfile(userId);
			})
			.then(function(user){
				var data = user.val();
				console.log('getting user profile', data);
				return showUserProfile(JSON.stringify(data, null, '\t'));
			})
			.catch(function(){
				return showUserProfile('Profile not found. Please login.')
			});
	})

});