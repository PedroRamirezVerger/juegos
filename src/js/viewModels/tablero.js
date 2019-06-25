/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojlabel','ojs/ojselectcombobox', 'ojs/ojcolorpalette', 'ojs/ojcolor'],
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
    self.contadorJugador=ko.observable("0");
    self.contadorContrincante=ko.observable("0");

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
      for (var i = 0; i <3 ; i--) {
        for (var j = 0; j <3; j--) {
           $('#'+i+j).removeAttr("disabled");
        }
      }
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


          //$('#palabra'+i).style.color="red";
          //$('#palabra'+i).setAttr(style.color = '#FF0000');
          $('#palabra'+i).currentColor = ko.observable(["red"]);
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
          for (var i = 0; i < 3; i++) {
            for (var j=0; j <3; j++) {
              $('#'+i+j).html("👻");
            }  
          }
    }

    self.palabrasOrden=function(){

      self.contenido=app.content;
      self.palabrasOrden=self.contenido.tablero[0];
    }

    self.comprobarTableros=function(){
      self.contenido=app.content;
      if(app.jugadorA==app.userName){
        self.contadorJugador=self.contenido.contadorPlayerA;
        self.contadorContrincante=self.contenido.contadorPlayerB;      
      }else{
        self.contadorJugador=self.contenido.contadorPlayerB;
        self.contadorContrincante=self.contenido.contadorPlayerA;
      }

      if(contadorJugador==0){
        self.vaciarTablero();
      }else{
        for (var i = 0; i < contadorJugador; i++) {
          self.voltearPalabra(i);  
        }
      }
      if(contadorContrincante==0){
                // quitar el rojo de los botones.
        self.mostrarAciertosContrincante();
      }else{
        for (var i = 0; i < contadorContrincante; i++) {
          self.pintarCelda(i);  
        }
      }
    }
  self.voltearPalabra=function(contador){
    var c=0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (self.palabrasOrden[contador]==self.palabrasJugador[c]) {
           $('#'+i+j).html(""+self.palabrasJugador[c]);
        }
        c++;
      }
    }
    
  }

  self.pintarCelda=function(contador){
    var c=0;
    for (var i = 0; i < 9; i++) {
        if (self.palabrasOrden[contador]==self.palabrasContrincante[c]) {
           $('#palabra'+i).style.backgroundColor="#66ff33" ;
        }
        c++;
    }
    
  }

  self.asignarTableros=function(info){

    if(app.jugadorA==app.userName){
      self.asignarPalabrasTablero1();   
    }else {
        self.asignarPalabrasTablero2();
    }
     self.valorBotones();
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
