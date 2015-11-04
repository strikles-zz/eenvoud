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
	<header>
		<div class="eenvoud-logo-container">
			<a href="/"><div class="logo"></div><div class="logo-txt"><span class="text-bold">Eenvoud</span><span> Media</span></div></a>
		</div>
		<div class="navigation-button-container text-right" role="navigation">
			<button class="cmn-toggle-switch cmn-toggle-switch-htx pull-right" data-toggle="collapse" data-target="#menu">
	            <span class="white"></span>
			</button>
		</div>
		<div class="navigation">
			<div id="menu" class="eenvoudmenu collapse">
				<?php
				$defaults = array(
					'menu'             => 'primary',
					'container'       => 'div',
					'container_class' => '',
					'container_id'    => '',
					'menu_class'      => '',
					'menu_id'         => '',
					'echo'            => true,
					'fallback_cb'     => 'wp_page_menu',
					'before'          => '',
					'after'           => '',
					'link_before'     => '',
					'link_after'      => '',
					'items_wrap'      => '<ul id="%1$s" class="nav nav-pills nav-stacked">%3$s</ul>',
					'depth'           => 0
				);
				wp_nav_menu($defaults);
				?>
			</div>
		</div>
	</header>
