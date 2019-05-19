/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojselectcombobox'],
 function(oj, ko, $, app, moduleUtils) {

    function JuegosViewModel() {
      var self = this;
      self.selectedGame=ko.observable("");
      self.games=ko.observableArray([]);

      function loadGames(){
        if (app.userName!=null){
          var recurso="http://localhost:8080/getGames";
          $.ajax({
            url : recurso,
            type :"GET",

            xhrfields : {
              withCredentials : true
            },
            success : showGames
          });
        }
        
      }
      function showGames(respuesta){
        var juegos= respuesta.resultado.games;
        var tempArray= [];
        for (var i=0; i<juegos.length; i++){
          tempArray.push(
            {
              'value' : juegos[i],
              'label' : juegos[i]
            }
          );
        }
        self.games(tempArray);
        self.selectedGame("");
      }
      self.joinGame=function(){
        var recurso="http://localhost:8080/joinGame";
        var data ={
          gameName:self.selectedGame()
        };


        data="p="+JSON.stringify(data);
        $.ajax({
          url : recurso,
          type :"POST",
          data: data,
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          xhrFields: {
            withCredentials: true
          },
          success : app.router.go("salaDeEspera")

        });
      }
     

      self.handleActivated= function(info){
        loadGames();
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
        loadGames();
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
    return new JuegosViewModel();
  }
);
