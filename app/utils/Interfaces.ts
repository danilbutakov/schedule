export interface Chat {
	uids: string[];
	messages: string[];
	combinedId: string;
	date: string;
}

export interface User {
	email: string;
	group: string;
	photoURL: string;
	profileName: string;
	role: string;
	uid: string;
	univ: string;
}
