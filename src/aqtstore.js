import  { readable, writable } from 'svelte/store'

let value = "";
let aqtpass = 'abcd';

export const gtcode = writable(value) ;
export const isLogged = writable(0);
export const authApps = writable("");
export const userid = writable("");
export const appids = writable([]) ;
export const rooturl = readable('http://localhost:5880');
export const intlMs = writable(0);
export const getCheckPass = async ( password ) => {
	if ( password === aqtpass )
		return 1
} ;

export const setCheckPass = async ( password ) => {
  aqtpass = password ;
}