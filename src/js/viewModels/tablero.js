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
      self.opponentUserName=ko.observable(app.opponentUserName);
      self.email=ko.observable(app.email);
      self.selectedGame=ko.observable("");
      self.palabrasOrden=ko.observableArray([]);
      self.palabrasJugador=ko.observableArray([]);
      self.palabrasContrincante=ko.observableArray([]);
      self.contadorJugadorA=ko.observable("0");
      self.contadorJugadorB=ko.observable("0");





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

      self.desbloquearBotones=function(){

        $('#palabra1').removeAttr("disabled");
        $('#palabra2').removeAttr("disabled");
        $('#palabra3').removeAttr("disabled");
        $('#palabra4').removeAttr("disabled");
        $('#palabra5').removeAttr("disabled");
        $('#palabra6').removeAttr("disabled");
        $('#palabra7').removeAttr("disabled");
        $('#palabra8').removeAttr("disabled");
        $('#palabra9').removeAttr("disabled");

      }


      self.onmessage=function(event){
        var data=JSON.parse(event.data);

      }


      self.dealWithMessage=function(data){
          console.log('data');
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

      self.valorBotones=function(){

        for (var i = 0; i < 3; i++) {
             for (var j=0; j <3; j++) {
              $('#valorBoton'+i+j).html(""+self.palabrasJugador[i+j]);
            }  
          }

      }


      self.asignarPalabrasTablero1=function(){
          // cambiar y meterlo dentro de un for
          self.contenido=app.content;
          self.tablero1=self.contenido.tablero[1];
          for (var i = 0; i < 9; i++) {
              self.palabrasJugador[i]=self.tablero1.tablero1[i];
          }



          self.tablero2=self.contenido.tablero[2];
          var contador=0;
          for (var i = 0; i < 3; i++) {
            for (var j=0; j <3; j++) {
              $('#'+i+j).html(""+self.tablero1.tablero1[contador]);
              contador++;
            }

          }
          for (var i = 0; i < 9; i++) {
              $('#palabra'+i).html(""+self.tablero2.tablero2[i]);
          }

      }

      self.asignarPalabrasTablero2=function(){
          // cambiar y meterlo dentro de un for
          self.contenido=app.content;
          self.tablero1=self.contenido.tablero[2];

          for (var i = 0; i < 9; i++) {
              self.palabrasJugador[i]=self.tablero1.tablero2[i];
          }


          self.tablero2=self.contenido.tablero[1];
          var contador=0;
          for (var i = 0; i < 3; i++) {
            for (var j=0; j <3; j++) {
              $('#'+i+j).html(""+self.tablero1.tablero2[contador]);
              contador++;
            }
          }
           
          for (var i = 0; i < 9; i++) {
              $('#palabra'+i).html(""+self.tablero2.tablero1[i]);
          }

      }
        function vaciarTablero(){
            // con ids de botones
            for (var i = 0; i < 3; i++) {
              for (var j=0; j <3; j++) {
                $('#'+i+j).html("👻");
              }  
            }
      }

      self.palabrasOrden=function(){

        self.contenido=app.content;
        self.palabrasOrden=self.contenido.tablero[0];
          // falta truncar las palabras nos vienen duplicadas
      }

      self.comprobarTableroJugador=function(){
          self.contenido=app.content;
          if(app.jugadorA==app.userName){
              self.contadorJugadorA=self.contenido.contadorPlayerA;
              self.contadorJugadorB=self.contenido.contadorPlayerB;
                if(contadorJugadorA==0){
                    self.vaciarTablero();
                }
                if(contadorJugadorB==0){
                    // quitar el rojo de los botones.
                }

                for (var i = 0; i < contadorJugadorA; i++) {
                   // var boton=self.contenido.
                }
          }else{
              self.contadorJugadorA=self.contenido.contadorPlayerB;
              self.contadorJugadorB=self.contenido.contadorPlayerA;

          }

      }
    self.traducirContador=function(){
       self.contenido=app.content;
      // self.contador=self.contenido.
    }

      self.comprobarTableroContrincante=function(){

      }

      self.asignarTableros=function(info){

          if(app.jugadorA==app.userName){

            self.asignarPalabrasTablero1();
            self.valorBotones();
        }else {

            self.asignarPalabrasTablero2();
            self.valorBotones();
        }
      }





      self.connected = function() {
        var info =JSON.parse(sessionStorage.info);
        self.dealWithMessage(info);
        self.handleActivated(info);
        self.asignarTableros();


      };

    self.clickedButton = ko.observable("(None clicked yet)");
    self.buttonClick = function(event){
        self.clickedButton=event.currentTarget.id;
        console.log(self.clickedButton);
        self.coordenada1= self.clickedButton.charAt(0);
        self.coordenada2=self.clickedButton.charAt(1);
        self.coordenadas=[self.coordenada1, self.coordenada2];
        app.move(self.coordenadas);

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
