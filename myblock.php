<?php
/** 
 * Plugin Name: My Block
 * Plugin URI: https://geniuscourses.com
 * Description: Gunteberg Block
 * Author: Vlad Popovych
 * Author URI: https://geniuscourses.com
 */


 function genius_myblock_init(){
    register_block_type_from_metadata(__DIR__); // для реєстрації блоків на основі метаданих із файлу block.json.
 }

 add_action('init','genius_myblock_init');