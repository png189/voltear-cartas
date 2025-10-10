
let n=0;
let cartas = []
let archivos = ["tigre","guacamaya","mono","Rinoceronte","aguila","venado","tucan","elefante"]
function Carta(titulo){
	this.titulo = titulo
	this.contador = 0
}

$(".carta").attr("src","img/baraja.jpg")

let cookie = Cookies.get("cartas")
if (cookie != undefined)
	try{
		cartas = JSON.parse(cookie)
	}catch(e){
		console.log("error al leer la cookie")
	}
else
	for (c of archivos)
		cartas.push(new Carta(c))

actualizarLista()

function buscarCarta(titulo){
	for (let i=0;i<cartas.length;i++)
		if (cartas[i].titulo == titulo)
			return cartas[i]

	return false;
}

$(document).ready(()=>{
	$(".carta").slideDown(550)
})

$("table img").width("100")
$("table img").height("150")

$("table img").click(function(){
	$("#div-seleccionado").show()
	
	$("#div-lista").show()
	let titulo = $(this).attr("title");
	$("#grande").attr("src",this.src)
	$("#seleccionado").text(titulo)
	
	
			  
	$("table img").removeClass("seleccionada")
	$(this).fadeOut(150,function(){
		if ($(this).attr("src")=="img/baraja.jpg"){
			$(this).attr("src",`img/${titulo}.png`)
			let carta = buscarCarta(titulo);
			if (carta)
				carta.contador++

			actualizarLista()
			n++;
			$("#puntos").text(n)

			Cookies.set("cartas",JSON.stringify(cartas))
		}else
			$(this).attr("src","img/baraja.jpg")

		$(this).fadeIn(150)
	})
	
})

function actualizarLista(){
	$("#lista").empty();
	for (i=0;i<cartas.length;i++)
		$("#lista").append(`<li>${cartas[i].titulo} ${cartas[i].contador}</li>`)
}

$("#reiniciar").click(()=>{
	n=0;
	$(".carta").attr("src","img/baraja.jpg")
	$("#puntos").text(n)
	$("table img").removeClass("seleccionada")
	$("#div-seleccionado").hide()
	
	$(".carta").slideUp()
	$(".carta").slideDown(550,()=>{
		for (c of cartas)
			c.contador=0;

		Cookies.set("cartas",JSON.stringify(cartas))
		$("#lista").fadeOut(()=>{
			actualizarLista()
			$("#lista").fadeIn()
		})
	})
})