/***********************************************************************************
*******************************Hecho por: Juan Correa*******************************
***********************e-mail: juan.correa.herrera@gmail.com************************
************************************************************************************/


//Matriz bidimensional que contendrá los valores de cada célula
//Total células= 250
var celulas_x= new Array(50);	

//matriz auxiliar
var celulas_x2= new Array(50);	


var sum=0;



																				
//Imprimir tablero																	
function tablero(){
	
	var elemento=document.getElementById('lienzo');
	lienzo=elemento.getContext('2d');
	lienzo.clearRect(0,0,100,100);//borra lienzo
	lienzo.beginPath();
	for(x=10;x<=500;x=x+10){
		//verticales
		lienzo.moveTo(x,0);
		lienzo.lineTo(x,500);
		//horizontales
		lienzo.moveTo(0,x);
		lienzo.lineTo(500,x);
		lienzo.stroke();
	
	}
 }window.addEventListener("load", tablero, true);
 
 
function celulas_iniciales(){	
	for (i=0;i<50;i++){
		celulas_y= new Array(50);
		for (j=0;j<50;j++){
			celulas_y[j]=Math.floor(Math.random()+0.5);//0 y 1 aleatorios
			celulas_x[i]=celulas_y;
		}
		
		celulas_x[i]=celulas_y;
	}
	//alert("celulas x final: "+celulas_x);
	imprimir_celulas(celulas_x);
} window.addEventListener("load", celulas_iniciales, false); 



function imprimir_celulas(array){
	x=0; y=0;//coordenadas en función a los índices del array
	var elemento=document.getElementById('lienzo');
	lienzo=elemento.getContext('2d');
	for (i=0;i<50;i++){		
		x=0;
		for(j=0;j<50;j++){
			if(array[i][j]==1){
				lienzo.fillRect(x, y, 10,10);
			}else{
				lienzo.clearRect(x,y,9,9);
			}
			x=x+10;
		}
		y=y+10;
	}
	
}
 
//Aplicar leyes de la vida
function leyes_vida(){
	for(i=0;i<50;i++){
		celulas_y2= new Array(50);
		for(j=0;j<50;j++){
			sum=0;
			celulas_y2[j]=evaluar(i,j,celulas_x,celulas_x[i][j],sum);
			//alert("resultado: "+celulas_y2[j]);
			
		}//for j
		celulas_x2[i]=celulas_y2;
		
	}//for i
	celulas_x=celulas_x2;
	
	imprimir_celulas(celulas_x);
	
}


function evaluar(x,y,m,value,sum2){
	sum2=0;var i2, j2;
	for(i2=-1;i2<2;i2++){
		for(j2=-1;j2<2;j2++){
			//sí es sí mismo, o si la fila es negativa, o si la columna es negativa, o si la fila supera el límite, o si la columna supera el límite
			if(    (((x+i2)==x)&&((y+j2)==y)) || ((x+i2)<0) || ((y+j2)<0) || ((x+i2)>49) || ((y+j2)>49)  ){
				//nada
			}else{//es una casilla que existe
				//alert("valor de m["+(i2+x)+"]["+(j2+y)+"]: "+m[i2+x][j2+y]);
				sum2=parseInt(sum2);
				m[i2+x][j2+y]=parseInt(m[i2+x][j2+y]);
				sum2=sum2+m[i2+x][j2+y];
				//alert("valor de sum dentro del if: "+sum2);
			}
		}
	}
	//a saber si se trata de una célula viva o muerta
	switch (value){
		
		case 0://celula muerta
			if(sum2==3){
				sum2=0;
				return 1;
			}else{
				sum2=0;
				return 0;
			}
		break;
		case 1:
			if((sum2==3)||(sum2==2)){
				sum2=0;
				return 1;
			}else{
				sum2=0;
				return 0;
			}
		break;
		default:
		
			alert("problemas en el switch. Valor de sum2: "+sum2);
	}

}

function inicio(){
	tablero();
	leyes_vida();
	imprimir_celulas();
}