<?php

if (is_admin()) {

	function add_admin_styles ()
	{
		wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/includes/admin/assets/css/admin.css', array(), THEME_VERSION );
	}
	add_action( 'admin_enqueue_scripts', 'add_admin_styles' );

	
	require_once 'dashboard.php';


}
