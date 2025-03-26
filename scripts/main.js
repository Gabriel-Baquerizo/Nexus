"use strict";

//————————— Imports externals scripts

import "./features/theme_mode.js";


//————————— Referencias de elementos HTML + Midutemplate

const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

const $restaurant_search = $('[data-restaurant-search]');
const $restaurant_search_input = $('[data-restaurant-search] input');
const $restaurant_cadena = $('[data-nx-cadena]');
const $restaurant_local = $('[data-nx-local]');
const $restaurant_lugar = $('[data-nx-lugar]');
const $restaurant_covertura = $('[data-nx-covertura]');
const $restaurant_ciudad = $('[data-nx-ciudad]');
const $restaurant_provincia = $('[data-nx-provincia]');
const $restaurant_parroquia = $('[data-nx-parroquia]');
const $restaurant_direccion = $('[data-nx-direccion]');
const $restaurant_telefono = $('[data-nx-telefono]');
const $restaurant_contacto = $('[data-nx-contacto]');
const $restaurant_correo = $('[data-nx-correo]');
const $restaurant_cgrupal = $('[data-nx-cgrupal]');
const $restaurant_login = $('[data-nx-login]');
const $restaurant_ssid = $('[data-nx-ssid]');
const $restaurant_heladeria = $('[data-nx-heladeria]');
const $restaurant_backoffice = $('[data-nx-backoffice]');
const $device_servidor = $('[data-nx-device_servidor]');
const $device_estacion = $('[data-nx-device_estacion]');
const $device_pinpad = $('[data-nx-device_pinpad]');
const $device_heladeria = $('[data-nx-device_heladeria]');
const $device_domicilio = $('[data-nx-device_domicilio]');
const $device_drive = $('[data-nx-device_drive]');
const $device_tablet = $('[data-nx-device_tablet]');
const $device_omada = $('[data-nx-device_omada]');
const $device_telefono_ip = $('[data-nx-device_telefono_ip]');
const $device_oficina = $('[data-nx-device_oficina]');
const $device_biometrico = $('[data-nx-device_biometrico]');
const $device_switch = $('[data-nx-device_switch]');
const $device_telconet = $('[data-nx-device_telconet]');
const $all_devices = $$('[data-nx-device]');
const $factura = $('[data-nx-factura]');
const $whatsapp = $('[data-nx-whatsapp]');

//————————— Datos quedamos

const ip = {
  grupo : '10',
  puerto : '880',
  domicilio : '15',
  servidor : '20',
  pos_1: '21',
  heladeria : '28',
  drive : '30',
  kiosco_1 : '31',
  turnero : '40',
  pinpad_1 : '41',
  nano_router : '73',
  telefono_ip : '74',
  biometrico : '75',
  oficina : '76',
  omada : '77',
  tablet : '78',
  switch : '126',
  telconet : '252',
  publicidad : '131',
}

//————————— Carga de datos JSON


function loadData(id) {

  fetch('./../data/db.json')
  .then(response => response.json())
  .then(db => {

    if( db[id] ) {
      renderData(
        db[id].CADENA,
        db[id].LOCAL,
        db[id].LUGAR,
        db[id].COVERTURA,
        db[id].CIUDAD,
        db[id].PROVINCIA,
        db[id].PARROQUIA,
        db[id].DIRECCION,
        db[id].TLFIP,
        db[id].IP,
        db[id].NUMLOCAL,
        db[id].TLFLOCAL,
        db[id].HELADERIA,
        db[id].HLOCAL,
        db[id].CORREO,
        db[id].CGRUPAL,
        db[id].LOGIN,
        db[id].SSID
      );
      deviceData(
        db[id].IP,
        db[id].NUMLOCAL,
        db[id].LOCAL,
      );
    };

  })
  .catch(error => {
    console.log('Hubo un problema:', error);
  });

}
 
//————————— Input para buscar locales

$restaurant_search_input.addEventListener('input', () => {

  let digits = $restaurant_search_input.value.trim();

  $restaurant_search_input.value = digits;
  $restaurant_search_input.classList.remove('input-error')

  if( digits.length === 5 && !isNaN(digits) ) {  // Numero de teléfono IP
      $restaurant_search.classList.remove('input-error')
      loadData( digits )
      console.log("Es un número de teléfono IP")
      return
  }
  else if ( digits.length === 4 && isNaN(digits) ) {  // Código de local
      $restaurant_search.classList.remove('input-error')
      loadData( digits.toUpperCase() )  // Mayusculas y minúsculas
      console.log("Es un código de local")
      return
  }
  else if( digits.length === 0 ) {
    $restaurant_search.classList.remove('input-error')
    return
  }
  else {
      $restaurant_search.classList.add('input-error')
      return
  }
})

// Función de renderizado > Consulta la DB > Ejecuta cada función que renderiza un dato en pantalla

function renderData(
  CADENA, LOCAL, LUGAR, COVERTURA, CIUDAD, PROVINCIA, PARROQUIA, DIRECCION, TLFIP, IP, NUMLOCAL, TLFLOCAL, HELADERIA, HLOCAL, CORREO, CGRUPAL, LOGIN, SSID
) {
  $restaurant_local.textContent = LOCAL;
  $restaurant_login.textContent = LOGIN;
  $restaurant_cadena.textContent = CADENA;
  $restaurant_lugar.textContent = LUGAR;
  $restaurant_covertura.textContent = COVERTURA;
  
  $restaurant_ciudad.textContent = CIUDAD;
  $restaurant_provincia.textContent = PROVINCIA;
  $restaurant_parroquia.textContent = PARROQUIA;
  $restaurant_direccion.textContent = DIRECCION;

  $restaurant_telefono.textContent = TLFIP;
  $restaurant_contacto.textContent = TLFLOCAL;
  $restaurant_correo.textContent = CORREO;
  $restaurant_cgrupal.textContent = CGRUPAL;
  $restaurant_ssid.textContent = SSID;

  $restaurant_heladeria.textContent = HLOCAL;

  $restaurant_backoffice.href = `http://${ip.grupo}.${IP}.${NUMLOCAL}.${ip.servidor}:${ip.puerto}/pos/mantenimiento/`;
}

function deviceData (
  IP, NUMLOCAL, LOCAL
) {
  let IP_servidor = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.servidor}`;
  let IP_estacion = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.pos_1}`;
  let IP_pinpad = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.pinpad_1}`;
  let IP_heladeria = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.heladeria}`;
  let IP_domicilio = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.domicilio}`;
  let IP_drive = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.drive}`;
  let IP_tablet = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.tablet}`;
  let IP_omada = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.omada}`;
  let IP_tlfip = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.telefono_ip}`;
  let IP_oficina = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.oficina}`;
  let IP_biometrico = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.biometrico}`;
  let IP_switch_admin = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.switch}`;
  let IP_telconet = `${ip.grupo}.${IP}.${NUMLOCAL}.${ip.telconet}`;

  $device_servidor.value = IP_servidor;
  $device_estacion.value = IP_estacion;
  $device_pinpad.value = IP_pinpad;
  $device_heladeria.value = IP_heladeria;
  $device_domicilio.value = IP_domicilio;
  $device_drive.value = IP_drive;
  $device_tablet.value = IP_tablet;
  $device_omada.value = IP_omada;
  $device_telefono_ip.value = IP_tlfip;
  $device_oficina.value = IP_oficina;
  $device_biometrico.value = IP_biometrico;
  $device_switch.value = IP_switch_admin;
  $device_telconet.value = IP_telconet;

  Array.from($all_devices).forEach((element) => {
    let input = element.querySelector('input')
    let btnCopy = element.querySelector('[data-nx-copiar]')
    
    const COPIAR = async () => {
      try {
        await navigator.clipboard.writeText( input.value );
        console.log('Contenido copiado al clipboard');
      } catch (err) {
        console.error('Falló al copiar: ', err);
      }
    }
    btnCopy.addEventListener('click', () => {
      COPIAR()
    })
  });
  
  let $btn_whatsapp = $whatsapp.querySelector('a');
  $btn_whatsapp.addEventListener('click', () => {
    let IP_whatsapp = $whatsapp.querySelector('input').value;
    $btn_whatsapp.href = `https://api.whatsapp.com/send/?phone=593${IP_whatsapp.slice(1,10)}&text=Saludos%20cordiales%20estimado%20local%20${LOCAL}&type=phone_number&app_absent=0`;
  })

  let $btn_factura = $factura.querySelector('a');
  $btn_factura.addEventListener('click', () => {
    let IP_factura = $factura.querySelector('input').value;
    $btn_factura.href = `http://${ip.grupo}.${IP}.${NUMLOCAL}.${ip.servidor}:${ip.puerto}/pos/facturacion/impresion/impresion_factura.php?cfac_id=${IP_factura}&tipo_comprobante=F`;
  })
    
}
