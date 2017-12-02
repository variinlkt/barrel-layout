# Barrel-layout
* using es6 syntax
* self-adaption
* encapsulated into a plugin as well as a module

## Usage
### usage in .html files
* css
```
  <link rel="stylesheet" href="css/Barrel.min.css">
  <style>
		#brl-container{
			width:80%;/* default width is 100%,you can change it by adding your own css codes */
		}
		
	</style>
```
* body
```
<ul id="brl-container">	</ul>
```
* js
```
  <script src="js/Barrel.min.js"></script>
  <script>
		let ct=document.getElementById('brl-container');
		let barrel=new Barrel(ct);
    //adding your img src into an array
		let arr=['./img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg',
		'img/12.jpg','img/13.jpg','img/14.jpg','img/15.jpg','img/16.jpg','img/17.jpg','img/18.jpg','img/19.jpg','img/20.jpg','img/21.jpg'];
		barrel.createImg(arr);
	</script>
```
### usage in template files
```
  import Barrel from './barrel-layout.js'
  ...
  let ct=document.getElementById('brl-container');
  let barrel=new Barrel(ct);
  //adding your img src into an array
  let arr=['./img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg','img/11.jpg',
  'img/12.jpg','img/13.jpg','img/14.jpg','img/15.jpg','img/16.jpg','img/17.jpg','img/18.jpg','img/19.jpg','img/20.jpg','img/21.jpg'];
  barrel.createImg(arr);
```
## Preview
[preview](http://htmlpreview.github.io/?https://github.com/variinlkt/barrel-layout/blob/master/barrel.html)
