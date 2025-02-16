<?php
/**
 * Plugin Name: Dynamic Posts
 * Plugin URI: #
 * Description: Dynamic Gutenberg Block
 * Author: Vlad Leaf
 * Author URI: #
 */

 function genius_myblock_init(){
    register_block_type_from_metadata( __DIR__ );
 }
 add_action('init','genius_myblock_init');

