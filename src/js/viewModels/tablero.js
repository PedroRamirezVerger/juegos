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
    self.palabraActual=ko.observable("");
    self.palabrasJugador=ko.observableArray([]);
    self.palabrasContrincante=ko.observableArray([]);
    self.contadorJugador=0;
    self.contadorContrincante=0;
    self.ganador=ko.observable("");


    self.valorBoton0=ko.observable("");
    self.valorBoton1=ko.observable("");
    self.valorBoton2=ko.observable("");
    self.valorBoton3=ko.observable("");
    self.valorBoton4=ko.observable("");
    self.valorBoton5=ko.observable("");
    self.valorBoton6=ko.observable("");
    self.valorBoton7=ko.observable("");
    self.valorBoton8=ko.observable("");

    self.desbloquearBotones=function(){
      for (var i = 0; i <3 ; i++) {
        for (var j = 0; j <3; j++) {
           //$('#'+i+j).removeAttr("disabled");
           $('#'+i+j).prop('disabled', false);
        }
      }
    }
    self.move = function(coordinates) {
    var p = {
     type : "Movement",
     coordinates : coordinates,
     uuid : sessionStorage.uuid
    };
    self.ws.send(JSON.stringify(p));
    };

      function conectarWebSocket() {
        self.ws= new WebSocket("ws://localhost:8080/gamesws?uuid=" + sessionStorage.uuid);

        self.ws.onopen=function(){
          console.log("WebSocket conectado");

        }
        self.ws.onclose=function(){
          console.log("WebSocket desconectado");

        }
        self.ws.onmessage=function(event){
          console.log(event.data);
          var data=JSON.parse(event.data);
        if (data.type=="finEspera" ) {
          //Metodos de tablero.js
          //self.router.currentState().viewModel.desbloquearBotones();

          self.vaciarTablero();
          self.desbloquearBotones();
          self.actualizarPalabra(0);
          }else if(data.type=="actualizarTablero"){
            self.content=JSON.parse(data.board.content);
            self.contadorPlayerA=data.contadorPlayerA;
            self.contadorPlayerB=data.contadorPlayerB;
            //Metodos de tablero.js
             self.comprobarTableros();
          }
          if(data.type=="Movement"){
              if(data.winnerName!=null){
                  self.ganador=data.winnerName;
                  self.mostrarGanador();
              }

          }
        }
        self.ws.onerror=function(event){
          console.log(data);
        }
      }



    self.dealWithMessage=function(data){
       // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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

      //self.pintarCelda();

    self.palabrasJugador=self.tablero1.tablero1;
    self.palabrasContrincante=self.contenido.tablero[2].tablero2;




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


        self.palabrasJugador=self.tablero1.tablero2;
        self.palabrasContrincante=self.contenido.tablero[1].tablero1;




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
      self.vaciarTablero= function (){
           for (var i = 0; i < 3; i++) {
             for (var j=0; j <3; j++) {
               $('#'+i+j).html(""+"👻");
             }
          }

    }


    self.comprobarTableros=function(){
      self.contenido=self.content;
      if(app.jugadorA==app.userName){
        self.contadorJugador=self.contadorPlayerA;
        self.contadorContrincante=self.contadorPlayerB;
      }else{
        self.contadorJugador=self.contadorPlayerB;
        self.contadorContrincante=self.contadorPlayerA;
      }

      if(self.contadorJugador==0){
          self.actualizarPalabra(0);
          self.actualizarContadorJugador();
          self.vaciarTablero();
      }else{
        for (var i = 0; i < self.contadorJugador; i++) {
            self.actualizarPalabra(self.contadorJugador);
            self.actualizarContadorJugador();
            self.voltearPalabra(i);
        }
      }
      if(self.contadorContrincante==0){
                // quitar el rojo de los botones.
        self.actualizarContadorContrincante();
        self.despintarCelda();
      }else{
        for (var i = 0; i < self.contadorContrincante; i++) {
            self.actualizarContadorContrincante();
          self.pintarCelda(i);
        }
      }
    }
  self.voltearPalabra=function(contador){
    var c=0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
         var palabra1=self.palabrasOrden[contador];
         var palabra2=self.palabrasJugador[c];
        if (palabra1==palabra2) {
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
          document.getElementById('palabra'+i).style.backgroundColor="#FF0000";
        }
        c++;
    }

  }
  self.despintarCelda=function(){
    for (var i = 0; i < 9; i++) {
          document.getElementById('palabra'+i).style.backgroundColor="#FFFFFF";
    }
  }
  self.mostrarGanador=function(){

      alert("el ganador es "+self.ganador);

  }
  self.actualizarContadorJugador=function(){
      $('#cJugador').html(""+self.contadorJugador);
  }
  self.actualizarContadorContrincante=function(){
      $('#cContrincante').html(""+self.contadorContrincante);
  }
  self.actualizarPalabra=function(i){
      $('#vPalabra').html(""+self.palabrasOrden[i]);
  }

  self.asignarTableros=function(info){
    self.rellenarPalabrasOrden();
    if(app.jugadorA==app.userName){
      self.asignarPalabrasTablero1();
    }else {
        self.asignarPalabrasTablero2();
    }
   //self.palabraActual=self.palabrasOrden[0];//////////////////////

  }
  self.rellenarPalabrasOrden=function(){
    self.contenido=app.content;
    self.palabrasOrden=self.contenido.tablero[0].palabras;
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
      self.move(self.coordenadas);


      return true;
  }


    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    self.disconnected = function() {
      // Implement if needed
    };

    self.transitionCompleted = function() {
      conectarWebSocket();
    };
  }


  return new TableroViewModel();
  }
);
