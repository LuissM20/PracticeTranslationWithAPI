// Elemenntos del DOM 
let translateFrom =document.querySelector(`#translateFrom`);
let translateTo =document.querySelector(`#translateTo`);
let outputTranslate = document.querySelector(`#outputTranslate`)



//Conseguir la lista de lenguajes desde el servidor
const GET_URL=`https://text-translator2.p.rapidapi.com/getLanguages`

const optionss = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '56ac1e0ed7msh59f1bed196d2269p17034ajsn45833cc7c43b',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};
let source_language=`es`; 
let target_language=`en`;
fetch(GET_URL,optionss)
.then(response => response.json())
.then(objeto =>{
    let lenguajes= objeto.data.languages; 

    
    lenguajes.forEach(element=> {
        translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
        translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`;
        translateFrom.addEventListener(`click`,()=>{
            console.log(translateFrom.value);
            source_language = translateFrom.value;
        })
        translateTo.addEventListener(`click`,()=>{
            console.log(translateTo.value);
            target_language =translateTo.value;
        })
    })
}
//El codigo necesario para cargar el select
).catch(error => alert("error baby") )
//Recoger los datos del input para enviarlos al servidor
let translate = document.querySelector(`#translate`);
let inputTranslate = document.querySelector(`#inputTranslateTo`);

translate.addEventListener(`click`,()=>{
let textToTranslate=inputTranslate.value; 

const encodedParams = new URLSearchParams();
encodedParams.append("source_language", source_language);
encodedParams.append("target_language", target_language);
encodedParams.append("text",textToTranslate);

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '56ac1e0ed7msh59f1bed196d2269p17034ajsn45833cc7c43b',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: encodedParams
};
fetch('https://text-translator2.p.rapidapi.com/translate', options)
	.then(response => response.json())
	.then(response => outputTranslate.value = response.data.translatedText)
	.catch(err => console.error(err));
}); 




 
