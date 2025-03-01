<?php
/**
 * Plugin Name: Dynamic Posts
 * Plugin URI: #
 * Description: Dynamic Gutenberg Block
 * Author: Vlad Leaf
 * Author URI: #
 */

function genius_latest_posts_block($attributes){
   $arg = array(
    'posts_per_page' => $attributes['postsPerPage'],
    'post_status'=> 'publish',
    'order' => $attributes['order'],
    'orderby' =>$attributes['orderBy'],
    'category__in' => $attributes['category'],
   );

// якщо є категорія, перевірка  
if (isset($attributes['category'])){
   $arg['category__in'] = $attributes['category'];
}

   $latest_posts = get_posts($arg);

   $html = "<div ".get_block_wrapper_attributes().">";
   if(!empty($latest_posts)){

      foreach($latest_posts as $post){
         $html .= "<div>";
         if($attributes['showImage'] &&  has_post_thumbnail($post) ){
            $html.= wp_kses_post(get_the_post_thumbnail($post, 'large'));
         }
         $html .= "<time datetime='".esc_attr(get_the_date('c',$post))."'>".esc_html(get_the_date('',$post))."</time>";
         $html .= "<h2><a href='".esc_url(get_the_permalink($post))."'>".esc_html(get_the_title($post))."<a/></h2>";
         $html .= "</div>"; 
      }
   }
   $html .= "</div>";
   return $html;

}

// Це функція, яка є рендер-функцією (render callback). Вона повертає "Hello" кожного разу, коли цей блок відображається на сторінці.

 function genius_dynamicblock_init(){
    register_block_type_from_metadata( __DIR__, array(
      "render_callback" => 'genius_latest_posts_block'

    ) );
 }
 add_action('init','genius_dynamicblock_init');

//  Це додає genius_dynamicblock_init() до WordPress-хука init, який виконується під час ініціалізації WordPress. Таким чином, блок реєструється під час завантаження сайту.

