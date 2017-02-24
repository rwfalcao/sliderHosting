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

//variáveis dos sliders
var sliderMemoria = jQuery("#memoria");
var sliderDisco = jQuery("#disco");
var sliderProcessador = jQuery("#processador");
var sliderBanda = jQuery("#banda");

//variáveis dos valores de cada componente e total
var spanTotal = jQuery(".total");
var spanMemoria = jQuery("span.memoria");
var spanDisco = jQuery("span.disco");
var spanBanda = jQuery("span.banda");
var spanProcessador = jQuery("span.processador");
var spanUnidadeDisco = jQuery("#discoGigas");

// outros elemetnos
var formHosting = jQuery("#formHosting");
var contactButton = jQuery("#contactButton");
var nameForm = jQuery('#myname');
var configForm = document.getElementById('mymessageHosting');
var buttonCancelar = jQuery("input[value='Cancelar']");

//Inicio do slider MEMORIA

sliderMemoria.slider({
  formatter: function(value) {
    return value + ' GB';
  },
  id: 'memoriaSlider',
  min: 2,
  max: 32,
  step: 1,
  value: 2,
  tooltip_position: 'bottom',
  tooltip: 'hide',
  labelledby: 'descMemoria'



});

var memoriaSliderHandle = jQuery("#memoriaSlider>.slider-handle");

sliderMemoria.on("change", function(slideEvt) {
  qtdeRam = slideEvt.value.newValue;
  precoMem = ((slideEvt.value.newValue) * 23.79).toFixed(2);
  precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
  spanTotal.html(toStringComma(precoTotal));
  spanMemoria.html(toStringComma(precoMem));
  memoriaSliderHandle.attr("aria-valuetext", qtdeRam + " GB");

});

//Fim do slider MEMORIA


//Inicio do slider DISCO

sliderDisco.slider({
  formatter: function(value) {
    if (value == 1) {
      precoDisco = 0;
      return '50 GB'
    }
    if (value >= 2 && value <= 6) {
      precoDisco = ((value - 1) * 120).toFixed(2);
      return (value * 100 - 100) + ' GB';
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
  tooltip: 'hide',
  labelledby: 'descDisco'

});

var discoSliderHandle = jQuery("#discoSlider>.slider-handle");


sliderDisco.on("change", function(slideEvt) {
  inputDisco = document.getElementById("disco").value;
  precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
  spanTotal.html(toStringComma(precoTotal));
  spanDisco.html(toStringComma(precoDisco));
  spanUnidadeDisco.html(gigasDisco);
  discoSliderHandle.attr("aria-valuetext", qtdDisco() + gigasDisco());


});

//Fim do slider de DISCO


//Inicio do slider PROCESSADOR

sliderProcessador.slider({
  formatter: function(value) {
    return value + ' CPUs';
  },
  id: 'processadorSlider',
  min: 2,
  max: 24,
  step: 1,
  value: 2,
  tooltip_position: 'bottom',
  tooltip: 'hide',
  labelledby: 'descProcessador'

});

var processadorSliderHandle = jQuery("#processadorSlider>.slider-handle");


sliderProcessador.on("change", function(slideEvt) {

  qtdeCpu = slideEvt.value.newValue;
  precoProcessador = ((slideEvt.value.newValue) * 383.14).toFixed(2);
  precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
  spanTotal.html(toStringComma(precoTotal));
  spanProcessador.html(toStringComma(precoProcessador));
  processadorSliderHandle.attr("aria-valuetext", qtdeCpu + " CPUs");

});

//Fim do slider PROCESSADOR


//Inicio do slider de BANDA

sliderBanda.slider();

var bandaSliderHandle = jQuery("#bandaSlider>.slider-handle");
var tick2e3 = jQuery("div#bandaSlider>div.slider-tick-container>div:nth-child(3) , div#bandaSlider>div.slider-tick-container>div:nth-child(2)");
var tick3 = jQuery("div#bandaSlider>div.slider-tick-container>div:nth-child(3)");

bandaSliderHandle.attr("aria-valuetext", "25 MegaBytes por segundo");
bandaSliderHandle.attr("aria-labelledby", "descBanda");

sliderBanda.on("change", function(slideEvt) {
  inputBanda = document.getElementById("banda").value;

  switch (slideEvt.value.newValue) {
    case 1:
      bandaSliderHandle.attr("aria-valuetext", "25 MegaBytes por segundo");
      precoBanda = 4287.49;
      break;
    case 2:
      bandaSliderHandle.attr("aria-valuetext", "50 MegaBytes por segundo");
      precoBanda = 8574.97;
      break;
    case 3:
      bandaSliderHandle.attr("aria-valuetext", "100 MegaBytes por segundo");
      precoBanda = 17142.64;
  }

  positionBanda();
  precoTotal = (Number(precoMem) + Number(precoDisco) + Number(precoProcessador) + Number(precoBanda)).toFixed(2);
  spanTotal.html(toStringComma(precoTotal));
  spanBanda.html(toStringComma(precoBanda));
});


//Fim do slider de BANDA


//Funções de comportamento por click

contactButton.click(function() {
  jQuery(this).fadeOut("500", function() {
    jQuery(this).addClass("display-none");
  });
  formHosting.delay(500).slideDown(500, function() {
    nameForm.focus();
  });
  hardwareConfigMessage();
  configForm.value = message;
});
buttonCancelar.click(function() {
  formHosting.slideUp("500", function() {
    contactButton.fadeIn("500");
  });
})

// Funções de comportamento do teclado

jQuery(document).keypress(function(e) {
  if (e.which == 13) {
    if ((contactButton.is(":focus"))) {
      contactButton.fadeOut("500", function() {
        contactButton.addClass("display-none");
      });
      formHosting.delay(500).slideDown(500, function() {
        nameForm.focus();
      });
      hardwareConfigMessage();
      configForm.value = message;
    }
    if ((buttonCancelar.is(":focus"))) {
      formHosting.slideUp("500", function() {
        contactButton.fadeIn("500");
      });
    }
  }
});

// Funções gerais

var slidersAll = jQuery("#memoria, #disco, #processador, #banda");

slidersAll.on("slideStop", function() {
  hardwareConfigMessage();
  configForm.value = message;
})

function ouputMemoria() {
  return qtdeRam + ' GB';
}

function outputProcessador() {
  return qtdeCpu + ' CPU';
}

function valorBanda() {
  if (inputBanda == 1) {
    qtdeBanda = 25;
    return 25;
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

function qtdDisco() {
  if (inputDisco == 1) {
    qtdeDisco = 50;
    return qtdeDisco;
  } else if (inputDisco >= 2 && inputDisco <= 6) {
    qtdeDisco = inputDisco * 100 - 100;
    return qtdeDisco;
  } else if (inputDisco > 6) {
    qtdeDisco = inputDisco - 6
    return qtdeDisco;
  }
}

function discoValorUnidade() {
  return qtdDisco() + ' ' + gigasDisco();
}

function positionBanda() {
  if (bandaSliderHandle.attr("aria-valuenow") == 1) {
    tick2e3.removeClass("in-selection");
  }
  if (bandaSliderHandle.attr("aria-valuenow") == 2) {
    tick3.removeClass("in-selection");
  }
}

function hardwareConfigMessage() {
  qtdDisco();
  gigasDisco();
  valorBanda();

  message = "";
  message += "Processador:  " + qtdeCpu + " CPUs" + "\n";
  message += "RAM: " + qtdeRam + " GB" + "\n";
  message += "Disco: " + qtdeDisco + " " + unidadeDisco + "\n";
  message += "Banda: " + qtdeBanda + " Mbps" + "";

}

function toStringComma(preco) {
  preco = preco.toString().replace(".", ",");
  return preco;
}
