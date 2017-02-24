var precoMem = 47.58;
var precoDisco = 120;
var precoProcessador = 766.28;
var precoBanda = 4287.49;
var precoTotal = 5101.35;

var inputBanda = 0;
var inputDisco = 0;

var qtdeCpu = 2;
var qtdeRam = 2;
var qtdeDisco = 50;
var unidadeDisco = 'GB';
var qtdeBanda = 25;
var message;

var sliderMemoria = jQuery("#memoria");
var sliderDisco = jQuery("#disco");
var sliderProcessador = jQuery("#processador");
var sliderBanda = jQuery("#banda");
var spanTotal = jQuery(".total");


jQuery("#memoria, #disco, #processador, #banda").on("slideStop", function(){
  hardwareConfigMessage();
  document.getElementById('mymessageHosting').value = message;
})


//Inicio do slider MEMORIA

sliderMemoria.slider({
    formatter: function (value) {
        return value + ' GB';
    },
    id: 'memoriaSlider',
    min: 2,
    max: 32,
    step: 1,
    value: 2,
    tooltip_position: 'bottom',
    tooltip: 'hide'


});

var bandaSliderHandle = jQuery("#bandaSlider>.slider-handle");

sliderMemoria.on("change", function (slideEvt) {
    qtdeRam = slideEvt.value.newValue;
    precoMem = ((slideEvt.value.newValue) * 23.79).toFixed(2);
    precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
    spanTotal.html(toStringComma(precoTotal));
    jQuery("span.memoria").html(toStringComma(precoMem));
    jQuery("#memoriaSlider>.slider-handle").attr("aria-valuetext", slideEvt.value.newValue + " GB");

});

//Fim do slider MEMORIA


//Inicio do slider DISCO

sliderDisco.slider({
    formatter: function (value) {
        if(value == 1){
            precoDisco = 0;
            return '50 GB'
        }
        if (value >= 2 && value <= 6) {
            precoDisco = ((value-1) * 120).toFixed(2);
            return (value * 100-100) + ' GB';
        }
        if (value > 6) {
            precoDisco = ((value - 6) * 1200).toFixed(2);
            return (value - 6) + ' TB';
        }

    },
    id: 'discoSlider',
    min: 1,
    max: 16,
    step: 1,
    value: 1,
    tooltip_position: 'bottom',
    tooltip: 'hide'

});


sliderDisco.on("change", function (slideEvt) {
    inputDisco = document.getElementById("disco").value;
    precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
    spanTotal.html(toStringComma(precoTotal));
    jQuery("span.disco").html(toStringComma(precoDisco));
    jQuery("#discoGigas").html(gigasDisco);


});

//Fim do slider de DISCO


//Inicio do slider PROCESSADOR

sliderProcessador.slider({
    formatter: function (value) {
        return value + ' CPUs';
    },
    id: 'processadorSlider',
    min: 2,
    max: 24,
    step: 1,
    value: 2,
    tooltip_position: 'bottom',
    tooltip: 'hide'

});


sliderProcessador.on("change", function (slideEvt) {

    qtdeCpu = slideEvt.value.newValue;
    precoProcessador = ((slideEvt.value.newValue) * 383.14).toFixed(2);
    precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
    spanTotal.html(toStringComma(precoTotal));
    jQuery("span.processador").html(toStringComma(precoProcessador));

});

//Fim do slider PROCESSADOR


//Inicio do slider de BANDA

sliderBanda.slider();

var bandaSliderHandle = jQuery("#bandaSlider>.slider-handle");


bandaSliderHandle.attr("aria-valuetext", "25 MegaBytes por segundo");
//jQuery("#bandaliderVal").text(25);

sliderBanda.on("change", function (slideEvt) {
    inputBanda = document.getElementById("banda").value;



    switch (slideEvt.value.newValue) {
    case 1:
        jQuery("#bandaSlider>.slider-handle").attr("aria-valuetext", "25 MegaBytes por segundo");
        precoBanda = 4287.49;
        break;

    case 2:
        jQuery("#bandaSlider>.slider-handle").attr("aria-valuetext", "50 MegaBytes por segundo");
        precoBanda = 8574.97;
        break;

    case 3:
        bandaSliderHandle.attr("aria-valuetext", "100 MegaBytes por segundo");
        precoBanda = 17142.64;

    }

    positionBanda();
    precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
    spanTotal.html(toStringComma(precoTotal));
    jQuery("span.banda").html(toStringComma(precoBanda));

});


//Fim do slider de BANDA


//Adição do label de cada slider
jQuery("#memoriaSlider>.slider-handle").attr("aria-labelledby", "descMemoria");
jQuery("#discoSlider>.slider-handle").attr("aria-labelledby", "descDisco");
jQuery("#processadorSlider>.slider-handle").attr("aria-labelledby", "descProcessador");
jQuery("#bandaSlider>.slider-handle").attr("aria-labelledby", "descBanda");

//Funções de comportamento por click

jQuery("#contactButton").click(function(){
  jQuery(this).fadeOut("500", function(){
    jQuery(this).addClass("display-none");
  });
  jQuery("#formHosting").delay(500).slideDown(500, function(){
    jQuery('#myname').focus();

  });
  hardwareConfigMessage();
  document.getElementById('mymessageHosting').value = message;
});

jQuery("input[value='Cancelar']").click(function(){
  jQuery("#formHosting").slideUp("500", function(){
    jQuery("#contactButton").fadeIn("500");
  });
})

// Funções de comportamento do teclado

jQuery(document).keypress(function(e) {
  if(e.which == 13) {
      if( (jQuery("#contactButton").is(":focus")) ){
        jQuery("#contactButton").fadeOut("500", function(){
          jQuery("#contactButton").addClass("display-none");
        });
        jQuery("#formHosting").delay(500).slideDown(500, function(){
          jQuery('#myname').focus();

        });
        hardwareConfigMessage();
        document.getElementById('mymessageHosting').value = message;
      }

      if ((jQuery("input[value='Cancelar").is(":focus"))){
        jQuery("#formHosting").slideUp("500", function(){
          jQuery("#contactButton").fadeIn("500");
        });
      }

  }
 });



 // Funções gerais

function valorBanda() {
    if (inputBanda == 1) {
        qtdeBanda = 25;
        return 25 ;
    }
    if (inputBanda == 2) {
        qtdeBanda = 50;
        return 50;
    }
    if (inputBanda == 3) {
        qtdeBanda = 100;
        return 100;
    }
}

function gigasDisco() {

    if (inputDisco >= 1 && inputDisco <= 6) {
        unidadeDisco = 'GB';
        return ' GB';
    }
    if (inputDisco > 6) {
        unidadeDisco = 'TB';
        return ' TB';
    }
}

function qtdDisco(){
    if(inputDisco == 1){
        qtdeDisco = 50;
        return qtdeDisco;
    }
    if (inputDisco >= 2 && inputDisco <= 6) {
        qtdeDisco = inputDisco*100-100;
        return qtdeDisco;
    }
    if (inputDisco > 6) {
        qtdeDisco = inputDisco - 6
        return qtdeDisco;
    }
}

function positionBanda(){
  if(jQuery('div[aria-labelledby=descBanda]:first').attr("aria-valuetext") == '25 MegaBytes por segundo'){
    jQuery("div#bandaSlider>div.slider-tick-container>div:nth-child(3) , div#bandaSlider>div.slider-tick-container>div:nth-child(2)").removeClass("in-selection")
  }
  if(jQuery('div[aria-labelledby=descBanda]:first').attr("aria-valuetext") == '50 MegaBytes por segundo'){
    jQuery("div#bandaSlider>div.slider-tick-container>div:nth-child(3)").removeClass("in-selection")
  }
}

function hardwareConfigMessage(){
  qtdDisco();
  gigasDisco();
  valorBanda();

  message = "";
  message += "Processador:  "+qtdeCpu+" CPUs"+"\n";
  message += "RAM: "+qtdeRam+" GBs"+"\n";
  message += "Disco: "+qtdeDisco+" "+unidadeDisco+"\n";
  message += "Banda: "+qtdeBanda+" MBPs"+"";

}



function toStringComma(preco) {
    preco = preco.toString().replace(".", ",");
    return preco;
}
