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


      self.palabra1 =ko.observable("");
      self.palabra2 =ko.observable("");
      self.palabra3 =ko.observable("");
      self.palabra4 =ko.observable("");
      self.palabra5 =ko.observable("");
      self.palabra6 =ko.observable("");
      self.palabra7 =ko.observable("");
      self.palabra8 =ko.observable("");
      self.palabra9 =ko.observable("");

      self.palabra11 =ko.observable("");
      self.palabra21 =ko.observable("");
      self.palabra31 =ko.observable("");
      self.palabra41 =ko.observable("");
      self.palabra51 =ko.observable("");
      self.palabra61 =ko.observable("");
      self.palabra71 =ko.observable("");
      self.palabra81 =ko.observable("");
      self.palabra91 =ko.observable("");

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


      }
      self.asignarPalabrasTablero1=function(){
          self.contenido=app.content;
          self.tablero1=self.contenido.tablero[1];
          self.palabra1=self.tablero1.tablero1[0];
          self.palabra2=self.tablero1.tablero1[1];
          self.palabra3=self.tablero1.tablero1[2];
          self.palabra4=self.tablero1.tablero1[3];
          self.palabra5=self.tablero1.tablero1[4];
          self.palabra6=self.tablero1.tablero1[5];
          self.palabra7=self.tablero1.tablero1[6];
          self.palabra8=self.tablero1.tablero1[7];
          self.palabra9=self.tablero1.tablero1[8];

      }
      self.asignarPalabrasTablero2=function(){
          self.contenido=app.content;
          self.tablero2=self.contenido.tablero[2];
          $('#palabra11').html(""+self.tablero2.tablero2[0]);
          $('#palabra21').html(""+self.tablero2.tablero2[1]);
          $('#palabra31').html(""+self.tablero2.tablero2[2]);
          $('#palabra41').html(""+self.tablero2.tablero2[3]);
          $('#palabra51').html(""+self.tablero2.tablero2[4]);
          $('#palabra61').html(""+self.tablero2.tablero2[5]);
          $('#palabra71').html(""+self.tablero2.tablero2[6]);
          $('#palabra81').html(""+self.tablero2.tablero2[7]);
          $('#palabra91').html(""+self.tablero2.tablero2[8]);
      }

      self.connected = function() {
        var info =JSON.parse(sessionStorage.info);
        self.dealWithMessage(info);
        self.handleActivated(info);

        self.asignarPalabrasTablero1();
        self.asignarPalabrasTablero2();
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
