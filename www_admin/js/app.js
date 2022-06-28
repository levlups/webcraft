import {API_Client} from './api.js';

export class UIApp {

    constructor() {
        this.api = new API_Client();
        // Session
        this._loadSession();
        // Hooks
        this.onLogin = (e) => {};
        this.onLogout = (e) => {};
        this.onError = (e) => {};
    }
    
    // MyWorlds...
    async Login(form, callback, callback_error, callback_progress, callback_final) {
        let result = [];
        const self = this;
        await this.api.call(this, '/api/Admin/Login', form, (resp) => {
            result = resp;
            localStorage.setItem('session', JSON.stringify(result));
            self._loadSession();
            if(callback) {
                callback(result);
            }
        }, callback_error, callback_progress, callback_final);
        return result;
    }

    // MyWorlds...
    async ListWorlds(form, callback, callback_error, callback_progress, callback_final) {
        let result = [];
        await this.api.call(this, '/api/Admin/ListWorlds', form, (resp) => {
            result = resp;
            if(callback) {
                callback(result);
            }
        }, callback_error, callback_progress, callback_final);
        return result;
    }
    
    async ListPlayers(form, callback, callback_error, callback_progress, callback_final) {
        let result = [];
        await this.api.call(this, '/api/Admin/ListPlayers', form, (resp) => {
            result = resp;
            if(callback) {
                callback(result);
            }
        }, callback_error, callback_progress, callback_final);
        return result;
    }
    
    async InfoPlayer(form, callback, callback_error, callback_progress, callback_final) {
        console.log(form);
        let result = [];
        await this.api.call(this, '/api/Admin/InfoPlayer', form, (resp) => {
            result = resp;
            if(callback) {
                callback(result);
            }
        }, callback_error, callback_progress, callback_final);
        return result;
    }
    
    getSession() {
        return this.session;
    }
    
    _loadSession() {
        // Session
        let session = localStorage.getItem('session');
        if(session) {
            this.session = JSON.parse(session);
        } else {
            this.session = null;
        }
    }
    
    logout(result) {
        this.session = null;
        localStorage.removeItem('session');
        this.onLogout(result);
    }
    
    showError(message) {
        this.onError(message);
    }
    
}