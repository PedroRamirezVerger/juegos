/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils'],
 function(oj, ko, $, app, moduleUtils) {
  
    function SalaDeEsperaViewModel() {
      var self = this;

      // Header Config
      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel':new app.getHeaderModel()})
      })

     
      self.connected = function() {
        // Implement if needed
      };

      /**
      aaaa
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

     
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

   
    return new SalaDeEsperaViewModel();
  }
);
