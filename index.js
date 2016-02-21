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
		showEddiListError = displayText.bind(null, '#machine-list .list'),
		showAuthenticateStatus = displayText.bind(null, '#user-profile > .authenticate'),
		showUserProfile = displayText.bind(null, '#user-profile > .profile');

	function displayEddiList(selector, eddiList){
		var buttonString = '<button type="button">Remove</button>',
			nameString = '<h5 class="eddi-name"></h5>',
			stateString = '<div></div>',
			metricString = '<code></code>',
			pinString = '<code></code>',
			html = eddiList.map(function(eddi){
					var eddiId = Object.keys(eddi)[0],
						removeButton = $(buttonString).attr('data-id', eddiId);
					return $('div');
				})
				.reduce(function(htmlString, eddiHtml){

				}, '');
		//insert html into selector
		return $(selector).html(html);
	}

	//Cookies
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
		return new Promise(function(resolve, reject){
			refs.USER.child(id).set(user, function(error){
				if(error) return reject(error);
				var submission = {};
				submission[id] = user;
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

	function getAllEddiByUser(userId){
		return new Promise(function(resolve, reject){
			refs.USER
				.child(userId)
				.child(paths.EDDI_PATH)
				.once('value', function(data){
					var eddiList = data.val();
					if(!eddiList) return reject(new Error('There is no list of eddis.'));
					eddiList = Object.keys(eddiList).map(function(key){
						return eddiList[key];
					});
					resolve(eddiList);
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
			refs.EDDI.child(id).once('value', function(data){
				var eddi = data.val();
				if(!eddi) return reject(new Error('Eddi machine "' + id + '" does not exist'));
				resolve(eddi);
			}, reject);
		});
	}

	function assignEddiToUser(userId, eddiId){
		return new Promise(function(resolve, reject){
			refs.USER.child(userId)
					.child(paths.EDDI_PATH)
					.push(eddiId, function(error){
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
		if(typeof state !== 'number') state = parseInt(state);
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
			}, {}),
			eddiId = submission.id,
			userId = cache.user.uid;
		console.log('machine form submitted', data);
		console.dir(submission);
		findByEddi(eddiId)
			.then(function(eddi){
				return assignEddiToUser(userId, eddiId);
			})
			.catch(function(error){
				return showEddiError(error.message);
			});
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
	});

	$('#machine-list > button').click(function(e){
		e.preventDefault();
		var userId = cache.user.uid;
		getAllEddiByUser(userId)
			.then(function(eddiList){
				console.log('got all eddiList', eddiList);
				var getEddiDetails = eddiList.map(function(eddiId){
					return findByEddi(eddiId)
							.then(function(details){
								var obj = {};
								obj[eddiId] = details;
								return obj;
							});
				});
				return Promise.all(getEddiDetails)
						.then(function(eddiDetails){
							console.log('this is the eddi details', eddiDetails);
							return showEddiListError(JSON.stringify(eddiDetails, null, '\t'));
						});
			})
			.catch(function(error){
				return showEddiListError(error.message);
			});
	});

});