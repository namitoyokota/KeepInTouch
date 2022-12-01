import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, deleteDoc, Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData, updateDoc, QuerySnapshot } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

import { environment } from '../environments/environment';
import { Friend } from '../abstractions/friend';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {

	private friends = new BehaviorSubject<Friend[]>([]);

	friends$ = this.friends.asObservable();

	private firebaseApp: FirebaseApp;

	private firebaseDb: Firestore;

	private friendsCollection: CollectionReference<DocumentData>;

	private friendsSnapshot: QuerySnapshot<DocumentData>;

	constructor() {
		this.initialize();
		this.getFriends();
	}

	addFriend(newFriend: Friend) {
		addDoc(this.friendsCollection, {
			id: newFriend.id,
			name: newFriend.name,
			favorite: newFriend.favorite
		}).then(() => {
			this.getFriends();
		}).catch(error => {
			console.warn(error);
		});
	}

	updateFriend(friend: Friend) {
	}

	removeFriend(friend: Friend) {
		const friendDoc = this.findFriendDoc(friend);
		deleteDoc(friendDoc).then(ref => {
			this.getFriends();
		}).catch(error => {
			console.warn(error);
		});
	}

	findFriendDoc(friend: Friend) {
		let friendDoc;
		this.friendsSnapshot.docs.forEach(doc => {
			const user: Friend = doc.data();
			if (user.id === friend.id) {
				friendDoc = doc.ref;
			}
		});

		return friendDoc;
	}

	private initialize() {
		this.firebaseApp = initializeApp(environment.firebase);
		this.firebaseDb = getFirestore(this.firebaseApp);

		// const analytics = getAnalytics(this.firebaseApp);
	}

	private async getFriends() {
		this.friendsCollection = collection(this.firebaseDb, 'friends');
		this.friendsSnapshot = await getDocs(this.friendsCollection);

		const friends = this.friendsSnapshot.docs.map(doc => doc.data());
		this.friends.next(friends);
	}
}