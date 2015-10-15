<?php

// Remove admin footer
function remove_footer_admin () {
    echo 'Developed by <a href="http://www.eenvoudmedia.nl">Eenvoud Media</a>';
}

add_filter('admin_footer_text', 'remove_footer_admin');

// Remove version number
function remove_footer_version() {
    if ( ! current_user_can('manage_options') ) { // 'update_core' may be more appropriate
        remove_filter( 'update_footer', 'core_update_footer' ); 
    }
}
add_action( 'admin_menu', 'remove_footer_version' );

// Remove Help tab
function em_remove_help_tabs() {
    $screen = get_current_screen();
    $screen->remove_help_tabs();
}
add_action('admin_head', 'em_remove_help_tabs');

// Remove items from admin bar
function em_update_admin_bar( $wp_admin_bar ) {
	$wp_admin_bar->remove_node( 'wp-logo' );
	$wp_admin_bar->remove_node( 'comments' );
	$wp_admin_bar->remove_node( 'new-post' );

	if (!current_user_can('edit_options')) {
		$wp_admin_bar->remove_node( 'edit-profile' );
		$wp_admin_bar->remove_node( 'user-info' );
	}



	$eenvoud_node = new stdClass();
	$eenvoud_node->title = 'Eenvoud Media';
	$eenvoud_node->id = 'eenvoud-media';
	//$eenvoud_node->href = 'http://www.eenvoudmedia.nl';
	//$eenvoud_node->target = '_blank';


	$wp_admin_bar->add_node($eenvoud_node);


	$all_toolbar_nodes = $wp_admin_bar->get_nodes();

	foreach ( $all_toolbar_nodes as $node ) {
		if ($node->id == 'view-site') {
			//$node->title = 'Naar webapplicatie';
			$wp_admin_bar->add_node($node);
		} elseif ($node->id != 'eenvoud-media') {
			$wp_admin_bar->remove_node($node->id);
			$wp_admin_bar->add_node($node);
		}

	}
	//print_r($wp_admin_bar);
}
add_action( 'admin_bar_menu', 'em_update_admin_bar', 999 );

add_action( 'admin_head', 'em_admin_bar_logo');

function em_admin_bar_logo() { ?>
<style type="text/css">
	#wpadminbar ul li#wp-admin-bar-eenvoud-media  {
		margin-top: 1px;
		background: url('<?php bloginfo('template_url');?>/assets/img/eenvoud-logo.png') no-repeat;
		background-size: contain;
		text-indent: -9999px;
		width: 110px;
		height: 30.5px;
	}
	#wpadminbar ul li#wp-admin-bar-eenvoud-media:hover>.ab-item {
		background: none;
	}
</style>
<?php }

// Remove login logo
function em_login_logo() { ?>
    <style type="text/css">
        body.login div#login h1 a {
        	display: none;
        }
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'em_login_logo' );


// Remove dashboard widgets
function em_remove_dashboard_widgets(){
	remove_meta_box('dashboard_activity', 'dashboard', 'normal');   // Right Now
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');   // Right Now
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal'); // Recent Comments
    remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');  // Incoming Links
    remove_meta_box('dashboard_plugins', 'dashboard', 'normal');   // Plugins
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');  // Quick Press
    remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');  // Recent Drafts
    remove_meta_box('dashboard_primary', 'dashboard', 'side');   // WordPress blog
    remove_meta_box('dashboard_secondary', 'dashboard', 'side');   // Other WordPress News
	// use 'dashboard-network' as the second parameter to remove widgets from a network dashboard.
    //global $wp_meta_boxes;
    //print_r($wp_meta_boxes['dashboard']);
}
add_action('wp_dashboard_setup', 'em_remove_dashboard_widgets');
