/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojbutton'],
 function(oj, ko, $, app, moduleUtils) {
  
    function TableroViewModel() {
      var self = this;
      self.dealWithMessage=function(data){
          console.log(data);
      }
      // Header Config
      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel':new app.getHeaderModel()})
      })

      self.handleActivated=function(info){
        self.userName=ko.observable(app.userName);
        self.opponentUserName=ko.observable(app.opponentUserName);
        self.currentPlayerUsername=ko.observable(app.currentPlayerUsername);
      }
      self.move = function(event) {
        var id=event.target.parentElement.id;
        id=id.substring(1);
        var coordinates = [];
        coordinates.push(parseInt(id.charAt(0)));
        coordinates.push(parseInt(id.charAt(1)));
        app.move(coordinates);
      }
      self.connected = function() {
        var info =JSON.parse(sessionStorage.info);
        self.dealWithMessage(info);
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

   
    return new TableroViewModel();
  }
);
