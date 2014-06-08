/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        var db = window.openDatabase("apretaste", "1.0", "Apretaste!com", 2000);
    	db.transaction(this.populateDB, this.errorCB, this.successCB);
    	db.transaction(this.queryDB, this.errorCB);
	       		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    populateDB: function (tx) {
	    tx.executeSql('DROP TABLE IF EXISTS DEMO;');
	    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data);');
	    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row");');
	    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row");');
	},
	errorCB: function (err) {
	    alert("Error processing SQL: "+err.message);
	},	
	successCB: function () {
	    alert("success!");
	},
	queryDB: function (tx) {
	    tx.executeSql('SELECT * FROM DEMO;', [], this.querySuccess, this.errorCB);
	},
	querySuccess: function (tx, results) {
		console.log("Returned rows = " + results.rows.length);
		
		// this will be true since it was a select statement and so rowsAffected was 0
		
		if (!resultSet.rowsAffected) {
		  console.log('No rows affected!');
		  return false;
		}
		
		// for an insert statement, this property will return the ID of the last inserted row
		console.log("Last inserted row ID = " + results.insertId);
	},
	errorCB: function (err) {
	    alert("Error processing SQL: "+err.code);
	}
};
