import React, { useState } from 'react';
import Header from './Header';
import Card from './Card';
import './Home.css';

const clipboard = require('electron-clipboard-extended');

var currentText="";

//dummy values
const list=[
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
]

clipboard
  .on('text-changed', () => {
   currentText = clipboard.readText();
   console.log(currentText);
   
  })
  .once('text-changed', () => {
   
    console.log('TRIGGERED ONLY ONCE');
  })
  .on('image-changed', () => {
    let currentImage = clipboard.readImage();
    console.log(currentImage);
    console.log(currentImage.toDataURL());
  })
  .startWatching();


function Home(){



  return (
    <div>
      <Header />
      <div>
      {list.map((item) => <Card title={item.title} time={item.time} device={item.device}/> )}
      </div>
      
    </div>
  );
}

export default Home;
