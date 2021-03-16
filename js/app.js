'use strict';

const Flower = function ( id, name, season, img ) {
  this.id = id;
  this.name = name;
  this.season = season;
  this.img = img;
  Flower.all.push( this );
};
Flower.all = [];

Flower.prototype.addToLocalStorage = function () {
  localStorage.setItem( 'Flowers', JSON.stringify( Flower.all ) );
};

function handelSubmit( event ) {
  event.preventDefault();
  ///
  let flower = new Flower( Flower.all.length + 1, event.target.name.value,
    event.target.season.value, event.target.select.value );

  flower.addToLocalStorage();
  form.reset();
  renderToHtml();
}

const renderToHtml = function () {
  if ( localStorage.Flowers ) {

    // document.getElementById()
    body.innerHTML = '';
    let tempLocalStorage = JSON.parse( localStorage.getItem( 'Flowers' ) );

    for ( let index = 0; index < tempLocalStorage.length; index++ ) {


      const trTag = document.createElement( 'tr' );
      const tdTag = document.createElement( 'td' );
      const linkTag = document.createElement( 'a' );
      linkTag.id = tempLocalStorage[index].id;
      linkTag.textContent= 'X';
      linkTag.addEventListener( 'click', removeItem );
      tdTag.appendChild( linkTag );
      trTag.appendChild( tdTag );

      const tdTag1 = document.createElement( 'td' );
      const imgTag = document.createElement( 'img' );
      imgTag.src = tempLocalStorage[index].img;
      tdTag1.appendChild( imgTag );
      trTag.appendChild( tdTag1 );

      const tdTag2 = document.createElement( 'td' );
      tdTag2.textContent = tempLocalStorage[index].name;
      trTag.appendChild( tdTag2 );

      //   console.log( tempLocalStorage[index].name );
      const tdTag3 = document.createElement( 'td' );
      tdTag3.textContent = tempLocalStorage[index].season;
      trTag.appendChild( tdTag3 );

      body.appendChild( trTag );


    }
  }
};

const getLocalStorageToFlowerArray = function () {
  if ( localStorage.Flowers ) {


    let tempLocalStorage = JSON.parse( localStorage.getItem( 'Flowers' ) );

    for ( let index = 0; index < tempLocalStorage.length; index++ ) {
      Flower.all.push( tempLocalStorage[index] );
    }
  }
};

form.addEventListener( 'submit', handelSubmit );
getLocalStorageToFlowerArray();
renderToHtml();

function removeItem ( event ){
  let deleteId = event.target.id;
  deleteId = parseInt( deleteId );

  let newArr = [];

  for ( let i= 0; Flower.all.length; i++ ){
    console.log( Flower.all[i].id );
    if ( Flower.all[i].id !== deleteId ){
      newArr.push( Flower.all[i] );
    }
  }
  localStorage.setItem( 'Flowers',JSON.stringify( newArr ) );
  body.innerHTML= '';
  renderToHtml();
  location.reload();
}
