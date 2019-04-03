/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils','ojs/ojinputtext'],
 function(oj, ko, $, app, moduleUtils) {

    function RegisterViewModel() {
      var self = this;
      self.userName=ko.observable("");
      self.pwd1=ko.observable("");
      self.pwd2=ko.observable("");
      self.email=ko.observable("");




      self.register=function(event){
        var recurso="http://localhost:8080/register";
        var data ={
          type :"Register",
          email: self.email(),
          userName:self.userName(),
          pwd1:self.pwd1(),
          pwd2:self.pwd2()
        };
        data=JSON.stringify(data);
        $.ajax({
          url : recurso,
          type :"POST",
          data: data,
          headers : {
            'Content-Type': 'application/json'
          },
          success : registerOK

        });

      }
      function registerOK(){
        app.router.go("login");
      }
      // Header Config
      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel':new app.getHeaderModel()})
      })

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new RegisterViewModel();
  }
);
