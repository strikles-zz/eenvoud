<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php wp_title('-', true, 'right'); bloginfo('name');?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>

<body <?php body_class();?>>
<header id="header">

	<nav class="navbar always-open">
	    <div class="navbar-header">

	        <a class="navbar-brand" href="#">
	        	<img src="/wp-content/themes/foundetion/assets/img/logo.png" alt="">
	        	<span>Eenvoud</span><span class="text-light">Media</span>
	        </a>
	        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	        </button>
	    </div>
	    <div class="navbar-collapse collapse">
	        <ul class="nav navbar-nav">
	            <li class="active"><a href="#">Home</a></li>
	            <li><a href="#about">About</a></li>
	            <li><a href="#contact">Contact</a></li>
	        </ul>
	    </div>
	</nav>

</header>
