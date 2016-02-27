'use strict';
const Firebase = require('firebase');

var paths = {
	BASE_PATH : 'https://eddi.firebaseIO.com',
	USER_PATH : 'user',
	EDDI_PATH : 'eddi',
	METRIC_PATH : 'metrics',
	STATE_PATH : 'state',
	PIN_PATH : 'pins',
	SETTINGS_PATH : 'settings',
	SALINITY_PATH : 'salinity',
	TESTEDDI_PATH : 'test-eddi'
};

class EddiFire {
	constructor(){
		const ref = new Firebase(paths.BASE_PATH);

		this.refs = {
			BASE : ref,
			USER : ref.child(paths.USER_PATH),
			EDDI : ref.child(paths.EDDI_PATH)
		};
	}

	isAuthenticated(){
		return new Promise((resolve, reject) => {
			const user = this.refs.BASE.getAuth();
			if(!user) return reject(new Error('User is not authenticated.'));
			resolve(user);
		})
	}

	authenticateWithToken(token){
		return new Promise((resolve, reject) => {
			this.refs.BASE.auth(token, (error, user) => {
				if(error) return reject(error);
				resolve(user);
			});
		});
	}

	authenticateWithPassword(email, password){
		const submission = { email, password };
		return new Promise((resolve, reject) => {
			this.refs.BASE.authenticateWithPassword(
				submission, 
				(error, user) => {
					if(error) return reject(error);
					resolve(user);
				}
			);
		})
	}

	unauthenticate(){
		return refs.BASE.unauth();
	}

	getUserProfile(id){
		return new Promise((resolve, reject) => {
			this.refs.USER.child(id).once('value', (user) => {
				if(!user) return reject(new Error('Profile does not exist for this user.'));
				resolve(user);
			});
		});
	}

	createUser(email, password){
		const submission = { email, password };
		return new Promise((resolve, reject) => {
			this.refs.BASE.createUser(
				submission, 
				(error, user) => {
					if(error) return reject(error);
					resolve(user);
				}
			);
		});
	}

	createUserProfile(id, user){
		return new Promise((resolve, reject) => {
			this.refs.USER.child(id).set(
				user, 
				(error) => {
					if(error) return reject(error);
					const submission = {};
					submission[id] = user;
					resolve(submission);
				}
			);
		});
	}

	updateUserProfile(id, update){
		return new Promise((resolve, reject) => {
			this.refs.USER.child(id).update(update, (error) => {
				if(error) return reject(error);
				resolve();
			});
		});
	}

	getAllEddiByUser(userId){
		return new Promise((resolve, reject) => {
			this.refs.EDDI
				.child(paths.USER_PATH)
				.equalTo(userId)
				.once('value', data => {
					const eddiList = data.val();
					if(!eddiList) return reject(new Error('There is no list of eddis for this user.'));
					eddiIdList = Object.keys(eddiList).map(key => {
						return eddiList[key];
					});
					resolve(eddiIdList);
				});
		});
	}

	findByEddi(id){
		return new Promise((resolve, reject) => {
			this.refs.EDDI.child(id).once('value', data => {
				const eddi = data.val();
				if(!eddi) return reject(new Error(`Eddi machine ${id} does not exist.`));
				resolve(eddi);
			}, reject);
		});
	}

	assignEddiToUser(userId, eddiId){
		return new Promise((resolve, reject) => {
			this.refs.EDDI.child(eddiId)
						.child(paths.USER_PATH)
						.set(
							userId, 
							error => {
								if(error) return reject(error);
								resolve();
							}
						);
		});
	}

	unassignEddiToUser(userId, eddiId){
		return new Promise((resolve, reject) => {
			this.refs.EDDI.child(eddiId)
						.child(paths.USER_PATH)
						.set(
							null,
							error => {
								if(error) return reject(error);
								resolve();
							}
						);
		});
	}

	isEddiOwner(eddiId){
		return isAuthenticated()
			.then(user => {
				const userId = user.uid;
				this.refs.EDDI.child(eddiId)
						.child(paths.USER_PATH)
						.once('value', (error, data) => {
							if(error) return reject(error);
							else if(data === userId) return resolve();
							else return reject('User is not the owner of this eddi.');
						});
			});
	}

	setSalinityLevel(eddiId, salinityLevel){
		return isEddiOwner(eddiId)
			.then(() => {
				this.refs.EDDI.child(eddiId)
						.child(paths.SETTINGS_PATH)
						.child(paths.SALINITY_PATH)
						.set(
							salinityLevel, 
							error => {
								if(error) return reject(error);
								resolve();
							}
						);
			});
	}

}


export default function(){
	var init;
	if(init) return init;
	else {
		init = new EddiFire();
		return init;
	}
}