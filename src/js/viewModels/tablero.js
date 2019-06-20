/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojlabel','ojs/ojselectcombobox'],
 function(oj, ko, $, app, moduleUtils) {
  
    function TableroViewModel() {
      var self = this;
      self.userName=ko.observable(app.userName);
      self.email=ko.observable(app.email);
      //self.palabras[]=

      self.selectedGame=ko.observable("");
      self.palabras=ko.observableArray([]);
      
      
      self.pal =ko.observable("");
      function loadPalabras(){
        if (app.userName!=null){
          var recurso="http://localhost:8080/getPalabras";
          $.ajax({
            url : recurso,
            type :"GET",

            xhrfields : {
              withCredentials : true
            },
            success : showPalabras
          });
        } 
      }
      //
      function showPalabras(respuesta){
        var palabras= respuesta.resultado.palabras;
        pal="patata";
        
        
        
       
        
      }


      self.onmessage=function(event){
        var data=JSON.parse(event.data);
       
      }


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
        self.contenido=app.content;
        self.tablero1=self.contenido.tablero[1];
        self.pal=self.tablero1.tablero1[0];
        
      }
     
      self.connected = function() {
        var info =JSON.parse(sessionStorage.info);
        self.dealWithMessage(info);
        self.handleActivated(info);
      };
    

    self.button1Text = "Button 1";

    
    self.clickedButton = ko.observable("(None clicked yet)");
    self.buttonClick = function(event){
        self.clickedButton(event.currentTarget.id);
        return true;
    }
  
    
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
