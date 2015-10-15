<?php

function eenvoud_roots_scripts()
{

	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/modernizr.js', [], THEME_VERSION, false);
    wp_enqueue_script( 'vendor_script', get_template_directory_uri() . '/assets/js/vendor.min.js', array('jquery'), THEME_VERSION, true);
    wp_enqueue_script( 'eenvoud_script', get_template_directory_uri() . '/assets/js/scripts.min.js', array('jquery'), THEME_VERSION, true);
}

if (!is_admin()) {
    add_action( 'wp_enqueue_scripts', 'eenvoud_roots_scripts' );
}

